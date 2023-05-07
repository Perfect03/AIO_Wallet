import { useEffect, useState } from 'react';
import { Asset } from '../components/Wallet/Authorised/Main/helpers/checkSavedAssets';
import getQuoteToNative from '../scripts/quoting/getQuoteToNative';
import getQuoteToUSD from '../scripts/quoting/getQuoteToUSD';

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
      console.log('asd');
      (async () => {
        let newNativeBalance = 0;
        for (const asset of assets.slice(1)) {
          if (asset.balance !== 0) newNativeBalance += await getQuoteToNative(asset);
        }
        setNativeBalance(newNativeBalance);

        const newUsdBalance = await getQuoteToUSD(newNativeBalance + assets[0].balance!);
        setUsdBalance(newUsdBalance);
      })();
    }
  });

  return [nativeBalance, usdBalance];
}
