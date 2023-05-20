import styles from './PresalePlanned.module.scss';
import copy from '../../../assets/copy.svg';
import { useTranslation } from 'react-i18next';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Context, ContextType } from '../../../languageContext';
import { toast } from 'react-toastify';

interface ITime {
  diffDays: number;
  diffH: number;
  diffM: number;
  diffS: number;
}

const PresalePlanned = ({ diffDays, diffH, diffM, diffS }: ITime) => {
  const { t } = useTranslation();

  function handleCopyClick() {
    // navigator.clipboard
    //   .writeText(mnemonic)
    //   .then(() => {
    //     toast['success'](t('Copy seed'));
    //   })
    //   .catch(() => {
    //     toast['error'](t('Copy seed error'));
    //   });
  }

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
          <span>Token name: </span>
          <span className={styles.value}>$AIO</span>
        </li>
        <li>
          <span>Presale Supply: </span>
          <span className={styles.value}>12.000.000 $AIO</span>
        </li>
        <li>
          <span>Presale Price: </span>
          <span className={styles.value}>0.0000125 $BNB = 1 $AIO</span>
        </li>
      </ul>
      <button className={styles.connect}>{t('CONNECT WALLET')}</button>
      <span className={styles.yourLink}>{t('Your Referral Link')}</span>
      <div className={styles.link}>
        <input
          className={styles.linkText}
          type="text"
          onChange={(event) => {
            event.preventDefault();
          }}
        ></input>
        <button className={styles.copy} onClick={handleCopyClick}>
          <img src={copy} alt="" />
        </button>
      </div>
    </>
  );
};

export default PresalePlanned;
