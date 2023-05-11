import { ethers } from 'ethers';
import { Asset } from '../../components/Wallet/Authorised/Main/helpers/checkSavedAssets';
import { TWallet } from '../getWallet';
import defaultProvider from '../rpc/defaultProvider';
import { fromReadableAmount } from './libs/conversion';
import getTokenContract from './token-lists/getTokenContract';

export default async function simulateTransfer(
  asset: Asset,
  to: string,
  sum: number,
  walletData: TWallet
) {
  const token = getTokenContract(asset.address);
  const wallet = new ethers.Wallet(walletData.pk, defaultProvider);

  const resp = await token
    .connect(wallet)
    .callStatic.transfer(to, fromReadableAmount(sum, asset.decimals));

  return resp;
}
