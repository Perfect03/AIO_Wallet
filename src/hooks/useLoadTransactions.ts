import axios from 'axios';
import { useEffect, useState } from 'react';
import { TWallet } from '../scripts/getWallet';
import getTokenTransferUrl from './helpers/getTokenTransferUrl';
import getTransferURL from './helpers/getTransfersUrl';
import parseTokenTransaction from './helpers/parseTokenTransaction';
import parseTransaction from './helpers/parseTransaction';
import useLocalStorage from './useLocalStorage';

export interface WalletTransaction {
  transactionType: 'withdraw' | 'deposit';
  client: string;
  value: string;
  date: string;
  timestamp: number;
  symbol: string;
}

export default function useLoadTransactions(): [WalletTransaction[], boolean] {
  const [savedTransactions, setSavedTransactions] = useLocalStorage<WalletTransaction[]>(
    'transactions',
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const walletData = useLocalStorage<TWallet>('wallet', {
    pk: '',
    addr: '',
  })[0];

  const savedAssets = window.localStorage.getItem('assets');
  const parsed: string[] = JSON.parse(savedAssets ? savedAssets : '[]');

  useEffect(() => {
    const parsedTransactions: WalletTransaction[] = [];
    if (!savedTransactions.length) setIsLoading(true);
    (async () => {
      const txUrl = await getTransferURL(walletData.addr);
      try {
        const transactions = (await axios.get(txUrl)).data.result;

        for (const transaction of transactions) {
          const parsedTransaction = parseTransaction(transaction, walletData.addr);
          parsedTransactions.push(parsedTransaction);
        }
      } catch {}

      try {
        for (const asset of parsed) {
          const url = await getTokenTransferUrl(walletData.addr, asset);
          const tokenTransactions = (await axios.get(url)).data.result;
          if (tokenTransactions.length > 0) {
            for (const transaction of tokenTransactions) {
              const parsedTransaction = parseTokenTransaction(transaction, walletData.addr);
              parsedTransactions.push(await parsedTransaction);
            }
          }
        }
      } catch {}

      setSavedTransactions(parsedTransactions.sort((a, b) => b.timestamp - a.timestamp));
      setIsLoading(false);
    })();
  }, []);

  return [savedTransactions, isLoading];
}
