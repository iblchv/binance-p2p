const sheets = require('../api/googleSheetsApi');
const Binance = require('../api/binanceApi');
require('dotenv').config();

const binanceApi = new Binance();

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
  
  async writeData(req, res) {
    try {
      const spreadsheetId = process.env.SPREADSHEET_ID;
      const range = process.env.RANGE_P2P;
      const values = await binanceApi.getAllData();
      await sheets.clear({ spreadsheetId, range });
      await sheets.update({ spreadsheetId, range, values });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log({ success: false, error });
    }
  }
  
}

module.exports = new GoogleController();
