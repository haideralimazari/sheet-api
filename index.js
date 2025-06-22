const express = require('express');
const { google } = require('googleapis');
const app = express();
const PORT = process.env.PORT || 3000;
const keys = require('./service-account-key.json');

async function getSheetData() {
  const auth = new google.auth.GoogleAuth({
    credentials: keys,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: '1hppPoVhFkQKJGejx35c6Rcg5v7lhOiaTwdiohvGnwNU', // <-- YOUR SHEET ID
    range: 'Database!A1:D100', // <-- YOUR TAB NAME + Range
  });

  return response.data.values;
}

app.get('/getSheetData', async (req, res) => {
  try {
    const data = await getSheetData();
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching sheet data');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




