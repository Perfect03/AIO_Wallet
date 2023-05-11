import { Token } from '@pancakeswap/sdk';
import { ChainId } from '@pancakeswap/sdk';
import { Asset } from '../../components/Wallet/Authorised/Main/helpers/checkSavedAssets';
import { WBNB } from './libs/constants';
import quoteV2 from './libs/quoteV2';

export default function getQuoteToNative(asset: Asset) {
  const tokenIn = new Token(ChainId.BSC, asset.address, asset.decimals, asset.symbol);

  const cfg = {
    in: tokenIn,
    out: WBNB,
  };
  let quote = 0;

  if (asset.address === WBNB.address) return asset.balance!;
  quoteV2(cfg).then((res) => (quote = asset.balance! * res));

  return quote;
}
