import defaultProvider from '../rpc/defaultProvider';
import { toReadableAmount } from './libs/conversion';

export default async function getNativeBalance(address: string) {
  return +toReadableAmount(await defaultProvider.getBalance(address), 18);
}
