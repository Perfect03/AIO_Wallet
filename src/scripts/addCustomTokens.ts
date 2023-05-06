import { ethers } from 'ethers';
import abi from '../scripts/quoting/token-lists/erc20.json';
async function getCustomTokenData(address: string) {
  const bscRpcUrl = process.env.REACT_APP_RPC_ENDPONT;
  const chainId = process.env.REACT_APP_CHAIN_ID;
  const provider = new ethers.providers.JsonRpcProvider(bscRpcUrl, chainId);
  const tokenAbi = JSON.stringify(abi);
  const tokenContract = new ethers.Contract(address, tokenAbi, provider);

  const name = await tokenContract.name();
  const symbol = await tokenContract.symbol();
  const decimals = await tokenContract.decimals();

  const token = {
    type: 'BEP20',
    options: {
      address,
      symbol: symbol,
      name: name,
      decimals: decimals,
    },
  };

  return token;
}

export default getCustomTokenData;
