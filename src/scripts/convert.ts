import axios from 'axios';

const instanceAxios = axios.create({ baseURL: 'http://localhost:3001/' });

//const endpoint = 'https://pro-api.coinmarketcap.com/v1/tools/price-conversion';

export default async function convert(
  amount: number,
  id: string,
  convert: string
): Promise<unknown> {
  const apiUrl = '/tools/price-conversion';

  try {
    const response = await instanceAxios.get(apiUrl, {
      params: {
        amount: amount,
        id: id,
        convert: convert,
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}
