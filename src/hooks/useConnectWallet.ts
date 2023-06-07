import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import metamaskProvider from '../scripts/rpc/metamaskProvider';
import { setUserAddress } from '../store';

export default function useConnectWallet() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const account = (await metamaskProvider?.send('eth_accounts', []))[0];

      dispatch(setUserAddress(account));
    })();
  }, []);
}
