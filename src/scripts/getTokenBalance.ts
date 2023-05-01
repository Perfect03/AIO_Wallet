import { ethers } from 'ethers';
import useLocalStorage from '../hooks/use-localStorage';
import abi from '../locales/erc20.abi.json';
type address = string;

async function addCustomTokens(tokenAddress: address) {
  const bscRpcUrl = process.env.REACT_APP_RPC_ENDPONT;
  const chainId = process.env.REACT_APP_CHAIN_ID;
  const provider = new ethers.providers.JsonRpcProvider(bscRpcUrl, chainId);
  const tokenAbi = JSON.stringify(abi);
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);

  const [walletData, setWalletData] = useLocalStorage('wallet', '');
  const userAddress = walletData.address;

  const balance = await tokenContract.balanceOf(userAddress);

  return balance;
}

export default addCustomTokens;
