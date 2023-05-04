import { AxiosResponse } from 'axios';

import axios from 'axios';

const symbol = 'BINANCE:BTCUSDT';
const url = `https://api.tradingview.com/v1/quote?symbols=${symbol}`;

export default async function test() {
  axios
    .get(url)
    .then((response: AxiosResponse) => {
      const data = response.data;
      const lastPrice = data[symbol].last_price;
      const timestamp = data[symbol].timestamp;
      console.log(`Last price of BTC: ${lastPrice} at ${new Date(timestamp * 1000)}`);
    })
    .catch((error: Error) => {
      console.log(error);
    });
}
