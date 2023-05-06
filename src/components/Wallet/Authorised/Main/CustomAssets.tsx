import styles from './MainWallet.module.scss';
import refresh from '../../../../assets/refresh.svg';
import getTokenBalance from '../../../../scripts/quoting/getTokenBalance';
import { useEffect } from 'react';

export default function CustomAssets(props: { code: string }) {
  useEffect(() => {
    (async () => {
      // await getTokenBalance();
    })();
  });

  return (
    <div className={styles.asset}>
      <div className={styles.coin}>
        <img src={''} alt="" />
      </div>
      <div className={styles.coinAbout}>
        <div className={styles.firstLine}>
          <div className={styles.currency}>Bitcoin</div>
          <div className={styles.sum}>
            <button>
              <img src={refresh} alt="" />
            </button>
            {''}
          </div>
        </div>
        <div className={styles.secondLine}>
          <span className={styles.address}>Show address</span>
          <span className={styles.usd}>{`${''}`.slice(0, 6)} USD</span>
        </div>
      </div>
    </div>
  );
}
