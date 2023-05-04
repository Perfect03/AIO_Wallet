import { Wallet } from 'ethers';

export default function restoreWallet(_mnemonic: string): Wallet {
  return Wallet.fromMnemonic(_mnemonic);
}
