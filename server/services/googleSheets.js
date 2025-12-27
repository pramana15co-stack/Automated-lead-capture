/**
 * Google Sheets Integration Service
 * Handles saving leads and retrieving lead data from Google Sheets
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Cloud Project
 * 2. Enable Google Sheets API
 * 3. Create a Service Account and download JSON key
 * 4. Share your Google Sheet with the service account email
 * 5. Add GOOGLE_SHEETS_CREDENTIALS and GOOGLE_SHEET_ID to .env
 */

const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

let doc = null;

/**
 * Initialize Google Sheets connection
 */
async function initGoogleSheets() {
  if (doc) return doc;

  try {
    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!credentials || !sheetId) {
      throw new Error('Google Sheets credentials not configured');
    }

    // Authenticate with service account
    const serviceAccountAuth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    await doc.loadInfo();

    // Create "Leads" sheet if it doesn't exist
    let sheet = doc.sheetsByTitle['Leads'];
    if (!sheet) {
      sheet = await doc.addSheet({ title: 'Leads' });
      await sheet.setHeaderRow(['Name', 'Email', 'Phone', 'Service', 'Date']);
    }

    return doc;
  } catch (error) {
    console.error('Error initializing Google Sheets:', error);
    throw error;
  }
}

/**
 * Save lead to Google Sheets
 */
async function saveToGoogleSheets(lead) {
  try {
    const doc = await initGoogleSheets();
    const sheet = doc.sheetsByTitle['Leads'];

    // Add row with lead data
    await sheet.addRow({
      Name: lead.name,
      Email: lead.email,
      Phone: lead.phone,
      Service: lead.service,
      Date: new Date(lead.date).toLocaleString()
    });

    console.log(`✅ Lead saved to Google Sheets: ${lead.email}`);
    return true;
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    throw error;
  }
}

/**
 * Retrieve all leads from Google Sheets
 */
async function getLeads() {
  try {
    const doc = await initGoogleSheets();
    const sheet = doc.sheetsByTitle['Leads'];

    const rows = await sheet.getRows();
    
    return rows.map(row => ({
      id: row.rowNumber,
      name: row.get('Name'),
      email: row.get('Email'),
      phone: row.get('Phone'),
      service: row.get('Service'),
      date: row.get('Date')
    })).reverse(); // Most recent first
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
}

module.exports = {
  saveToGoogleSheets,
  getLeads
};



