import { BUSD_TOKEN, WBNB_TOKEN } from './libs/constants';
import { quote } from './libs/quote';

export default async function getQuoteToUSD(amount: number) {
  return await quote({
    amountIn: amount,
    in: WBNB_TOKEN,
    out: BUSD_TOKEN,
  });
}
