import axios from 'axios';
const instanceAxios = axios.create({ baseURL: 'http://localhost:3001/' });

//  функция для получения последних котировок
export default async function getLatestQuotes(id: number): Promise<unknown> {
  const apiUrl = '/cryptocurrency/quotes/latest';

  try {
    const response = await instanceAxios.get(apiUrl, {
      params: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
