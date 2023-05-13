import { BUSD, WBNB } from './libs/constants';
import quoteV2 from './libs/quoteV2';

export default async function getNativeToUSD(amount: number) {
  const price = await quoteV2({
    in: WBNB,
    out: BUSD,
  });

  return price * amount;
}
