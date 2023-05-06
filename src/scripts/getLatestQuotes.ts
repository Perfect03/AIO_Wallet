import axios from 'axios';
import { Coin } from './cryptocurrencyMap';
const instanceAxios = axios.create({ baseURL: 'http://localhost:3001/' });

//  функция для получения последних котировок
export default async function getLatestQuotes(code: string, tokens: Coin[]): Promise<number> {
  const apiUrl = '/cryptocurrency/quotes/latest';

  const token = tokens.find((el) => el.symbol == code);

  try {
    if (token?.id) {
      const response = await instanceAxios.get(apiUrl, {
        params: {
          id: token?.id,
        },
      });
      console.log(response);
      return response.data.data[token?.id].quote.USD.price as number;
    } else return 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
