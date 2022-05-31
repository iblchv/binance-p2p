const axios = require('axios');
require('dotenv').config();

const { BANKS, DATA_TEMPLATES } = require('../constants/dataTemplates');

class BinanceApi {
  _uri = process.env.BINANCE_SEARCH_URI;
  
  async getDataByAssetTradeAndPayment(asset, tradeType, payType) {
    try {
      const { data: { data } } = await axios.post(this._uri, {
        page: 1,
        rows: 10,
        payTypes: payType,
        asset,
        tradeType,
        fiat: 'RUB',
      });
      return data.map(item => {
        const name = item['advertiser']['nickName'];
        const asset = item['adv']['asset'];
        const bank = item['adv']['tradeMethods']
          .map((bank) => bank['payType'])
          .filter((bankName) => BANKS.includes(bankName));
        const tradeType = item['adv']['tradeType'];
        const price = item['adv']['price'];
        const minTransferValue = item['adv']['minSingleTransAmount'];
        const maxTransferValue = item['adv']['maxSingleTransAmount'];
        return [
          name,
          asset,
          bank,
          tradeType,
          price,
          minTransferValue,
          maxTransferValue,
        ];
      });
    } catch (e) {
      console.log(e.message);
    }
  }
  
  async getAllData() {
    const promises = DATA_TEMPLATES.map(async (tmp) => this.getDataByAssetTradeAndPayment(...tmp, BANKS));
    try {
      const fetched = (await Promise.all(promises)).flat(1);
      const data = [];
      fetched.forEach(item => {
        item[2].forEach(bank => {
          let newItem = [...item];
          newItem[2] = bank;
          data.push(newItem);
        });
      });
      return data
        .sort((a, b) => a[2].localeCompare(b[2]))
        .sort((a, b) => a[1].localeCompare(b[1]))
        .sort((a, b) => a[3].localeCompare(b[3]));
    } catch (e) {
      console.log(e.message);
    }
  }
}

module.exports = BinanceApi;
