import axios, { AxiosResponse } from 'axios';

const instanceAxios = axios.create({ baseURL: 'http://localhost:3001/' });

export interface Coin {
  id: number;
  name: string;
  symbol: string;
  platform_id?: number;
}

export interface CoinMap {
  [id: number]: {
    id: number;
    name: string;
    symbol: string;
    platformId?: number;
  };
}

export async function getIdMap(): Promise<unknown> {
  const apiUrl = '/cryptocurrency/map';

  try {
    const response = await instanceAxios.get(apiUrl);
    const data = await response.data;
    const coinData: Coin[] = data.data;
    const map: CoinMap = {};
    coinData.forEach((item: Coin) => {
      map[item.id] = {
        id: item.id,
        name: item.name,
        symbol: item.symbol,
        platformId: item.platform_id,
      };
    });
    return map;
  } catch (error) {
    console.error(error);
  }
}
