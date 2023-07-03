import quoteV2 from './libs/quoteV2';
import { BUSD, WBNB } from './libs/constants';
import { ChainId, Token } from '@pancakeswap/sdk';
import { Asset } from '../../components/Wallet/Authorised/Main/helpers/checkSavedAssets';

export default async function getTokenPrice(asset: Asset) {
  const tokenIn = new Token(ChainId.BSC, asset.address, asset.decimals, asset.symbol);

  const cfg = {
    in: tokenIn,
    out: WBNB,
  };

  const priceNative = await quoteV2(cfg);

  const priceUsd = await quoteV2({
    in: WBNB,
    out: BUSD,
  });

  return +(priceNative * priceUsd).toFixed(6);
}
