import styles from './PresaleStarted.module.scss';
import copy from '../../../assets/copy.svg';
import { useTranslation } from 'react-i18next';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Context, ContextType } from '../../../languageContext';
import { toast } from 'react-toastify';

const PresaleStarted = () => {
  const { t } = useTranslation();

  const sum = 99;

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
      <h1 className={styles.title}>{t('Presale Information')}</h1>
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
        <li>
          <span>End Time: </span>
          <span className={styles.value}>00:00:00</span>
        </li>
      </ul>
      <div className={styles.sum}>
        <div className={styles.strip}>
          <div className={styles.thereIs} style={{ width: `${(sum / 3) * 2}%` }}></div>
        </div>
        <div className={styles.numbers}>
          <span>0</span>
          <span>150</span>
        </div>
      </div>
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
      <span className={styles.amountTitle}>{t('Amount %BNB')}</span>
      <div className={styles.amount}>
        <input
          className={styles.amountSum}
          type="text"
          placeholder="0.00..."
          onChange={(event) => {
            event.preventDefault();
          }}
        ></input>
        <button className={styles.buy} onClick={handleCopyClick}>
          {t('BUY')}
        </button>
      </div>
      <button className={styles.connect}>{t('CONNECT WALLET')}</button>
    </>
  );
};

export default PresaleStarted;
