import styles from './MainSwap.module.scss';
import Right from './Right/Right';
import Left from './Left/Left';

export default function MainSwap() {
  return (
    <main className={styles.mainWalletAuthorised}>
      <div className={styles.container}>
        <div className={styles.swap}>
          <Left></Left>
          <Right></Right>
        </div>
      </div>
    </main>
  );
}
