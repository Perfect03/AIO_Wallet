import { BigNumber, ethers } from 'ethers';
import { TWallet } from '../../getWallet';
import defaultProvider from '../../rpc/defaultProvider';
import { TransactionState } from './routing';

export default async function sendTransaction(
  transaction: ethers.providers.TransactionRequest,
  walletData: TWallet
): Promise<TransactionState> {
  const wallet = new ethers.Wallet(walletData.pk, defaultProvider);

  if (transaction.value) {
    transaction.value = BigNumber.from(transaction.value);
  }

  const txRes = await wallet.sendTransaction(transaction);
  let receipt = null;

  while (receipt === null) {
    try {
      receipt = await defaultProvider.getTransactionReceipt(txRes.hash);

      if (receipt === null) {
        continue;
      }
    } catch (e) {
      console.log(`Receipt error:`, e);
      break;
    }
  }

  if (receipt) {
    return TransactionState.Sent;
  } else {
    return TransactionState.Failed;
  }
}
