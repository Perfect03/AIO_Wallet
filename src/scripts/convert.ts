import axios from 'axios';

const endpoint = 'https://pro-api.coinmarketcap.com/v1/tools/price-conversion';

export default async function convert(amount: number, currency: number, convert: number) {
  axios
    .get(endpoint, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.REACT_APP_COINMARKETCAP_API_KEY,
        'Content-Type': 'application/json',
      },
      params: {
        amount: amount, // количество единиц валюты для конвертации
        symbol: currency, // идентификатор валюты для конвертации
        convert: convert, // идентификатор валюты, в которую происходит конвертация
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}
