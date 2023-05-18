import { toReadableAmount } from '../../scripts/quoting/libs/conversion';
import getTokenContract from '../../scripts/quoting/token-lists/getTokenContract';
import { WalletTransaction } from '../useLoadTransactions';
import { formateDate } from './parseTransaction';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default async function parseTokenTransaction(
  tx: any,
  userAddress: string
): Promise<WalletTransaction> {
  const parsedTopicFrom = '0x' + tx.topics[1].slice(26);
  const parsedTopicTo = '0x' + tx.topics[2].slice(26);

  const tokenAddress = getTokenContract(tx.address);

  if (parsedTopicFrom.toLowerCase() === userAddress.toLowerCase())
    return {
      transactionType: 'withdraw',
      client: parsedTopicTo,
      value: toReadableAmount(tx.data, await tokenAddress.decimals()),
      date: formateDate(+tx.timeStamp),
      timestamp: +tx.timeStamp,
      symbol: await tokenAddress.symbol(),
    };
  else
    return {
      transactionType: 'deposit',
      client: parsedTopicFrom,
      value: toReadableAmount(tx.data, await tokenAddress.decimals()),
      date: formateDate(+tx.timeStamp),
      timestamp: +tx.timeStamp,
      symbol: await tokenAddress.symbol(),
    };
}
