import { BigNumber, BigNumberish, ethers } from 'ethers';
import defaultProvider from '../scripts/rpc/defaultProvider';
import useLocalStorage from './useLocalStorage';
import { useEffect } from 'react';
import { AppState } from '../components/Wallet/store';
import { useSelector } from 'react-redux';
import erc20abi from '../scripts/quoting/token-lists/erc20.json';
import { toReadableAmount } from '../scripts/quoting/libs/conversion';
import getQuoteToUSD from '../scripts/quoting/getQuoteToUSD';
import getQuoteToNative from '../scripts/quoting/getQuoteToNative';
//import getNativeToUSD from '../scripts/quoting/getNativeToUSD';

export enum TransactionType {
  WITHDRAW,
  DEPOSIT,
  TOKEN_TRANSFER,
}

export interface Transaction {
  type: TransactionType | string;
  value: BigNumberish;
  usd: BigNumberish;
  date: number | string;
  client: string;
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

      defaultProvider.on('block', async (blockNumber) => {
        const blockWithTransactions = await defaultProvider.getBlockWithTransactions(blockNumber);
        const transactions = blockWithTransactions.transactions;

        for (const transaction of transactions) {
          const receipt = await transaction.wait();
          //console.log('receipt:', receipt);
          if (receipt.from === address) {
            const foramtedDate = formateDate(blockWithTransactions.timestamp);
            const readableValue = +toReadableAmount(transaction.value, 18);
            //const usdValue = await getNativeToUSD(transaction.value.toNumber());

            const tx: Transaction = {
              type: 'withdraw',
              value: readableValue,
              usd: '',
              client: receipt.to,
              date: foramtedDate,
            };

            const txsMapLatest = Object.assign([], txsMap);
            txsMapLatest.push(tx);
            setTxsMap(txsMapLatest);
            //
          } else if (receipt.to === address) {
            const formatedDate = formateDate(blockWithTransactions.timestamp);
            const readableValue = +toReadableAmount(transaction.value, 18);
            //const usdValue = await getNativeToUSD(transaction.value.toNumber());

            const tx: Transaction = {
              type: 'deposit',
              value: readableValue,
              usd: '',
              date: formatedDate,
              client: receipt.from,
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
        contract.on('Transfer', async (from, to, amount: BigNumber, event) => {
          if (from === address || to === address) {
            const tStamp = (await defaultProvider.getBlock(event.blockNumber)).timestamp;
            const formatedDate = formateDate(tStamp);
            const value = toReadableAmount(amount, asset.decimals);

            const tx: Transaction = {
              type: 'transfer',
              value: value,
              usd: '',
              date: formatedDate,
              client: address,
            };
            const txsMapLatest = Object.assign([], txsMap);
            txsMapLatest.push(tx);
            setTxsMap(txsMapLatest);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [txsMap]);

  return [txsMap];
}
