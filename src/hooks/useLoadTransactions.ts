import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TWallet } from '../scripts/getWallet';
import getTokenTransferUrl from './helpers/getTokenTransferUrl';
import getTransferURL from './helpers/getTransfersUrl';
import parseTokenTransaction from './helpers/parseTokenTransaction';
import parseTransaction from './helpers/parseTransaction';
import useLocalStorage from './useLocalStorage';
import { setTransactions } from '../store';

export interface WalletTransaction {
  transactionType: 'withdraw' | 'deposit';
  client: string;
  value: string;
  date: string;
  timestamp: number;
  symbol: string;
}

export default function useLoadTransactions(): boolean {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const walletData = useLocalStorage<TWallet>('wallet', {
    pk: '',
    addr: '',
  })[0];

  const savedAssets = window.localStorage.getItem('assets');
  const parsed: string[] = JSON.parse(savedAssets ? savedAssets : '[]');

  useEffect(() => {
    const parsedTransactions: WalletTransaction[] = [];
    (async () => {
      const txUrl = await getTransferURL(walletData.addr);
      try {
        const transactions = (await axios.get(txUrl)).data.result;

        for (const transaction of transactions) {
          if (transaction.functionName === '') {
            const parsedTransaction = parseTransaction(transaction, walletData.addr);
            parsedTransactions.push(parsedTransaction);
          }
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

      dispatch(setTransactions(parsedTransactions.sort((a, b) => b.timestamp - a.timestamp)));
      setIsLoading(false);
    })();
  }, []);

  return isLoading;
}
