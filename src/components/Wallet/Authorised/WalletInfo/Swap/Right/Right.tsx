import styles from './Right.module.scss';
import info from '../../../../../../assets/info.svg';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Chart from './Chart/Chart';

export default function Right() {
  const { t } = useTranslation();

  const percents = [0.1, 0.5, 1.0];
  const [slippage, setSlippage] = useState(0);
  const [slippageInputValue, setSlippageInputValue] = useState('');

  const [speed, setSpeed] = useState(2);

  function onSlippageInputChange(target: EventTarget & HTMLInputElement) {
    console.log(target.value);
    //const regex = /[0-100]|\./;
    if (Number(target.value) >= 0 && Number(target.value) <= 100 && target.value.length < 5) {
      console.log(3);
      setSlippageInputValue(target.value);
      setSlippage(Number(target.value));
    }
  }

  return (
    <div className={styles.right}>
      <div className={styles.coming}>
        <Chart></Chart>
        <div className={styles.text}>{t('Coming Soon')}</div>
      </div>
      <h1 className={styles.title}>{t('Settings')}</h1>
      <div className={styles.subtitle}>
        <div className={styles.text}>{t('Slippage Tolerance')}</div>
        <div className={styles.info} data-title="123456789">
          <img src={info} alt="info" />
        </div>
      </div>
      <div className={styles.slippagePercents}>
        {percents.slice(0, 3).map((el) => (
          <div
            className={`${styles.percent} ${slippage == el ? styles.active : styles.inActive}`}
            key={el}
            onClick={() => setSlippage(el)}
          >
            <div className={styles.text}>{el}%</div>
          </div>
        ))}
        <div className={`${styles.percent} ${styles.inActive}`}>
          <div className={styles.text}>
            <input
              type="text"
              value={slippageInputValue}
              onChange={(e) => onSlippageInputChange(e.target)}
            />
            %
          </div>
        </div>
      </div>
      <div className={styles.subtitle}>
        <div className={styles.text}>{t('Transaction Speed (GWEI)')}</div>
        <div className={styles.info} data-title="456789">
          <img src={info} alt="info" />
        </div>
      </div>
      <div className={styles.speeds}>
        <div
          className={`${styles.speed} ${speed == 2 && styles.active}`}
          onClick={() => {
            setSpeed(2);
          }}
        >
          {t('Default')}
        </div>
        <div
          className={`${styles.speed} ${speed == 3 && styles.active}`}
          onClick={() => {
            setSpeed(3);
          }}
        >
          {t('Standart')} (3)
        </div>
        <div
          className={`${styles.speed} ${speed == 4 && styles.active}`}
          onClick={() => {
            setSpeed(4);
          }}
        >
          {t('Fast')} (4)
        </div>
        <div
          className={`${styles.speed} ${speed == 5 && styles.active}`}
          onClick={() => {
            setSpeed(5);
          }}
        >
          {t('Instant')} (5)
        </div>
      </div>
    </div>
  );
}
