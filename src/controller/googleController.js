const sheets = require('../api/googleSheetsApi');
const Binance = require('../api/binanceApi');
const axios = require('axios');
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
  
  async writeTickerData(req, res) {
    try {
      const spreadsheetId = process.env.SPREADSHEET_ID;
      const range = process.env.RANGE_TICKER;
      const { data } = await axios.get('https://api1.binance.com/api/v3/ticker/price');
      const values = data.map((ticker) => [
        ticker.symbol,
        ticker.price.replace('.', ','),
        // ticker.price,
      ]);
      // console.log({ values });
      await sheets.clear({ spreadsheetId, range });
      await sheets.update({ spreadsheetId, range, values });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log({ success: false, error });
    }
  }
  
}

module.exports = new GoogleController();
