import { useTranslation } from 'react-i18next';
import styles from './PresalePlanned/PresalePlanned.module.scss';
import { useDispatch } from 'react-redux';
import metamaskProvider from '../../scripts/rpc/metamaskProvider';
import { setUserAddress } from '../../store';

export default function ConnectButton() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  async function handleConnectWallet() {
    const provider = metamaskProvider;

    const address = (await provider.send('eth_requestAccounts', []))[0];

    dispatch(setUserAddress(address));
  }
  return (
    <button className={styles.connect} onClick={async () => handleConnectWallet()}>
      {t('Connect wallet')}
    </button>
  );
}
