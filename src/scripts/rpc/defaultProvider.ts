import { ethers } from 'ethers';

const url = process.env.REACT_APP_RPC_ENDPOINT;

const defaultProvider = new ethers.providers.JsonRpcProvider(url, 56);

export default defaultProvider;
