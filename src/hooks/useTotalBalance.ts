import { useEffect, useState } from 'react';
import { Asset } from '../components/Wallet/Authorised/Main/helpers/checkSavedAssets';
import getQuoteToNative from '../scripts/quoting/getQuoteToNative';
import getNativeToUSD from '../scripts/quoting/getNativeToUSD';

export default function useTotalBalance(assets: Asset[]) {
  const [nativeBalance, setNativeBalance] = useState(0);
  const [usdBalance, setUsdBalance] = useState(0);
  const [balanceLoaded, setBalanceLoaded] = useState(false);

  useEffect(() => {
    let loaded = true;
    for (const asset of assets) {
      if (asset.balance === undefined) {
        loaded = false;
      }
    }
    if (loaded) {
      (async () => {
        let newNativeBalance = assets[0].balance!;
        for (const asset of assets.slice(1)) {
          newNativeBalance += await getQuoteToNative(asset);
        }

        setNativeBalance(newNativeBalance);
        setUsdBalance(+(await getNativeToUSD(newNativeBalance)).toFixed(4));
        setBalanceLoaded(true);
      })();
    }
  });

  return [nativeBalance, usdBalance, balanceLoaded];
}
