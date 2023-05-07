import { Asset } from '../../components/Wallet/Authorised/Main/helpers/checkSavedAssets';
import { toReadableAmount } from './libs/conversion';
import getTokenContract from './token-lists/getTokenContract';

async function getTokenBalance(token: Asset, userAddress: string) {
  const tokenContract = getTokenContract(token.address);
  const bal = await tokenContract.balanceOf(userAddress);

  return +toReadableAmount(bal, token.decimals);
}

export default getTokenBalance;
