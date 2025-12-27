/**
 * Follow-up Automation Service
 * 
 * Handles automated follow-up messages for leads
 * - Reminder after 24 hours if status = "Not Contacted"
 * - Final follow-up after 3 days
 * - Supports Email and WhatsApp channels
 * - Prevents duplicate messages
 * - Includes opt-out logic
 */

import { logError, logInfo, logWarn } from './logger';
import { getClientConfig, isFeatureEnabled } from './config';
import { sendEmail } from './email';
import { sendWhatsApp, formatWhatsAppNumber } from './whatsapp';
import { getLeads, updateLeadStatus } from './googleSheets';

/**
 * Lead statuses
 */
export const LEAD_STATUS = {
  NOT_CONTACTED: 'Not Contacted',
  CONTACTED: 'Contacted',
  FOLLOWED_UP: 'Followed Up',
  CONVERTED: 'Converted',
  OPTED_OUT: 'Opted Out'
};

/**
 * Check if lead should receive follow-up
 */
function shouldSendFollowUp(lead, hoursSinceSubmission) {
  // Don't send if opted out
  if (lead.optOut === 'Yes' || lead.optOut === 'yes' || lead.status === LEAD_STATUS.OPTED_OUT) {
    return false;
  }
  
  // Don't send if already contacted or converted
  if (lead.status === LEAD_STATUS.CONTACTED || lead.status === LEAD_STATUS.CONVERTED) {
    return false;
  }
  
  // Check if already followed up recently (within last 12 hours)
  if (lead.lastFollowUp) {
    const lastFollowUpTime = new Date(lead.lastFollowUp).getTime();
    const twelveHoursAgo = Date.now() - (12 * 60 * 60 * 1000);
    if (lastFollowUpTime > twelveHoursAgo) {
      return false;
    }
  }
  
  return true;
}

/**
 * Send follow-up message via configured channels
 */
async function sendFollowUpMessage(lead, messageType) {
  const config = getClientConfig();
  
  if (!config.features.followUps || !config.followUps.enabled) {
    logWarn('Follow-ups not enabled', { leadEmail: lead.email });
    return { success: false, skipped: true };
  }
  
  const channels = config.followUps.channels || ['email'];
  const results = [];
  
  // Prepare message data
  const messageData = {
    name: lead.name,
    service: lead.service,
    email: lead.email,
    phone: lead.phone
  };
  
  // Send via email
  if (channels.includes('email') && lead.email) {
    try {
      const emailResult = await sendEmail({
        to: lead.email,
        subject: messageType === 'reminder' 
          ? `Following Up: ${lead.service}`
          : `Final Follow-Up: ${lead.service}`,
        template: messageType === 'reminder' ? 'followUpReminder' : 'finalFollowUp',
        data: messageData,
        type: 'followup'
      });
      
      results.push({ channel: 'email', ...emailResult });
    } catch (error) {
      logError('Error sending follow-up email', error);
      results.push({ channel: 'email', success: false, error: error.message });
    }
  }
  
  // Send via WhatsApp
  if (channels.includes('whatsapp') && lead.phone) {
    try {
      const whatsappNumber = formatWhatsAppNumber(lead.phone);
      if (whatsappNumber) {
        const whatsappResult = await sendWhatsApp({
          to: whatsappNumber,
          template: messageType === 'reminder' ? 'followUpReminder' : 'finalFollowUp',
          data: messageData,
          type: 'followup'
        });
        
        results.push({ channel: 'whatsapp', ...whatsappResult });
      }
    } catch (error) {
      logError('Error sending follow-up WhatsApp', error);
      results.push({ channel: 'whatsapp', success: false, error: error.message });
    }
  }
  
  // Check if at least one channel succeeded
  const hasSuccess = results.some(r => r.success);
  
  return {
    success: hasSuccess,
    results,
    messageType
  };
}

/**
 * Process follow-ups for all eligible leads
 * This should be called periodically (e.g., via cron job or scheduled function)
 */
export async function processFollowUps() {
  try {
    if (!isFeatureEnabled('followUps')) {
      logInfo('Follow-ups feature not enabled, skipping');
      return { processed: 0, skipped: true };
    }
    
    const config = getClientConfig();
    const reminderHours = config.followUps.reminderAfterHours || 24;
    const finalFollowUpHours = config.followUps.finalFollowUpAfterHours || 72;
    
    // Get all leads
    const leads = await getLeads();
    const now = Date.now();
    
    let processed = 0;
    let remindersSent = 0;
    let finalFollowUpsSent = 0;
    
    for (const lead of leads) {
      if (!lead.timestamp) continue;
      
      const leadTimestamp = parseInt(lead.timestamp) || 0;
      const hoursSinceSubmission = (now - leadTimestamp) / (1000 * 60 * 60);
      
      // Check if should send follow-up
      if (!shouldSendFollowUp(lead, hoursSinceSubmission)) {
        continue;
      }
      
      // Determine which follow-up to send
      let messageType = null;
      
      if (hoursSinceSubmission >= finalFollowUpHours && lead.status === LEAD_STATUS.NOT_CONTACTED) {
        // Final follow-up (3 days)
        messageType = 'final';
      } else if (hoursSinceSubmission >= reminderHours && lead.status === LEAD_STATUS.NOT_CONTACTED) {
        // Reminder (24 hours)
        messageType = 'reminder';
      }
      
      if (messageType) {
        const result = await sendFollowUpMessage(lead, messageType);
        
        if (result.success) {
          // Update lead status
          await updateLeadStatus(lead.email, {
            status: LEAD_STATUS.FOLLOWED_UP,
            lastFollowUp: new Date().toISOString()
          });
          
          processed++;
          if (messageType === 'reminder') remindersSent++;
          if (messageType === 'final') finalFollowUpsSent++;
          
          logInfo('Follow-up sent', {
            leadEmail: lead.email,
            messageType,
            channels: result.results.map(r => r.channel)
          });
        }
      }
    }
    
    logInfo('Follow-ups processed', {
      total: leads.length,
      processed,
      remindersSent,
      finalFollowUpsSent
    });
    
    return {
      processed,
      remindersSent,
      finalFollowUpsSent,
      totalLeads: leads.length
    };
    
  } catch (error) {
    logError('Error processing follow-ups', error);
    throw error;
  }
}

/**
 * Mark lead as opted out
 */
export async function optOutLead(email) {
  try {
    await updateLeadStatus(email, {
      status: LEAD_STATUS.OPTED_OUT,
      optOut: 'Yes'
    });
    
    logInfo('Lead opted out', { email });
    return { success: true };
  } catch (error) {
    logError('Error opting out lead', error);
    return { success: false, error: error.message };
  }
}

