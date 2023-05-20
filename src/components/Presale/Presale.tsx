import styles from './Presale.module.scss';
import Header from './Header/Header';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useLocalStorage from '../../hooks/useLocalStorage';
import { TWallet } from '../../scripts/getWallet';
import { Wallet as typeWallet } from 'ethers';
import Logo from '../Logo/Logo';
import PresaleStarted from './PresaleStarted/PresaleStarted';
import PresalePlanned from './PresalePlanned/PresalePlanned';

const Presale = () => {
  const { t } = useTranslation();
  const presDate = new Date('Wed, 23 May 2023 00:00:00');
  const [finishTime] = useState(presDate.getTime());
  const [[diffDays, diffH, diffM, diffS], setDiff] = useState([0, 0, 0, 0]);
  const [tick, setTick] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [timerId, setTimerID] = useState(setInterval(() => {}));

  useEffect(() => {
    const diff = (finishTime - new Date().getTime()) / 1000;
    if (diff < 0) {
      setIsTimeout(true);
      return;
    }
    setDiff([
      Math.floor(diff / 86400), // дни
      Math.floor((diff / 3600) % 24),
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

  return (
    <>
      <Header />
      <main>
        <div className={styles.container}>
          <div className={styles.ellipse}></div>
          <div className={styles.content}>
            <Logo></Logo>
            <div className={styles.about}>{t('Innovative crypto-project')}</div>
            <div className={styles.presale}>
              {isTimeout ? (
                <PresaleStarted></PresaleStarted>
              ) : (
                <PresalePlanned
                  diffDays={diffDays}
                  diffH={diffH}
                  diffM={diffM}
                  diffS={diffS}
                ></PresalePlanned>
              )}
            </div>
          </div>
          <div className={styles.ellipse}></div>
        </div>
      </main>
    </>
  );
};

export default Presale;
