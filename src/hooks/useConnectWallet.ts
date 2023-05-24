import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import metamaskProvider from '../scripts/rpc/metamaskProvider';
import { setUserAddress } from '../store';

export default function useConnectWallet() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let account = (await metamaskProvider.send('eth_accounts', []))[0];

      if (!account) {
        account = (await metamaskProvider.send('eth_requestAccounts', []))[0];
      }

      window.ethereum?.request!({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x38',
            rpcUrls: ['https://bscrpc.com'],
            chainName: 'BSC',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'BNB',
              decimals: 18,
            },
            blockExplorerUrls: ['https://bscscan.com'],
          },
        ],
      });

      dispatch(setUserAddress(account));
    })();
  }, []);
}
