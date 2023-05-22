import { useTranslation } from 'react-i18next';
import styles from './PresalePlanned/PresalePlanned.module.scss';
import { useDispatch } from 'react-redux';
import metamaskProvider from '../../scripts/rpc/metamaskProvider';
import { setIsWalletConnected } from '../../store';

export default function ConnectButton() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  async function handleConnectWallet() {
    const provider = metamaskProvider;

    await provider.send('eth_requestAccounts', []);

    dispatch(setIsWalletConnected(true));
  }
  return (
    <button className={styles.connect} onClick={async () => handleConnectWallet()}>
      {t('CONNECT WALLET')}
    </button>
  );
}
