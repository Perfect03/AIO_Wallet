import { ethers } from 'ethers';
import defaultProvider from '../../rpc/defaultProvider';
import abi from './erc20.json';

export default function getTokenContract(address: string) {
  return new ethers.Contract(address, abi, defaultProvider);
}
