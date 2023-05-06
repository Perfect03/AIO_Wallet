import { render } from 'react-dom';
import getTokenBalance from '../../../../../scripts/quoting/getTokenBalance';
import top100 from '../../../../../scripts/quoting/token-lists/pancakeswap-top-100.json';

export interface Asset {
  name: string;
  symbol: string;
  address: string;
  chainId: number;
  decimals: number;
  logoURI: string;
  balance?: string;
}

export default function checkSavedAssets(assets: string[]) {
  const renderAssets: Asset[] = [];

  if (assets.length)
    for (const asset of top100.tokens) {
      if (assets.includes(asset.address)) {
        renderAssets.push(asset);
      }
    }

  return renderAssets;
}
