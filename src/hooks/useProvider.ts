import useLocalStorage from './useLocalStorage';
import { TWallet } from '../scripts/getWallet';
import defaultProvider from '../scripts/rpc/defaultProvider';
// import { Eip1193Bridge } from '@ethersproject/experimental';

import { ethers } from 'ethers';
import { JsonRpcProvider } from '@uniswap/widgets';

export default function useProvider() {
  const wallet = useLocalStorage('wallet', { mnemonic: [], privateKey: '', address: '' })[0];

  const asd = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_ENDPOINT);
  const w = new ethers.Wallet(wallet.privateKey, asd);

  // const zxc = new Eip1193Bridge(new ethers.BaseWallet(wallet.privateKey));

  return asd;
}
