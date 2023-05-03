import { ethers } from 'ethers';

const url = process.env.REACT_APP_RPC_ENDPOINT;
const chainId = process.env.REACT_APP_CHAIN_ID;

const defaultProvider = new ethers.providers.JsonRpcProvider(url, chainId);

export default defaultProvider;
