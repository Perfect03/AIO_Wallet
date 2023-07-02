import styles from './Right.module.scss';
import info from '../../../../../../assets/info.svg';
import cross from '../../../../../../assets/cross.svg';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Chart from './Chart/Chart';
import isEthereumAddress from '../../../Main/helpers/isEthereumAddress';
import useLocalStorage from '../../../../../../hooks/useLocalStorage';
import { TWallet } from '../../../../../../scripts/getWallet';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, setRecipient, setSlippage } from '../../../../../../store';

export default function Right() {
  const { t } = useTranslation();

  const walletInfo = useLocalStorage<TWallet>('wallet', {
    pk: '',
    addr: '',
  })[0];

  const percents = [10, 50, 100];
  const [slippageInputValue, setSlippageInputValue] = useState('');
  const [receiverAddress, setReceiverAddress] = useState(walletInfo.addr);
  const [defaultAddress, setDefaultAddress] = useState(true);
  const slippage = useSelector((state: { assets: AppState }) => state.assets.swapSlippage);
  const recipient = useSelector((state: { assets: AppState }) => state.assets.swapRecipient);

  const dispatch = useDispatch();

  function onSlippageInputChange(target: EventTarget & HTMLInputElement) {
    if (Number(target.value) >= 0 && Number(target.value) <= 50 && target.value.length < 5) {
      setSlippageInputValue(target.value);
      dispatch(setSlippage(+target.value * 100));
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
            onClick={() => dispatch(setSlippage(el))}
          >
            <div className={styles.text}>{el / 100}%</div>
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
        <div className={styles.text}>{t('Receiver')}</div>
        <div className={styles.info} data-title="456789">
          <img src={info} alt="info" />
        </div>
      </div>
      <div className={styles.receiver}>
        <input
          className={`${styles.receiverInput} ${defaultAddress && styles.default}`}
          value={recipient}
          onChange={(e) => {
            dispatch(setRecipient(e.target.value));
            setDefaultAddress(false);
          }}
          onMouseOut={() => {
            setTimeout(() => {
              setDefaultAddress(true);
            }, 3800);
          }}
          onMouseMove={() => {
            setDefaultAddress(false);
          }}
        />
        {!defaultAddress && (
          <span
            className={styles.cross}
            onClick={() => {
              dispatch(setRecipient(''));
              setDefaultAddress(false);
            }}
          >
            <img src={cross} alt="" />
          </span>
        )}
      </div>
    </div>
  );
}
