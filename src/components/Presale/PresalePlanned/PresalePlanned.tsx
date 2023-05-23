import styles from './PresalePlanned.module.scss';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store';
import RefLink from '../RefLink';
import ConnectButton from '../ConnectButton';

interface ITime {
  diffDays: number;
  diffH: number;
  diffM: number;
  diffS: number;
}

const PresalePlanned = ({ diffDays, diffH, diffM, diffS }: ITime) => {
  const { t } = useTranslation();
  const isWalletConnected = useSelector(
    (state: { assets: AppState }) => state.assets.isWaleltConnected
  );

  return (
    <>
      <h1 className={styles.title}>{t('Presale Starts In:')}</h1>
      <div className={styles.time}>
        <div className={styles.timeOne}>
          <div className={styles.count}>{diffDays}</div>
          <div className={styles.measure}>{t('DAYS')}</div>
        </div>
        <div className={styles.timeOne}>
          <div className={styles.count}>{diffH.toString().padStart(2, '0')}</div>
          <div className={styles.measure}>{t('HOURS')}</div>
        </div>
        <div className={styles.timeOne}>
          <div className={styles.count}>{diffM.toString().padStart(2, '0')}</div>
          <div className={styles.measure}>{t('MINS')}</div>
        </div>
        <div className={styles.timeOne}>
          <div className={styles.count}>{diffS.toString().padStart(2, '0')}</div>
          <div className={styles.measure}>{t('SEC')}</div>
        </div>
      </div>
      <ul className={styles.info}>
        <li>
          <span>{t('Token name: ')}</span>
          <span className={styles.value}>$AIO</span>
        </li>
        <li>
          <span>{t('Presale supply: ')}</span>
          <span className={styles.value}>12.000.000 $AIO</span>
        </li>
        <li>
          <span>{t('Presale price: ')}</span>
          <span className={styles.value}>0.0000125 $BNB = 1 $AIO</span>
        </li>
      </ul>
      {!isWalletConnected ? <ConnectButton /> : <RefLink styles={styles} />}
    </>
  );
};

export default PresalePlanned;
