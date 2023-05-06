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
}

export interface AssetWithBalance extends Asset {
  balance: string;
}

export default async function checkSavedAssets(assets: string[], user: string) {
  const renderAssets: AssetWithBalance[] = [];

  if (assets.length)
    for (const asset of top100.tokens) {
      if (assets.includes(asset.address)) {
        const balance = await getTokenBalance(asset, user);
        renderAssets.push({ ...asset, balance });
      }
    }

  return renderAssets;
}
