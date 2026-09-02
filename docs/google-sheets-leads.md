# Google Sheets Lead Capture — Setup Guide

**THE.MONKBRANDING.LAB**  
Temporary lead storage: Contact Form → Next.js API → Google Apps Script → Google Sheet

---

## Architecture

```
Visitor
  ↓
Contact Form  (ContactForm.tsx)
  ↓  POST /api/contact
Next.js API Route  (src/app/api/contact/route.ts)
  ↓  POST to GOOGLE_SHEETS_WEBHOOK_URL (server-side only)
Google Apps Script Web App  (docs/apps-script/lead-capture.gs)
  ↓
Google Sheet  (your spreadsheet)
```

The browser **never** sees the Google Sheet ID or the Apps Script URL.

---

## Step 1 — Create the Google Sheet

1. Open [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Name it: `The.MonkBrandingLab — Leads`
3. Note the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```
4. The Apps Script will automatically create the **Leads** sheet tab with headers on first submission. You do not need to create columns manually.

### Expected column structure (auto-created)

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Company | Service | Project Details | Status | Source |

- **Timestamp** — server-side, sheet timezone, format: `yyyy-MM-dd HH:mm:ss`
- **Status** — always `New` on creation
- **Source** — always `Portfolio Website`

---

## Step 2 — Create the Google Apps Script

1. Open [script.google.com](https://script.google.com)
2. Click **New project**
3. Name it: `MonkBrandingLab Lead Capture`
4. Delete the default `myFunction()` code
5. Paste the **entire contents** of [`docs/apps-script/lead-capture.gs`](./apps-script/lead-capture.gs)
6. Click **Save** (Ctrl+S)

---

## Step 3 — Set Script Properties

The Apps Script uses Script Properties to store sensitive configuration — the Spreadsheet ID is never hardcoded.

1. In Apps Script editor: **Project Settings** (gear icon, left sidebar)
2. Scroll to **Script Properties**
3. Click **Add script property** and add:

| Property | Value |
|---|---|
| `SPREADSHEET_ID` | Your Google Sheet ID from Step 1 |
| `SHEET_NAME` | `Leads` |

4. Click **Save script properties**

---

## Step 4 — Deploy as Web App

1. In Apps Script editor: **Deploy** → **New deployment**
2. Click the gear icon next to "Select type" → choose **Web app**
3. Configure:
   - **Description**: `MonkBrandingLab Lead Capture v1`
   - **Execute as**: `Me` (your Google account)
   - **Who has access**: `Anyone`  
     *(Required so the Next.js server can POST to it without authentication)*
4. Click **Deploy**
5. **Authorise** the script when prompted (allow it to access Google Sheets)
6. Copy the **Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

> ⚠️ Keep this URL private. Anyone with the URL can POST to your script. The Next.js server stores it server-side only.

---

## Step 5 — Configure Environment Variable

### Local development

Edit `.env.local` in the project root:

```
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Restart the Next.js server after saving:
```powershell
npm run dev
```

### Production (Vercel / other host)

Add `GOOGLE_SHEETS_WEBHOOK_URL` as a **server-side** environment variable in your hosting dashboard. **Do not** prefix it with `NEXT_PUBLIC_`.

---

## Step 6 — Local Testing

With the dev server running (`npm run dev`):

### Test 1 — Valid submission
```powershell
Invoke-RestMethod -Uri http://localhost:3000/api/contact `
  -Method POST `
  -ContentType 'application/json' `
  -Body '{"name":"Test User","email":"test@example.com","phone":"+91 98765 43210","company":"Test Co","service":"Brand & Positioning","message":"Testing Google Sheets lead capture."}'
```

**Expected response:**
```json
{ "success": true, "message": "Message received. We will be in touch soon." }
```

**Expected Google Sheet row:**
| Timestamp | Name | Email | Phone | Company | Service | Project Details | Status | Source |
|---|---|---|---|---|---|---|---|---|
| 2026-09-02 10:30:00 | Test User | test@example.com | +91 98765 43210 | Test Co | Brand & Positioning | Testing... | New | Portfolio Website |

### Test 2 — Missing name
```powershell
Invoke-RestMethod -Uri http://localhost:3000/api/contact `
  -Method POST `
  -ContentType 'application/json' `
  -Body '{"name":"","email":"test@example.com","service":"Brand & Positioning","message":"Test"}'
```
Expected: `400` — `"Name is required."`

### Test 3 — Invalid email
```powershell
Invoke-RestMethod -Uri http://localhost:3000/api/contact `
  -Method POST `
  -ContentType 'application/json' `
  -Body '{"name":"Test","email":"notanemail","service":"Brand & Positioning","message":"Test"}'
```
Expected: `400` — `"Please enter a valid email address."`

### Test 4 — Missing service
```powershell
Invoke-RestMethod -Uri http://localhost:3000/api/contact `
  -Method POST `
  -ContentType 'application/json' `
  -Body '{"name":"Test","email":"test@example.com","service":"","message":"Test"}'
```
Expected: `400` — `"Please select an area of interest."`

### Test 5 — Missing project details
```powershell
Invoke-RestMethod -Uri http://localhost:3000/api/contact `
  -Method POST `
  -ContentType 'application/json' `
  -Body '{"name":"Test","email":"test@example.com","service":"Brand & Positioning","message":""}'
```
Expected: `400` — `"Project details are required."`

---

## Step 7 — Production Testing

After deploying to your hosting provider with `GOOGLE_SHEETS_WEBHOOK_URL` set:

1. Open the live contact page
2. Fill in all fields with real test data
3. Submit the form
4. Verify:
   - Success message: *"Thank you. We've received your enquiry."*
   - Google Sheet has a new row with correct data
   - Status = `New`, Source = `Portfolio Website`
5. Delete the test row from the sheet

---

## Troubleshooting

### `GOOGLE_SHEETS_WEBHOOK_URL not set` warning in dev

The dev server returns success but does **not** write to the sheet. This is expected behaviour when the env var is empty. Set the URL in `.env.local` and restart.

### `502 Bad Gateway` from API

Apps Script is unreachable or returning an error. Check:
- The Web App URL in `.env.local` is correct and complete
- The Apps Script is deployed with **Who has access: Anyone**
- `SPREADSHEET_ID` Script Property is set correctly
- The Google account that owns the script has edit access to the Sheet

### `Server configuration error` from Apps Script

The `SPREADSHEET_ID` Script Property is missing. Re-check Step 3.

### Rows not appearing in correct sheet tab

Verify the `SHEET_NAME` Script Property matches the tab name exactly (case-sensitive). Default is `Leads`.

### Re-deployment after script changes

After editing the Apps Script code, you must create a **new deployment**:  
Deploy → **New deployment** → Web app → Deploy  
Then update `GOOGLE_SHEETS_WEBHOOK_URL` with the new URL.

---

## Security Considerations

- The Apps Script URL is stored **only** in server-side env vars — never in client code or `NEXT_PUBLIC_*` vars
- The browser never contacts the Apps Script or the Sheet directly
- The Sheet ID is stored **only** in Apps Script Script Properties — not in the codebase
- Server-side validation runs on both the Next.js API and the Apps Script
- Input is sanitised and length-limited on both layers
- The script only **appends** rows — it cannot read, modify or delete existing data via the web app endpoint
- No authentication tokens are stored in the codebase

---

## Removing This Integration Later

To remove Google Sheets and wire a permanent email/CRM solution:

1. Delete `GOOGLE_SHEETS_WEBHOOK_URL` from your environment
2. Replace the Google Sheets forwarding block in `src/app/api/contact/route.ts` with your new provider
3. Archive or delete the Apps Script deployment
4. Keep `.env.example` updated with any new variables

The `ContactForm.tsx` component requires no changes — it only POSTs to `/api/contact`.
