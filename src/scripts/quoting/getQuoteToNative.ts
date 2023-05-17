import { Token } from '@pancakeswap/sdk';
import { ChainId } from '@pancakeswap/sdk';
import { Asset } from '../../components/Wallet/Authorised/Main/helpers/checkSavedAssets';
import { WBNB } from './libs/constants';
import quoteV2 from './libs/quoteV2';

export default async function getQuoteToNative(asset: Asset) {
  const tokenIn = new Token(ChainId.BSC, asset.address, asset.decimals, asset.symbol);

  const cfg = {
    in: tokenIn,
    out: WBNB,
  };

  if (asset.address === WBNB.address) return asset.balance!;
  const price = await quoteV2(cfg);

  return +(price * asset.balance!).toFixed(6);
}
