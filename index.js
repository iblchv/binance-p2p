const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8585;
const googleRouter = require('./src/router/googleRouter');
const binanceRouter = require('./src/router/binanceRouter');

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/google', googleRouter);
app.use('/api/v1/binance', binanceRouter);

app.listen(PORT, () => console.log(`App started on PORT:${PORT}.`));
