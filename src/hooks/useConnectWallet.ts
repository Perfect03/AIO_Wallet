import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import metamaskProvider from '../scripts/rpc/metamaskProvider';
import { setIsWalletConnected } from '../store';

export default function useConnectWallet() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const accounts = await metamaskProvider.send('eth_accounts', []);

      if (!accounts.length) {
        dispatch(setIsWalletConnected(false));
      }
    })();
  }, []);
}
