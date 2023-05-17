import axios from 'axios';
import { Interface, keccak256 } from 'ethers/lib/utils';
import TokenAbiJson from '../scripts/quoting/token-lists/erc20.json';
import { BigNumberish, utils } from 'ethers';
import { useEffect } from 'react';
import { error } from 'console';
import useLocalStorage from './useLocalStorage';
import { toReadableAmount } from '../scripts/quoting/libs/conversion';
import { useSelector } from 'react-redux';
import { AppState } from '../components/Wallet/store';
import { Asset } from '../components/Wallet/Authorised/Main/helpers/checkSavedAssets';
const apiKey = process.env.REACT_APP_BSCSCAN_APIKEY as string;
const baseUrl = process.env.REACT_APP_BSCSCAN_ENDPOINT as string;

export enum TransactionType {
  WITHDTAW,
  DFEPOSIT,
  TRANSFER,
}

export interface Transaction {
  transactionType: string | TransactionType;
  transactionHash: string;
}

export interface WalletTransaction {
  transactionType: string | TransactionType;
  client: string;
  value: BigNumberish;
  date: string | Date;
  timestamp: number;
}

function formateDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const month = new Intl.DateTimeFormat('en-EN', { month: 'long' }).format(date);
  const day = date.getDate();
  const formatedDate = `${day} ${month.toLowerCase()}`;
  return formatedDate;
}

export default async function useAddressTransactions(address: string, assets: Asset[]) {
  const [txsMap, setTxsMap] = useLocalStorage<Array<WalletTransaction>>('txsMap', []);
  // getting "Transfer" topic
  const tokenInterface = new Interface(TokenAbiJson);
  //const transferEventTopic = tokenInterface.getEventTopic('Transfer');
  const transferEventTopic = tokenInterface.encodeFilterTopics('Transfer', [
    null,
    '0xF11E7f8113E797b08CA2EEcc65d78a6a3d779c95',
  ]);
  const transferEventTopic2 = tokenInterface.encodeFilterTopics('Transfer', [
    '0xF11E7f8113E797b08CA2EEcc65d78a6a3d779c95',
    null,
  ]);

  const DELAY_BETWEEN_REQUESTS = 2000;

  const config1 = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api-testnet.bscscan.com//api',
    headers: {},
    params: {
      module: 'account',
      action: 'txlist',
      address: address,
      startblock: 0,
      endblock: 99999999,
      sort: 'asc',
      apikey: apiKey,
    },
  };

  const configs: { method: string; url: string; headers: object; params: object }[] = [];

  for (const asset of assets.slice(1)) {
    const config2 = {
      method: 'get',
      url: 'https://api-testnet.bscscan.com//api',
      headers: {},
      params: {
        module: 'logs',
        action: 'getLogs',
        fromBlock: 0,
        toBlock: 99999999,
        address: asset.address,
        topic0: transferEventTopic[0],
        topic0_1_opr: 'and',
        topic1: transferEventTopic[1],
        topic1_2_opr: 'and',
        topic2: transferEventTopic[2],
        topic0_2_opr: 'and',
        apiKey: apiKey,
      },
    };

    const config3 = {
      method: 'get',
      url: 'https://api-testnet.bscscan.com//api',
      headers: {},
      params: {
        module: 'logs',
        action: 'getLogs',
        fromBlock: 0,
        toBlock: 99999999,
        address: asset.address,
        topic0: transferEventTopic[0],
        topic0_1_opr: 'and',
        topic1: transferEventTopic[2],
        topic1_2_opr: 'and',
        topic2: transferEventTopic[1],
        topic0_2_opr: 'and',
        apiKey: apiKey,
      },
    };
    configs.push(...[config2, config3]);
  }

  try {
    useEffect(() => {
      (async () => {
        // request (default transaction)

        console.log('configs: ', configs);
        try {
          const response = await axios.request(config1);
          const data = response.data;
          console.log('config1 data:', data);
          const result = data.result;
          for (const tx of result) {
            if (tx.from.toLowerCase() === address.toLowerCase()) {
              const wtx: WalletTransaction = {
                transactionType: 'withdraw',
                client: tx.from,
                value: toReadableAmount(tx.value, 18),
                date: formateDate(+tx.timeStamp),
                timestamp: +tx.timeStamp,
              };
              const txsMapLatest = Object.assign([], txsMap);
              txsMapLatest.includes(wtx) ? txsMapLatest : txsMapLatest.push(wtx);
              setTxsMap(txsMapLatest);
            } else if (tx.to.toLowerCase() === address.toLowerCase()) {
              const wtx: WalletTransaction = {
                transactionType: 'deposit',
                client: tx.to,
                value: toReadableAmount(tx.value, 18),
                date: formateDate(+tx.timeStamp),
                timestamp: +tx.timeStamp,
              };
              const txsMapLatest = Object.assign([], txsMap);
              txsMapLatest.includes(wtx) ? txsMapLatest : txsMapLatest.push(wtx);
              setTxsMap(txsMapLatest);
            }
          }

          for (const config of configs) {
            const response = await axios.request(config);
            //await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_REQUESTS));
            const data = response.data;
            console.log('transfer config data: ', data);
            const result = data.result;

            console.log('transfer config data: ', data);
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }, []);
  } catch (error) {
    console.error(error);
  }
}
