import { ChainId, Token } from '@pancakeswap/sdk';

export const POOL_FACTORY_CONTRACT_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984'; // 0x1F98431c8aD98523631AE4a59f267346ea31F984 0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865
export const QUOTER_CONTRACT_ADDRESS = '0x61fFE014bA17989E743c5F6cB21bF9697530B21e'; //  0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997

export const WBNB = new Token(
  ChainId.BSC,
  '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  18,
  'WBNB'
);

export const BUSD = new Token(
  ChainId.BSC,
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  18,
  'BUSD'
);

export const V3_SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';
