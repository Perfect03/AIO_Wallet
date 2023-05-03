import { ethers } from 'ethers';
import defaultProvider from './rpc/defaultProvider';
import abi from '../locales/erc20.abi.json';
type address = string;

async function getTokenBalance(tokenAddress: address, walletData: any) {
  const provider = defaultProvider;
  const tokenAbi = JSON.stringify(abi);
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);

  const userAddress = walletData.address;

  const balance = await tokenContract.balanceOf(userAddress);

  return balance;
}

export default getTokenBalance;
