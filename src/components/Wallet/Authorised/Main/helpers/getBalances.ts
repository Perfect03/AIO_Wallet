import getTokenBalance from '../../../../../scripts/quoting/getTokenBalance';
import { Asset } from './checkSavedAssets';

export default async function getBalances(assets: Asset[], user: string) {
  for (const asset of assets) {
    asset.balance = await getTokenBalance(asset, user);
  }
  return assets;
}
