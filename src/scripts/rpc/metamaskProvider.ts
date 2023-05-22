import { ethers } from 'ethers';

let metamaskProvider: ethers.providers.Web3Provider | undefined;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  alert('Install Metamask: https://metamask.io/');
}

export default metamaskProvider!;
