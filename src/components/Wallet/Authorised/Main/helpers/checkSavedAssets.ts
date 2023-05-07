import ext from '../../../../../scripts/quoting/token-lists/pancakeswap-extended.json';

export interface Asset {
  name: string;
  symbol: string;
  address: string;
  chainId: number;
  decimals: number;
  logoURI: string;
  balance?: number;
}

export default function checkSavedAssets(assets: string[]) {
  const renderAssets: Asset[] = [];

  if (assets.length)
    for (const asset of ext) {
      if (assets.includes(asset.address)) {
        renderAssets.push(asset);
      }
    }

  return renderAssets;
}
