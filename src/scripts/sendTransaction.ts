import { Wallet, Transaction } from 'ethers';
import { ethers } from 'ethers';
import useLocalStorage from '../hooks/use-localStorage';

type address = string;

async function sendTransaction(_to: address, _amount: number) {
  const bscRpcUrl = process.env.REACT_APP_RPC_ENDPONT;
  const chainId = process.env.REACT_APP_CHAIN_ID;
  const provider = new ethers.providers.JsonRpcProvider(bscRpcUrl, chainId);

  const [walletData, setWalletData] = useLocalStorage('wallet', '');

  const privateKey = walletData.privateKey;

  const wallet = new Wallet(privateKey, provider);

  const tx = {
    to: _to,
    value: ethers.utils.parseUnits('0.1', 'ether'),
  };

  const signedTx = await wallet.signTransaction(tx);

  const txHash = await provider.sendTransaction(signedTx);

  return txHash;
}

export default sendTransaction;
