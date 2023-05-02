import axios, { AxiosResponse } from 'axios';

export interface Coin {
  id: number;
  name: string;
  symbol: string;
  platform_id?: number;
}

export interface CoinMap {
  [id: number]: {
    name: string;
    symbol: string;
    platformId?: number;
  };
}

const apiUrl: string = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map';
const apiKey: string | undefined = process.env.REACT_APP_COINMARKETCAP_API_KEY;

export async function getIdMap() {
  axios
    .get(apiUrl, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      },
    })
    .then((response: AxiosResponse) => {
      const data: Coin[] = response.data.data;
      const map: CoinMap = {};

      data.forEach((item: Coin) => {
        map[item.id] = {
          name: item.name,
          symbol: item.symbol,
          platformId: item.platform_id,
        };
      });

      return map;
    })
    .catch((error: Error) => {
      console.log(error);
    });
}
