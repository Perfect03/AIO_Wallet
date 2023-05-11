import { useEffect, useState } from 'react';
import { Asset } from '../components/Wallet/Authorised/Main/helpers/checkSavedAssets';
import getNativeBalance from '../scripts/quoting/getNativeBalance';
import getQuoteToNative from '../scripts/quoting/getQuoteToNative';
import getNativeToUSD from '../scripts/quoting/getNativeToUSD';

export default function useTotalBalance(assets: Asset[]) {
  const [nativeBalance, setNativeBalance] = useState(0);
  const [usdBalance, setUsdBalance] = useState(0);

  useEffect(() => {
    let loaded = true;
    for (const asset of assets) {
      if (asset.balance === undefined) {
        loaded = false;
      }
    }
    if (loaded) {
      let newNativeBalance = 0;
      for (const asset of assets.slice(1)) {
        newNativeBalance += getQuoteToNative(asset);
      }

      setNativeBalance(newNativeBalance);
      setUsdBalance(getNativeToUSD(newNativeBalance));
    }
  });

  return [nativeBalance, usdBalance];
}
