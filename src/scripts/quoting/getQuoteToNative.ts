import { Token } from '@uniswap/sdk-core';
import { WBNB_TOKEN } from './libs/constants';
import { quote } from './libs/quote';
import { SupportedChainId } from '@uniswap/sdk-core';
import { Asset } from '../../components/Wallet/Authorised/Main/helpers/checkSavedAssets';

export default async function getQuoteToNative(asset: Asset) {
  const token = new Token(SupportedChainId.BNB, asset.address, asset.decimals);

  const cfg = {
    amountIn: asset.balance!,
    in: token,
    out: WBNB_TOKEN,
  };

  return +(await quote(cfg));
}
