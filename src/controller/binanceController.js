require('dotenv').config();
const Binance = require('../api/binanceApi');

const api = new Binance();

class BinanceController {
  
  async getAllData(req, res) {
    try {
      res.status(200).json(await api.getAllData());
    } catch (error) {
      console.log({ success: false, error });
    }
  }
  
}

module.exports = new BinanceController();
