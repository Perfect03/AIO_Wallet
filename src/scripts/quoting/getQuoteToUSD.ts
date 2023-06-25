import { ChainId, Token } from '@pancakeswap/sdk';
import { Asset } from '../../components/Wallet/Authorised/Main/helpers/checkSavedAssets';
import { BUSD, WBNB } from './libs/constants';
import quoteV2 from './libs/quoteV2';

export default function getNativeToUSD(asset: Asset) {
  let quote = 0;

  quoteV2({
    in: WBNB,
    out: BUSD,
  }).then((res) => (quote = asset.balance! * res));

  return quote;
}
