import defaultProvider from '../rpc/defaultProvider';

export default async function getNativeBalance(address: string) {
  return (await defaultProvider.getBalance(address)).toString();
}
