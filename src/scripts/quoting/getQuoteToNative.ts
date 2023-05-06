import { Token } from '@uniswap/sdk-core';
import { WBNB_TOKEN } from './libs/constants';
import { quote } from './libs/quote';
import { SupportedChainId } from '@uniswap/sdk-core';

export default async function getQuoteToNative(amount: number, address: string, decimals: number) {
  const token = new Token(SupportedChainId.BNB, address, decimals);

  const cfg = {
    amountIn: amount,
    in: token,
    out: WBNB_TOKEN,
  };

  return await quote(cfg);
}
