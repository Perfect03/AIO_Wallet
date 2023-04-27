import { mnemonicToEntropy, validateMnemonic } from 'ethereum-cryptography/bip39';
import { wordlist } from 'ethereum-cryptography/bip39/wordlists/english';
import { HDKey } from 'ethereum-cryptography/hdkey';
import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { bytesToHex } from 'ethereum-cryptography/utils';
import { Wallet, stringToArray } from './getWallet';

export default function restoreWallet(_mnemonic: string): Wallet {
  if (!validateMnemonic(_mnemonic, wordlist))
    return {
      mnemonic: [],
      privateKey: '',
      address: '',
    };

  const entropy = mnemonicToEntropy(_mnemonic, wordlist);
  const hdRootKey = HDKey.fromMasterSeed(entropy);
  const privateKey = hdRootKey.deriveChild(0).privateKey;
  const publicKey = secp256k1.getPublicKey(privateKey!);
  const address = keccak256(publicKey).slice(-20);

  return {
    mnemonic: stringToArray(_mnemonic),
    privateKey: bytesToHex(privateKey!),
    address: bytesToHex(address),
  };
}
