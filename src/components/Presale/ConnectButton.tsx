import { useTranslation } from 'react-i18next';
import styles from './PresalePlanned/PresalePlanned.module.scss';
import { useDispatch } from 'react-redux';
import metamaskProvider from '../../scripts/rpc/metamaskProvider';
import { setUserAddress } from '../../store';

export default function ConnectButton() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  async function handleConnectWallet() {
    const address = (await metamaskProvider?.send('eth_requestAccounts', []))[0];

    dispatch(setUserAddress(address));

    await window.ethereum?.request!({
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
  }
  return (
    <button className={styles.connect} onClick={async () => handleConnectWallet()}>
      {t('Connect wallet')}
    </button>
  );
}
