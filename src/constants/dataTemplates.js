const BANKS = [
  'Tinkoff',
  'RosBank',
  'RaiffeisenBankRussia',
  'PostBankRussia',
  'HomeCreditBank',
  'RussianStandardBank',
  'MTSBank',
  'QIWI',
  'YandexMoney',
];

const DATA_TEMPLATES = [
  // USDT
  ['USDT', 'BUY'],
  ['USDT', 'SELL'],
  
  // BTC
  ['BTC', 'BUY'],
  ['BTC', 'SELL'],
  
  // BUSD
  ['BUSD', 'BUY'],
  ['BUSD', 'SELL'],
  
  // BNB
  ['BNB', 'BUY'],
  ['BNB', 'SELL'],
  
  // ETH
  ['ETH', 'BUY'],
  ['ETH', 'SELL'],
  
  // SHIB
  ['SHIB', 'BUY'],
  ['SHIB', 'SELL'],
];


module.exports = { DATA_TEMPLATES, BANKS };
