import axios, { AxiosResponse } from 'axios';

const instanceAxios = axios.create({ baseURL: 'http://localhost:3001/' });

export type Coin = {
  id: number;
  name: string;
  symbol: string;
  rank: number;
  platform: {
    symbol: string;
    token_address: string;
  };
  is_active: boolean;
};

export async function getIdMap(): Promise<Coin[]> {
  const apiUrl = '/cryptocurrency/map';

  try {
    const response = await instanceAxios.get(apiUrl);
    return response.data.data.filter((el: Coin) => {
      try {
        return el.platform.symbol == 'BNB' && el.is_active;
      } catch {
        return false;
      }
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}
