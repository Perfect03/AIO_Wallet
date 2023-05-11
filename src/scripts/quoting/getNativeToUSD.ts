import { BUSD, WBNB } from './libs/constants';
import quoteV2 from './libs/quoteV2';

export default function getNativeToUSD(amount: number) {
  let quote = 0;

  quoteV2({
    in: WBNB,
    out: BUSD,
  }).then((res) => (quote = amount * res));

  return quote;
}
