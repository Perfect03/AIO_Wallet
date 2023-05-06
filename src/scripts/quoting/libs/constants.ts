// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { SupportedChainId, Token } from '@uniswap/sdk-core';

// Addresses

export const POOL_FACTORY_CONTRACT_ADDRESS = '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865';
export const QUOTER_CONTRACT_ADDRESS = '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997';

// Currencies and Tokens

export const WBNB_TOKEN = new Token(
  SupportedChainId.BNB,
  '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  18,
  'WBNB',
  'Wrapped BNB'
);

export const BUSD_TOKEN = new Token(
  SupportedChainId.BNB,
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  18,
  'BUSD',
  'Binance-Peg BUSD'
);
