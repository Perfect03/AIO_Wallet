import { ethers } from 'ethers';
import { Asset } from '../components/Wallet/Authorised/Main/helpers/checkSavedAssets';
import { TWallet } from './getWallet';
import { fromReadableAmount } from './quoting/libs/conversion';
import getTokenContract from './quoting/token-lists/getTokenContract';
import defaultProvider from './rpc/defaultProvider';

export default async function withdraw(asset: Asset, to: string, sum: number, walletData: TWallet) {
  const wallet = new ethers.Wallet(walletData.pk, defaultProvider);

  try {
    if (!asset.address) {
      console.log(to, fromReadableAmount(sum, asset.decimals));
      const resp = await wallet.sendTransaction({
        to,
        value: fromReadableAmount(sum, asset.decimals),
      });
      console.log(resp);
    } else {
      const token = getTokenContract(asset.address);
      await token.connect(wallet).transfer(to, fromReadableAmount(sum, asset.decimals));
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
