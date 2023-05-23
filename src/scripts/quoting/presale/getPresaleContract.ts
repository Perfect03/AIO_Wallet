import { ethers } from 'ethers';
import defaultProvider from '../../rpc/defaultProvider';
import metamaskProvider from '../../rpc/metamaskProvider';
import abi from './presaleABI.json';

export default function getPresaleContract() {
  const contract = new ethers.Contract(
    process.env.REACT_APP_PRESALE_CONTRACT_ADDRESS as string,
    abi.abi,
    defaultProvider
  );

  return contract;
}
