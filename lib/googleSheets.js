/**
 * Google Sheets Integration
 * Production-ready with error handling and duplicate prevention
 */

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { logError, logInfo } from './logger';

let doc = null;
let sheet = null;

/**
 * Initialize Google Sheets connection
 */
export async function initGoogleSheets() {
  if (doc) return { doc, sheet };

  try {
    const credentialsJson = process.env.GOOGLE_SHEETS_CREDENTIALS;
    // Extract sheet ID from URL if full URL is provided, otherwise use as-is
    let sheetId = process.env.GOOGLE_SHEET_ID || '';
    
    // If it's a full URL, extract the ID
    if (sheetId.includes('docs.google.com')) {
      const match = sheetId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (match) {
        sheetId = match[1];
      }
    }

    if (!credentialsJson || !sheetId) {
      throw new Error('Google Sheets credentials not configured');
    }

    let credentials;
    try {
      credentials = typeof credentialsJson === 'string' 
        ? JSON.parse(credentialsJson) 
        : credentialsJson;
    } catch (parseError) {
      logError('Failed to parse GOOGLE_SHEETS_CREDENTIALS', parseError);
      throw new Error('Invalid Google Sheets credentials JSON format');
    }

    // Handle private key newlines (Vercel environment variables)
    // Replace escaped newlines with actual newlines
    // Handle multiple escape scenarios
    let privateKey = credentials.private_key;
    if (typeof privateKey === 'string') {
      // First handle double-escaped newlines, then single-escaped
      privateKey = privateKey.replace(/\\\\n/g, '\n');
      privateKey = privateKey.replace(/\\n/g, '\n');
    }

    // Authenticate with service account
    const serviceAccountAuth = new JWT({
      email: credentials.client_email,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    await doc.loadInfo();

    // Get or create "Leads" sheet
    // Try to find sheet with common names
    sheet = doc.sheetsByTitle['Leads'] || doc.sheetsByTitle['Sheet1'] || doc.sheetsByIndex[0];
    
        if (!sheet) {
          // Create new sheet if none exists - only essential columns
          sheet = await doc.addSheet({ 
            title: 'Leads',
            headerValues: ['Full Name', 'Email Address', 'Phone Number', 'Company Name', 'Service Interested In', 'Business Type', 'Contact Preference', 'Additional Message', 'Meta Ads', 'WhatsApp', 'Voice Assistant', 'Date', 'Timestamp']
          });
          logInfo('Created new "Leads" sheet');
        } else {
          // Load existing headers
          await sheet.loadHeaderRow();
          const headers = sheet.headerValues || [];
          
          // Only ensure essential columns exist (no unnecessary ones)
          const requiredColumns = ['Full Name', 'Email Address', 'Phone Number', 'Business Type', 'Contact Preference', 'Meta Ads', 'WhatsApp', 'Voice Assistant', 'Date', 'Timestamp'];
          let needsUpdate = false;
          let updatedHeaders = [...headers];
          
          for (const col of requiredColumns) {
            // Check for exact match or case-insensitive exact match
            const exists = headers.some(h => h.trim() === col || h.trim().toLowerCase() === col.toLowerCase());
            if (!exists) {
              updatedHeaders.push(col);
              needsUpdate = true;
            }
          }
          
          if (needsUpdate) {
            await sheet.setHeaderRow(updatedHeaders);
            await sheet.loadHeaderRow(); // Reload after update
            logInfo('Added missing columns to sheet', { added: updatedHeaders.length - headers.length });
          }
          
          logInfo('Using existing sheet', { sheetTitle: sheet.title, headers: sheet.headerValues });
        }

    return { doc, sheet };
  } catch (error) {
    logError('Error initializing Google Sheets', error);
    throw error;
  }
}

/**
 * Check if lead already exists (duplicate prevention)
 */
async function isDuplicateLead(email, timestamp) {
  try {
    const { sheet: currentSheet } = await initGoogleSheets();
    const rows = await currentSheet.getRows();
    
    // Check for same email within last 5 minutes (prevent double submissions)
    const fiveMinutesAgo = timestamp - (5 * 60 * 1000);
    
    // Get headers to find email column
    await currentSheet.loadHeaderRow();
    const headers = currentSheet.headerValues || [];
    const emailHeader = headers.find(h => 
      h === 'Email Address' || 
      h === 'Email' || 
      h.toLowerCase().includes('email')
    ) || headers[1] || 'Email Address';
    
    for (const row of rows) {
      const rowEmail = row.get(emailHeader)?.toLowerCase();
      const rowTimestamp = row.get('Timestamp');
      
      if (rowEmail === email.toLowerCase() && rowTimestamp) {
        const rowTime = parseInt(rowTimestamp);
        if (rowTime > fiveMinutesAgo) {
          return true; // Duplicate found
        }
      }
    }
    
    return false;
  } catch (error) {
    logError('Error checking duplicate lead', error);
    // Don't block submission if check fails
    return false;
  }
}

/**
 * Save lead to Google Sheets
 */
export async function saveLead(leadData) {
  try {
    logInfo('Attempting to save lead', { email: leadData.email, name: leadData.name });
    
    const { sheet: currentSheet } = await initGoogleSheets();
    
    if (!currentSheet) {
      throw new Error('Sheet not found or not accessible');
    }
    
    // Reload headers to ensure we have latest
    await currentSheet.loadHeaderRow();
    const headers = currentSheet.headerValues || [];
    logInfo('Sheet headers loaded', { headers, sheetTitle: currentSheet.title });
    
    const timestamp = Date.now();
    const date = new Date().toISOString();
    
    // Check for duplicates
    const isDuplicate = await isDuplicateLead(leadData.email, timestamp);
    if (isDuplicate) {
      logInfo('Duplicate lead submission prevented', { email: leadData.email });
      return {
        success: false,
        duplicate: true,
        message: 'This lead was already submitted recently'
      };
    }

    // Add row with lead data
    // Support multiple header name formats for compatibility
    const rowData = {};
    
    // Helper function to find header with exact or case-insensitive match
    const findHeader = (possibleNames, fallbackIndex = null) => {
      // First try exact match (case-insensitive)
      for (const name of possibleNames) {
        const exactMatch = headers.find(h => h.trim() === name || h.trim().toLowerCase() === name.toLowerCase());
        if (exactMatch) return exactMatch;
      }
      // Fallback to index if provided
      if (fallbackIndex !== null && headers[fallbackIndex]) {
        return headers[fallbackIndex];
      }
      // Last resort: return first possible name
      return possibleNames[0];
    };
    
    // Find matching header for each field - use exact matching to avoid false matches
    const nameHeader = findHeader(['Full Name', 'Name'], 0);
    const emailHeader = findHeader(['Email Address', 'Email'], 1);
    const phoneHeader = findHeader(['Phone Number', 'Phone'], 2);
    const companyHeader = findHeader(['Company Name', 'Company'], 3);
    const serviceHeader = findHeader(['Service Interested In', 'Service Interest', 'Service'], 4);
    const messageHeader = findHeader(['Additional Message', 'Message'], 7);
    const businessTypeHeader = findHeader(['Business Type'], null);
    const contactPreferenceHeader = findHeader(['Contact Preference', 'Preferred Contact Method'], null);
    const metaAdsHeader = findHeader(['Meta Ads'], null);
    const whatsappHeader = findHeader(['WhatsApp'], null);
    const voiceAssistantHeader = findHeader(['Voice Assistant'], null);
    const dateHeader = findHeader(['Date'], null);
    const timestampHeader = findHeader(['Timestamp'], null);
    
    logInfo('Header mapping', {
      nameHeader,
      emailHeader,
      phoneHeader,
      companyHeader,
      serviceHeader,
      messageHeader,
      businessTypeHeader,
      contactPreferenceHeader,
      metaAdsHeader,
      whatsappHeader,
      voiceAssistantHeader,
      dateHeader,
      timestampHeader,
      allHeaders: headers
    });
    
    // Add data with correct header names - only essential fields
    rowData[nameHeader] = leadData.name || '';
    rowData[emailHeader] = leadData.email || '';
    rowData[phoneHeader] = leadData.phone || '';
    if (companyHeader && headers.includes(companyHeader)) {
      rowData[companyHeader] = leadData.company || '';
    }
    if (serviceHeader && headers.includes(serviceHeader)) {
      rowData[serviceHeader] = leadData.service || '';
    }
    if (messageHeader && headers.includes(messageHeader)) {
      rowData[messageHeader] = leadData.message || '';
    }
    rowData[businessTypeHeader] = leadData.businessType || '';
    rowData[contactPreferenceHeader] = leadData.contactPreference || '';
    rowData[metaAdsHeader] = leadData.services?.metaAds ? 'Yes' : 'No';
    rowData[whatsappHeader] = leadData.services?.whatsapp ? 'Yes' : 'No';
    rowData[voiceAssistantHeader] = leadData.services?.voiceAssistant ? 'Yes' : 'No';
    rowData[dateHeader] = date;
    rowData[timestampHeader] = timestamp.toString();
    
    logInfo('Adding row to sheet', { rowData, headers });
    
    await currentSheet.addRow(rowData);
    
    logInfo('Lead saved to Google Sheets successfully', { 
      email: leadData.email,
      sheetTitle: currentSheet.title,
      rowCount: (await currentSheet.getRows()).length
    });
    
    return {
      success: true,
      message: 'Lead saved successfully'
    };
  } catch (error) {
    logError('Error saving lead to Google Sheets', error);
    logError('Error details', { 
      message: error.message, 
      stack: error.stack,
      leadData: { email: leadData.email, name: leadData.name }
    });
    throw error;
  }
}

/**
 * Get all leads from Google Sheets
 */
export async function getLeads() {
  try {
    const { sheet: currentSheet } = await initGoogleSheets();
    const rows = await currentSheet.getRows();
    
    // Get headers to map correctly
    await currentSheet.loadHeaderRow();
    const headers = currentSheet.headerValues || [];
    
    // Match headers flexibly - supports partial matches
    const nameHeader = headers.find(h => 
      h === 'Full Name' || 
      h.toLowerCase().includes('name') && !h.toLowerCase().includes('company')
    ) || headers[0] || 'Full Name';
    
    const emailHeader = headers.find(h => 
      h === 'Email Address' || 
      h.toLowerCase().includes('email')
    ) || headers[1] || 'Email Address';
    
    const phoneHeader = headers.find(h => 
      h === 'Phone Number' || 
      h.toLowerCase().includes('phone')
    ) || headers[2] || 'Phone Number';
    
    const companyHeader = headers.find(h => 
      h === 'Company Name' || 
      h.toLowerCase().includes('company')
    ) || headers[3] || 'Company Name';
    
    const serviceHeader = headers.find(h => 
      h.includes('Service') || 
      h.toLowerCase().includes('service')
    ) || headers[4] || 'Service Interest';
    
    const budgetHeader = headers.find(h => 
      h === 'Budget Range' || 
      h.toLowerCase().includes('budget')
    ) || headers[5] || 'Budget Range';
    
    const timeHeader = headers.find(h => 
      h.includes('Preferred') || 
      h.toLowerCase().includes('contact time') ||
      h.toLowerCase().includes('preferred')
    ) || headers[6] || 'Preferred Contact Time';
    
    const messageHeader = headers.find(h => 
      h === 'Additional Message' || 
      h.toLowerCase().includes('message') ||
      h.toLowerCase().includes('additional')
    ) || headers[7] || 'Additional Message';
    
    const leads = rows.map(row => ({
      id: row.rowNumber,
      name: row.get(nameHeader) || '',
      email: row.get(emailHeader) || '',
      phone: row.get(phoneHeader) || '',
      company: row.get(companyHeader) || '',
      service: row.get(serviceHeader) || '',
      budget: row.get(budgetHeader) || '',
      preferredTime: row.get(timeHeader) || '',
      message: row.get(messageHeader) || '',
      date: row.get('Date') || '',
      timestamp: row.get('Timestamp') || ''
    }));

    // Sort by timestamp (newest first)
    leads.sort((a, b) => {
      const timeA = parseInt(a.timestamp) || 0;
      const timeB = parseInt(b.timestamp) || 0;
      return timeB - timeA;
    });

    return leads;
  } catch (error) {
    logError('Error fetching leads from Google Sheets', error);
    throw error;
  }
}

/**
 * Update lead status in Google Sheets
 */
export async function updateLeadStatus(email, updates) {
  try {
    const { sheet: currentSheet } = await initGoogleSheets();
    const rows = await currentSheet.getRows();
    
    // Find the row with matching email
    await currentSheet.loadHeaderRow();
    const headers = currentSheet.headerValues || [];
    
    const emailHeader = headers.find(h => 
      h === 'Email Address' || 
      h === 'Email' || 
      h.toLowerCase().includes('email')
    ) || 'Email Address';
    
    const row = rows.find(r => {
      const rowEmail = r.get(emailHeader)?.toLowerCase() || '';
      return rowEmail === email.toLowerCase();
    });
    
    if (!row) {
      throw new Error(`Lead with email ${email} not found`);
    }
    
    // Update fields
    const statusHeader = headers.find(h => h === 'Status' || h.toLowerCase().includes('status')) || 'Status';
    const lastFollowUpHeader = headers.find(h => h.toLowerCase().includes('last follow') || h.toLowerCase().includes('followup')) || 'Last Follow Up';
    const optOutHeader = headers.find(h => h.toLowerCase().includes('opt out') || h.toLowerCase().includes('optout')) || 'Opt Out';
    
    if (updates.status) {
      row.set(statusHeader, updates.status);
    }
    if (updates.lastFollowUp) {
      row.set(lastFollowUpHeader, updates.lastFollowUp);
    }
    if (updates.optOut !== undefined) {
      row.set(optOutHeader, updates.optOut);
    }
    
    await row.save();
    
    logInfo('Lead status updated', { email, updates });
    
    return { success: true };
  } catch (error) {
    logError('Error updating lead status', error);
    throw error;
  }
}

