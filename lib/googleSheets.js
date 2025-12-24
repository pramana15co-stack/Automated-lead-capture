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
async function initGoogleSheets() {
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

    const credentials = typeof credentialsJson === 'string' 
      ? JSON.parse(credentialsJson) 
      : credentialsJson;

    // Authenticate with service account
    const serviceAccountAuth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    await doc.loadInfo();

    // Get or create "Leads" sheet
    sheet = doc.sheetsByTitle['Leads'];
    if (!sheet) {
      sheet = await doc.addSheet({ 
        title: 'Leads',
        headerValues: ['Name', 'Email', 'Phone', 'Service', 'Date', 'Timestamp']
      });
      logInfo('Created new "Leads" sheet');
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
    
    for (const row of rows) {
      const rowEmail = row.get('Email')?.toLowerCase();
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
    const { sheet: currentSheet } = await initGoogleSheets();
    
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
    await currentSheet.addRow({
      Name: leadData.name,
      Email: leadData.email,
      Phone: leadData.phone,
      Service: leadData.service,
      Date: date,
      Timestamp: timestamp.toString()
    });

    logInfo('Lead saved to Google Sheets', { email: leadData.email });
    
    return {
      success: true,
      message: 'Lead saved successfully'
    };
  } catch (error) {
    logError('Error saving lead to Google Sheets', error);
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
    
    const leads = rows.map(row => ({
      id: row.rowNumber,
      name: row.get('Name') || '',
      email: row.get('Email') || '',
      phone: row.get('Phone') || '',
      service: row.get('Service') || '',
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

