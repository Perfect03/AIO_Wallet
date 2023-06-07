import { toReadableAmount } from '../../scripts/quoting/libs/conversion';
import { WalletTransaction } from '../useLoadTransactions';

export function formateDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const month = new Intl.DateTimeFormat('en-EN', { month: 'long' }).format(date);
  const day = date.getDate();
  const formatedDate = `${day} ${month.toLowerCase()}`;
  return formatedDate;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default function parseTransaction(tx: any, userAddress: string): WalletTransaction {
  if (tx.from.toLowerCase() === userAddress.toLowerCase())
    return {
      transactionType: 'withdraw',
      client: tx.to,
      value: toReadableAmount(tx.value, 18),
      date: formateDate(+tx.timeStamp),
      timestamp: +tx.timeStamp,
      symbol: 'BNB',
    };
  else
    return {
      transactionType: 'deposit',
      client: tx.from,
      value: toReadableAmount(tx.value, 18),
      date: formateDate(+tx.timeStamp),
      timestamp: +tx.timeStamp,
      symbol: 'BNB',
    };
}
