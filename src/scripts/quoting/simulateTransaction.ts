import { ethers } from 'ethers';
import { Asset } from '../../components/Wallet/Authorised/Main/helpers/checkSavedAssets';
import { TWallet } from '../getWallet';
import defaultProvider from '../rpc/defaultProvider';
import { fromReadableAmount } from './libs/conversion';
import getTokenContract from './token-lists/getTokenContract';

export default async function estimateGas(
  asset: Asset,
  to: string,
  sum: number,
  walletData: TWallet
) {
  if (!!asset.address) {
    const token = getTokenContract(asset.address);
    const wallet = new ethers.Wallet(walletData.pk, defaultProvider);

    const resp = await token
      .connect(wallet)
      .estimateGas.transfer(to, fromReadableAmount(sum, asset.decimals));

    return resp;
  } else {
    return defaultProvider.estimateGas({
      to,
      value: fromReadableAmount(sum, 18),
    });
  }
}
