import ext from '../../../../../scripts/quoting/token-lists/pancakeswap-extended.json';
import { Asset } from './checkSavedAssets';

export default function addNewAsset(newAsset: string) {
  for (const asset of ext) {
    if (
      asset.address === newAsset &&
      asset.address !== '0x3B6E1F5FdE7f5aFce2F2571d761bD9A3743dEe41'
    ) {
      return asset as Asset;
    }
  }
}
