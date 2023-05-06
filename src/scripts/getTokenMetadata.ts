import axios from 'axios';

const instanceAxios = axios.create({ baseURL: 'http://localhost:3001/' });

export default async function getTokenMetadata(id: string): Promise<string> {
  const apiUrl = '/cryptocurrency/info';
  try {
    const response = await instanceAxios.get(apiUrl, {
      params: {
        id: id,
      },
    });
    const data = await response.data.data;
    const logoData = data[id].logo;
    return logoData;
  } catch (error) {
    console.error(error);
    return '';
  }
}
