import styles from './PresaleStarted.module.scss';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';
import RefLink from '../RefLink';
import ConnectButton from '../ConnectButton';
import { ChangeEvent, useEffect, useState } from 'react';
import getPresaleContract from '../../../scripts/quoting/presale/getPresaleContract';
import { BigNumber, ethers } from 'ethers';
import { fromReadableAmount } from '../../../scripts/quoting/libs/conversion';
import metamaskProvider from '../../../scripts/rpc/metamaskProvider';

const PresaleStarted = () => {
  const [nativeValue, setNativeValue] = useState<number>();
  const [aioValue, setAioValue] = useState(0);
  const [supplyLeft, setSupplyLeft] = useState<number>();
  const [refAddress, setRefAddress] = useState('');
  const [finishTime, setFinishTime] = useState<number | undefined>(undefined);
  const [[diffH, diffM, diffS], setDiff] = useState([0, 0, 0]);
  const [tick, setTick] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [timerId, setTimerID] = useState(setInterval(() => {}));
  const { t } = useTranslation();

  const isWalletConnected = useSelector(
    (state: { assets: AppState }) => state.assets.isWaleltConnected
  );

  useEffect(() => {
    (async () => {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop: string) => searchParams.get(prop),
      });

      setRefAddress(params.ref);

      const contract = getPresaleContract();

      const endTime = await contract.END_TIME();
      setFinishTime(endTime * 1000);
      const supplyLeft = (await contract.amountLeft()).div(10 ** 9).toNumber() as number;
      console.log(supplyLeft);
      setSupplyLeft(supplyLeft);
    })();
  }, []);

  useEffect(() => {
    const diff = finishTime ? (finishTime - new Date().getTime()) / 1000 : 0;

    if (diff < 0) {
      setIsTimeout(true);
      return;
    }

    setDiff([
      Math.floor((diff / 3600) % 24), // часы
      Math.floor((diff / 60) % 60),
      Math.floor(diff % 60),
    ]);
  }, [tick, finishTime]);

  useEffect(() => {
    if (isTimeout) clearInterval(timerId);
  }, [isTimeout, timerId]);

  useEffect(() => {
    const timerID = setInterval(() => {
      setTick(!tick);
    }, 1000);
    setTimerID(timerID);
    return () => clearInterval(timerID);
  }, [tick]);

  function handleSumInput(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (+e.target.value > 0) {
      setNativeValue(+e.target.value);
      setAioValue(+(+e.target.value / 0.0000125).toFixed(8));
    } else if (+e.target.value === 0) {
      setNativeValue(undefined);
      setAioValue(0);
    } else {
      setNativeValue(0);
      setAioValue(0);
    }
  }

  async function handleBuyClick() {
    if (isWalletConnected) {
      const contract = getPresaleContract().connect(metamaskProvider.getSigner());

      if (nativeValue !== undefined && nativeValue > 0) {
        if (ethers.utils.isAddress(refAddress)) {
          try {
            await contract['buy(address)'](refAddress, {
              value: fromReadableAmount(nativeValue, 18),
            });
            toast['success'](t('Successful purchase'));
          } catch (err) {
            console.log(err);
            toast['error'](t('Something went wrong'));
          }
        } else {
          try {
            await contract['buy()']({ value: fromReadableAmount(nativeValue, 18) });
            toast['success'](t('Successful purchase'));
          } catch {
            toast['error'](t('Something went wrong'));
          }
        }
      }
    }
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
          {!isTimeout && (
            <>
              <span>Time to the end: </span>
              <span className={styles.value}>{`${diffH.toString().padStart(2, '0')}:${diffM
                .toString()
                .padStart(2, '0')}:${diffS.toString().padStart(2, '0')}`}</span>
            </>
          )}
        </li>
      </ul>
      <div className={styles.sum}>
        <div className={styles.strip}>
          <div
            className={styles.thereIs}
            style={{ width: `${supplyLeft ? (1 - supplyLeft / 12000000) * 100 : 0}%` }}
          ></div>
        </div>
        <div className={styles.numbers}>
          <span>0</span>
          <span>150</span>
        </div>
      </div>
      {isWalletConnected ? (
        <>
          <RefLink styles={styles} />
          <span className={styles.amountTitle}>{t('Amount $BNB')}</span>
          <div className={styles.amount}>
            <input
              className={styles.amountSum}
              type="number"
              placeholder="0.00..."
              value={nativeValue}
              onChange={handleSumInput}
            ></input>
            <button
              className={styles.buy}
              onClick={async () => await handleBuyClick()}
            >{`Buy ${aioValue} AIO`}</button>
          </div>
        </>
      ) : (
        <ConnectButton />
      )}
    </>
  );
};

export default PresaleStarted;
