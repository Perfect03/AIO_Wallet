import getTokenContract from '../../../../../scripts/quoting/token-lists/getTokenContract';
import ext from '../../../../../scripts/quoting/token-lists/pancakeswap-extended.json';
import custom from '../../../../../assets/CustomToken.svg';

export interface Asset {
  name: string;
  symbol: string;
  address: string;
  chainId: number;
  decimals: number;
  logoURI: string;
  balance?: number;
}

export default async function checkSavedAssets(assets: string[]) {
  const renderAssets: Asset[] = [];

  const extAssetsArray = ext.map((el) => el.address);

  for (const asset of assets) {
    const assetIndex = extAssetsArray.findIndex((el) => el === asset);
    if (assetIndex >= 0) {
      renderAssets.push(ext[assetIndex]);
    } else {
      const customToken = getTokenContract(asset);
      try {
        renderAssets.push({
          name: await customToken.name(),
          symbol: await customToken.symbol(),
          address: asset,
          chainId: 56,
          decimals: await customToken.decimals(),
          logoURI: custom,
        });
      } catch {}
    }
  }

  return renderAssets;
}
