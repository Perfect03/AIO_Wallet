import { BigNumber, BigNumberish, ethers } from 'ethers';

import useLocalStorage from './useLocalStorage';
import { useEffect } from 'react';
import { AppState } from '../components/Wallet/store';
import { useSelector } from 'react-redux';
import erc20abi from '../scripts/quoting/token-lists/erc20.json';
import { toReadableAmount } from '../scripts/quoting/libs/conversion';
import defaultProvider from '../scripts/rpc/defaultProvider';

const provider = defaultProvider;

export enum TransactionType {
  WITHDRAW,
  DEPOSIT,
  TOKEN_TRANSFER,
}

export interface Transaction {
  type: TransactionType | string;
  value: BigNumberish;
  date: number | string;
  client: string;
  assetSymbol?: string;
}

function formateDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const month = new Intl.DateTimeFormat('en-EN', { month: 'long' }).format(date);
  const day = date.getDate();
  const formatedDate = `${day} ${month.toLowerCase()}`;
  return formatedDate;
}

export default async function useAddressTransactions(address: string) {
  const [txsMap, setTxsMap] = useLocalStorage<Array<Transaction>>('txsMap', []);

  const assets = useSelector((state: { assets: AppState }) => state.assets.assets);

  useEffect(() => {
    try {
      /* EOA checking */

      provider.on('block', async (blockNumber) => {
        const blockWithTransactions = await provider.getBlockWithTransactions(blockNumber);
        const transactions = blockWithTransactions.transactions;
        for (const transaction of transactions) {
          if (transaction.from === address) {
            const foramtedDate = formateDate(blockWithTransactions.timestamp);
            const readableValue = +toReadableAmount(transaction.value, 18);

            const tx: Transaction = {
              type: 'withdraw',
              value: readableValue,
              client: transaction.to ? transaction.to : '',
              date: foramtedDate,
              assetSymbol: 'BNB',
            };

            const txsMapLatest = Object.assign([], txsMap);
            txsMapLatest.push(tx);
            setTxsMap(txsMapLatest);
          } else if (transaction.to === address) {
            const formatedDate = formateDate(blockWithTransactions.timestamp);
            const readableValue = +toReadableAmount(transaction.value, 18);

            const tx: Transaction = {
              type: 'deposit',
              value: readableValue,
              date: formatedDate,
              client: transaction.from,
            };

            const txsMapLatest = Object.assign([], txsMap);
            txsMapLatest.push(tx);
            setTxsMap(txsMapLatest);
            console.log('txsMap:', txsMap);
          }
        }
      });

      /* asset checking */

      for (const asset of assets) {
        const contractAddres = asset.address;
        const contract = new ethers.Contract(contractAddres, erc20abi, defaultProvider);
        const listener = async (
          from: string,
          to: string,
          amount: BigNumber,
          event: { blockNumber: ethers.providers.BlockTag | Promise<ethers.providers.BlockTag> }
        ) => {
          if (from === address || to === address) {
            const tStamp = (await provider.getBlock(event.blockNumber)).timestamp;
            const formatedDate = formateDate(tStamp);
            const value = toReadableAmount(amount, asset.decimals);
            const symbol = await contract.symbol();
            console.log('symbol', symbol);
            const tx: Transaction = {
              type: 'transfer',
              value: value,
              date: formatedDate,
              client: address,
              assetSymbol: symbol,
            };
            const txsMapLatest = Object.assign([], txsMap);
            txsMapLatest.push(tx);
            setTxsMap(txsMapLatest);
          }
        };
        contract.on('Transfer', listener);
      }
    } catch (error) {
      console.error(error);
    }

    return () => {
      defaultProvider.removeAllListeners();
    };
  }, [txsMap]);

  return [txsMap];
}
