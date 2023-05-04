import { Wallet } from 'ethers';
import { ethers } from 'ethers';
import defaultProvider from './rpc/defaultProvider';

type address = string;

async function sendTransaction(_to: address, _amount: number, walletData: any) {
  const provider = defaultProvider;

  const privateKey = walletData.privateKey;

  const wallet = new Wallet(privateKey, provider);

  const tx = {
    to: _to,
    value: _amount,
  };

  const signedTx = await wallet.signTransaction(tx);

  const txHash = await provider.sendTransaction(signedTx);

  return txHash;
}

export default sendTransaction;
