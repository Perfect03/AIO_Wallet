import { Token, Fetcher, Route } from '@pancakeswap/sdk';
import defaultProvider from '../../rpc/defaultProvider';

export type ConfigV2 = {
  in: Token;
  out: Token;
};

export default async function quoteV2(params: ConfigV2) {
  const pair = await Fetcher.fetchPairData(params.in, params.out, defaultProvider);

  const route = new Route([pair], params.in, params.out);

  return +route.midPrice.toFixed(4);
}
