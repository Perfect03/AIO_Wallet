import { useState } from 'react';
import styles from './Share.module.scss';

export default function Share() {
  const percents = [25, 50, 75, 100];
  const [percent, setPercent] = useState(0);

  return (
    <div className={styles.percents}>
      {percents.map((el) => (
        <div
          className={`${styles.percent} ${percent == el ? styles.active : styles.inActive}`}
          key={el}
          onClick={() => {
            setPercent(el);
          }}
        >
          <div className={styles.text}>{el < 100 ? `${el}%` : 'Max'}</div>
        </div>
      ))}
    </div>
  );
}
