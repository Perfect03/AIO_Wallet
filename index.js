const express = require('express');
const cors = require('cors');
const { request } = require('undici');
require('dotenv').config({ path: '.env.local' });

const app = express();

app.all('/*', (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/cryptocurrency/quotes/latest', async (req, response) => {
  const id = req.query.id;
  try {
    const res = await request(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${id}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
        },
      }
    );
    const data = await res.body.json();
    response.status(200).json(data);
  } catch (error) {
    response.status(500).send('error');
  }
});

app.get('/', () => {});

app.use(cors({ origin: true }));
app.listen(3001, () => console.log('Server started'));
