import { Wallet } from 'ethers';

export type TWallet = {
  pk: string;
  addr: string;
};

export function getWallet(): Wallet {
  return Wallet.createRandom();
}
