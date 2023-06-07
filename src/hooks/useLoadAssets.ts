import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import checkSavedAssets from '../components/Wallet/Authorised/Main/helpers/checkSavedAssets';
import { isLoadingReducer, loadAssets, store, updateAssetBalance } from '../store';
import { TWallet } from '../scripts/getWallet';
import getNativeBalance from '../scripts/quoting/getNativeBalance';
import getTokenBalance from '../scripts/quoting/getTokenBalance';
import useLocalStorage from './useLocalStorage';

export default function useLoadAssets() {
  const dispatch = useDispatch();

  const walletData = useLocalStorage<TWallet>('wallet', {
    pk: '',
    addr: '',
  })[0];

  useEffect(() => {
    const savedAssets = window.localStorage.getItem('assets');
    const parsed: string[] = JSON.parse(savedAssets ? savedAssets : '[]');
    if (parsed.length) dispatch(isLoadingReducer(true));

    (async () => {
      const userAssets = await checkSavedAssets(parsed ? parsed : []);
      dispatch(isLoadingReducer(false));
      dispatch(loadAssets(userAssets));

      for (const storedAsset of store.getState().assets.assets) {
        let assetBalance;
        if (storedAsset.symbol === 'BNB') assetBalance = await getNativeBalance(walletData.addr);
        else assetBalance = await getTokenBalance(storedAsset, walletData.addr);
        dispatch(updateAssetBalance({ address: storedAsset.address, balance: assetBalance }));
      }
    })();
  }, []);
}
