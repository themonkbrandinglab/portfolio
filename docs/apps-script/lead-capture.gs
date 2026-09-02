/**
 * THE.MONKBRANDING.LAB — Google Sheets Lead Capture
 * Google Apps Script Web App
 *
 * Deploy as: Web App → Execute as: Me → Who has access: Anyone
 *
 * Script Properties (Project Settings → Script Properties):
 *   SPREADSHEET_ID  — your Google Sheet ID
 *   SHEET_NAME      — sheet tab name (default: Leads)
 */

// ── Configuration ─────────────────────────────────────────────────────────────

function getConfiguration() {
  var props = PropertiesService.getScriptProperties();
  var spreadsheetId = props.getProperty('SPREADSHEET_ID');
  var sheetName     = props.getProperty('SHEET_NAME') || 'Leads';

  if (!spreadsheetId) {
    throw new Error('SPREADSHEET_ID script property is not set.');
  }

  return { spreadsheetId: spreadsheetId, sheetName: sheetName };
}

// ── Validation ────────────────────────────────────────────────────────────────

var LIMITS = {
  name:    100,
  email:   254,
  phone:   30,
  company: 150,
  service: 100,
  message: 5000
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function validatePayload(payload) {
  if (!payload.name || payload.name.trim().length === 0) {
    return 'Name is required.';
  }
  if (payload.name.trim().length > LIMITS.name) {
    return 'Name exceeds maximum length.';
  }

  if (!payload.email || payload.email.trim().length === 0) {
    return 'Email is required.';
  }
  if (!isValidEmail(payload.email.trim())) {
    return 'Invalid email address.';
  }
  if (payload.email.trim().length > LIMITS.email) {
    return 'Email exceeds maximum length.';
  }

  if (!payload.service || payload.service.trim().length === 0) {
    return 'Service / area of interest is required.';
  }
  if (payload.service.trim().length > LIMITS.service) {
    return 'Service field exceeds maximum length.';
  }

  if (!payload.message || payload.message.trim().length === 0) {
    return 'Project details are required.';
  }
  if (payload.message.trim().length > LIMITS.message) {
    return 'Project details exceed maximum length.';
  }

  return null; // valid
}

// ── Sanitize ──────────────────────────────────────────────────────────────────

function sanitizePayload(payload) {
  function clean(val, limit) {
    if (!val) return '';
    return String(val).trim().slice(0, limit);
  }

  return {
    name:    clean(payload.name,    LIMITS.name),
    email:   clean(payload.email,   LIMITS.email),
    phone:   clean(payload.phone,   LIMITS.phone),
    company: clean(payload.company, LIMITS.company),
    service: clean(payload.service, LIMITS.service),
    message: clean(payload.message, LIMITS.message)
  };
}

// ── Append lead row ───────────────────────────────────────────────────────────

function appendLead(config, data) {
  var ss    = SpreadsheetApp.openById(config.spreadsheetId);
  var sheet = ss.getSheetByName(config.sheetName);

  if (!sheet) {
    // Create sheet with headers if it doesn't exist
    sheet = ss.insertSheet(config.sheetName);
    sheet.appendRow([
      'Timestamp', 'Name', 'Email', 'Phone', 'Company',
      'Service', 'Project Details', 'Status', 'Source'
    ]);

    // Style header row
    var header = sheet.getRange(1, 1, 1, 9);
    header.setFontWeight('bold');
    header.setBackground('#1a1a1a');
    header.setFontColor('#ffffff');
  }

  // Server-side timestamp in spreadsheet timezone
  var now = new Date();
  var timezone = ss.getSpreadsheetTimeZone();
  var timestamp = Utilities.formatDate(now, timezone, 'yyyy-MM-dd HH:mm:ss');

  sheet.appendRow([
    timestamp,
    data.name,
    data.email,
    data.phone,
    data.company,
    data.service,
    data.message,
    'New',              // Status — always New on creation
    'Portfolio Website' // Source — always fixed
  ]);
}

// ── JSON response helpers ─────────────────────────────────────────────────────

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function successResponse() {
  return jsonResponse({ success: true, message: 'Lead submitted successfully.' });
}

function errorResponse(message) {
  return jsonResponse({ success: false, message: message || 'Unable to submit your request.' });
}

// ── Entry point ───────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    // Parse request body
    var payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return errorResponse('Invalid JSON payload.');
    }

    // Validate
    var validationError = validatePayload(payload);
    if (validationError) {
      return errorResponse(validationError);
    }

    // Sanitize
    var clean = sanitizePayload(payload);

    // Load configuration
    var config;
    try {
      config = getConfiguration();
    } catch (configErr) {
      Logger.log('Configuration error: ' + configErr.message);
      return errorResponse('Server configuration error.');
    }

    // Append to sheet
    appendLead(config, clean);

    return successResponse();

  } catch (err) {
    Logger.log('doPost error: ' + err.message);
    return errorResponse('An unexpected error occurred.');
  }
}

// ── GET — health check (optional, remove in production if preferred) ──────────

function doGet() {
  return jsonResponse({ status: 'ok', service: 'monkbranding-lead-capture' });
}
