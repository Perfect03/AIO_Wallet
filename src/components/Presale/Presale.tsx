import styles from './Presale.module.scss';
import Header from './Header/Header';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../Logo/Logo';
import PresaleStarted from './PresaleStarted/PresaleStarted';
import PresalePlanned from './PresalePlanned/PresalePlanned';
import useConnectWallet from '../../hooks/useConnectWallet';
import getPresaleContract from '../../scripts/quoting/presale/getPresaleContract';

const Presale = () => {
  const { t } = useTranslation();
  const [finishTime, setFinishTime] = useState<number | undefined>(undefined);
  const [[diffDays, diffH, diffM, diffS], setDiff] = useState([0, 0, 0, 0]);
  const [tick, setTick] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [timerId, setTimerID] = useState(setInterval(() => {}));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const contract = getPresaleContract();

      const presaaleStartTime = (await contract['START_TIME']()).toNumber();
      setFinishTime(presaaleStartTime * 1000);

      const referral = window.location.search.slice(5);

      // load presale start date
      // load ref

      // console.log(window.location.search);
      // refLink =
      new URLSearchParams();
    })();
  }, []);

  useConnectWallet();

  useEffect(() => {
    const diff = finishTime ? (finishTime - new Date().getTime()) / 1000 : 0;

    if (diff < 0) {
      setIsTimeout(true);
      setLoaded(true);
      return () => clearInterval(timerId);
    }

    setLoaded(true);
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
              {isTimeout && finishTime ? (
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
