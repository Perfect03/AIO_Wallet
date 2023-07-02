import { BigNumber, ethers } from 'ethers';
import { TWallet } from '../../getWallet';
import defaultProvider from '../../rpc/defaultProvider';
import { TransactionState } from './routing';

export default async function sendTransaction(
  transaction: ethers.providers.TransactionRequest,
  walletData: TWallet
) {
  const wallet = new ethers.Wallet(walletData.pk, defaultProvider);

  if (transaction.value) {
    transaction.value = BigNumber.from(transaction.value);
  }

  try {
    const gas = await wallet.estimateGas(transaction);

    const txRes = await wallet.sendTransaction({ ...transaction, gasLimit: gas });

    await txRes.wait();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
