import axios from 'axios';

//  функция для получения последних котировок
export default async function getLatestQuotes(id: number): Promise<any> {
  const apiKey: string | undefined = process.env.REACT_APP_COINMARKETCAP_API_KEY;
  const apiUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      },
      params: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
