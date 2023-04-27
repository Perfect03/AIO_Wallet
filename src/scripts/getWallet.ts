import { generateMnemonic, mnemonicToEntropy } from 'ethereum-cryptography/bip39';
import { wordlist } from 'ethereum-cryptography/bip39/wordlists/english';
import { HDKey } from 'ethereum-cryptography/hdkey';
import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { bytesToHex } from 'ethereum-cryptography/utils';

export type Wallet = {
  mnemonic: string[];
  privateKey: string;
  address: string;
};

function _generateMnemonic() {
  const strength = 128; // 256 bits, 24 words; default is 128 bits, 12 words
  const mnemonic = generateMnemonic(wordlist, strength);
  const entropy = mnemonicToEntropy(mnemonic, wordlist);
  return { mnemonic, entropy };
}

function _getHdRootKey(_mnemonic: Uint8Array) {
  return HDKey.fromMasterSeed(_mnemonic);
}

function _generatePrivateKey(_hdRootKey: HDKey) {
  const priv = _hdRootKey.deriveChild(0).privateKey;
  if (priv) return priv;
  throw 'NOT VALID PRIVATE KEY';
}

function _getPublicKey(_privateKey: Uint8Array) {
  return secp256k1.getPublicKey(_privateKey);
}

function _getEthAddress(_publicKey: Uint8Array) {
  return keccak256(_publicKey).slice(-20);
}

export function stringToArray(str: string) {
  return str.split(' ');
}

export function getWallet(): Wallet {
  const { mnemonic, entropy } = _generateMnemonic();

  const hdRootKey = _getHdRootKey(entropy);

  const privateKey = _generatePrivateKey(hdRootKey);

  const publicKey = _getPublicKey(privateKey);

  const address = _getEthAddress(publicKey);

  return {
    mnemonic: stringToArray(mnemonic),
    privateKey: bytesToHex(privateKey),
    address: '0x' + bytesToHex(address),
  };
}
