import styles from './Presale.module.scss';
import Header from './Header/Header';
import { useTranslation } from 'react-i18next';
import Logo from '../Logo/Logo';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import YourAssets from './YourAssets/YourAssets';
import ConnectButton from './ConnectButton';

const Presale = () => {
  const { t } = useTranslation();
  const userAddress = useSelector((state: { assets: AppState }) => state.assets.userAddress);

  return (
    <>
      <Header />
      <main>
        <div className={styles.container}>
          <div className={styles.ellipse}></div>
          <div className={styles.content}>
            <Logo></Logo>
            <div className={styles.about}>{t('Innovative crypto-project')}</div>
            {userAddress ? <YourAssets /> : <ConnectButton />}
          </div>
          <div className={styles.ellipse}></div>
        </div>
        <div className={styles.footer}></div>
      </main>
    </>
  );
};

export default Presale;
