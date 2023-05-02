import axios from 'axios';

//  функция для получения последних котировок
export default async function getLatestQuotes(): Promise<any> {
  const apiKey: string | undefined = process.env.REACT_APP_COINMARKETCAP_API_KEY;
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
