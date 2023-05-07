import ext from '../../../../../scripts/quoting/token-lists/pancakeswap-extended.json';
import Assets from '../../WalletInfo/Assets';
import { Asset } from './checkSavedAssets';

export default function addNewAsset(newAsset: string) {
  for (const asset of ext) {
    if (asset.address === newAsset) {
      return asset as Asset;
    }
  }
}
