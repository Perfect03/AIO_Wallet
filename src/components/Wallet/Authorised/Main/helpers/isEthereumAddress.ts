// import { keccak256 } from 'ethereumjs-util';
import { ethers } from 'ethers';

const isEthereumAddress = (input: string): string => {
  if (!input) return 'wrong';

  try {
    const address = ethers.utils.getAddress(input);
    return address === input ? 'valid' : 'checksum';
  } catch {
    return 'wrong';
  }
};

export default isEthereumAddress;
