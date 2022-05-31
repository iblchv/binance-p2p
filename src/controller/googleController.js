const sheets = require('../api/googleSheetsApi');
require('dotenv').config();

class GoogleController {
  
  async getSheetData(req, res) {
    try {
      const data = await sheets.read({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: process.env.DATA_SHEET,
      });
      res.status(200).json(data);
    } catch (error) {
      console.log({ success: false, error });
    }
  }
  
}

module.exports = new GoogleController();
