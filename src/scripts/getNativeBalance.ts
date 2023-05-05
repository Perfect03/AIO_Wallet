import defaultProvider from './rpc/defaultProvider';

export default function getNativeBalance(address: string) {
  return defaultProvider.getBalance(address);
}
