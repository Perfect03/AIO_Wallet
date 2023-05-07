import defaultProvider from '../rpc/defaultProvider';

export default async function getFees() {
  return (await defaultProvider.getFeeData()).gasPrice;
}
