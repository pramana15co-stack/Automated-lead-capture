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
      // Create new sheet if none exists
      sheet = await doc.addSheet({ 
        title: 'Leads',
        headerValues: ['Full Name', 'Email Address', 'Phone Number', 'Company Name', 'Service Interested In', 'Budget Range', 'Preferred Contact Time', 'Additional Message', 'Date', 'Timestamp']
      });
      logInfo('Created new "Leads" sheet');
    } else {
      // Load existing headers
      await sheet.loadHeaderRow();
      const headers = sheet.headerValues || [];
      
      // Ensure Date and Timestamp columns exist
      if (!headers.includes('Date')) {
        await sheet.setHeaderRow([...headers, 'Date']);
        logInfo('Added Date column to sheet');
      }
      if (!headers.includes('Timestamp')) {
        await sheet.setHeaderRow([...headers, 'Timestamp']);
        logInfo('Added Timestamp column to sheet');
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
    const emailHeader = headers.find(h => ['Email Address', 'Email', 'EmailAddress'].includes(h)) || 'Email Address';
    
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
    
    // Map to different possible header names
    const headerMappings = {
      name: ['Full Name', 'Name', 'FullName'],
      email: ['Email Address', 'Email', 'EmailAddress'],
      phone: ['Phone Number', 'Phone', 'PhoneNumber'],
      company: ['Company Name', 'Company', 'CompanyName'],
      service: ['Service Interested In', 'Service', 'ServiceInterestedIn'],
      budget: ['Budget Range', 'Budget', 'BudgetRange'],
      preferredTime: ['Preferred Contact Time', 'PreferredTime', 'PreferredContactTime'],
      message: ['Additional Message', 'Message', 'AdditionalMessage']
    };
    
    // Find matching header for each field
    const nameHeader = headers.find(h => headerMappings.name.some(m => h === m)) || headers[0] || 'Full Name';
    const emailHeader = headers.find(h => headerMappings.email.some(m => h === m)) || headers[1] || 'Email Address';
    const phoneHeader = headers.find(h => headerMappings.phone.some(m => h === m)) || headers[2] || 'Phone Number';
    const companyHeader = headers.find(h => headerMappings.company.some(m => h === m)) || headers[3] || 'Company Name';
    const serviceHeader = headers.find(h => headerMappings.service.some(m => h === m)) || headers[4] || 'Service Interested In';
    const budgetHeader = headers.find(h => headerMappings.budget.some(m => h === m)) || headers[6] || 'Budget Range';
    const timeHeader = headers.find(h => headerMappings.preferredTime.some(m => h === m)) || headers[7] || 'Preferred Contact Time';
    const messageHeader = headers.find(h => headerMappings.message.some(m => h === m)) || headers[9] || 'Additional Message';
    const dateHeader = headers.find(h => h === 'Date') || 'Date';
    const timestampHeader = headers.find(h => h === 'Timestamp') || 'Timestamp';
    
    // Add data with correct header names
    rowData[nameHeader] = leadData.name || '';
    rowData[emailHeader] = leadData.email || '';
    rowData[phoneHeader] = leadData.phone || '';
    rowData[companyHeader] = leadData.company || '';
    rowData[serviceHeader] = leadData.service || '';
    rowData[budgetHeader] = leadData.budget || '';
    rowData[timeHeader] = leadData.preferredTime || '';
    rowData[messageHeader] = leadData.message || '';
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
    
    const nameHeader = headers.find(h => ['Full Name', 'Name', 'FullName'].includes(h)) || 'Full Name';
    const emailHeader = headers.find(h => ['Email Address', 'Email', 'EmailAddress'].includes(h)) || 'Email Address';
    const phoneHeader = headers.find(h => ['Phone Number', 'Phone', 'PhoneNumber'].includes(h)) || 'Phone Number';
    const companyHeader = headers.find(h => ['Company Name', 'Company', 'CompanyName'].includes(h)) || 'Company Name';
    const serviceHeader = headers.find(h => ['Service Interested In', 'Service', 'ServiceInterestedIn'].includes(h)) || 'Service Interested In';
    const budgetHeader = headers.find(h => ['Budget Range', 'Budget', 'BudgetRange'].includes(h)) || 'Budget Range';
    const timeHeader = headers.find(h => ['Preferred Contact Time', 'PreferredTime', 'PreferredContactTime'].includes(h)) || 'Preferred Contact Time';
    const messageHeader = headers.find(h => ['Additional Message', 'Message', 'AdditionalMessage'].includes(h)) || 'Additional Message';
    
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

