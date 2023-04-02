import styles from './Main.module.scss';
import logo from '../../assets/logo__main.svg';
import React from 'react';

const Main = () => {
  return (
  <main>
    <div className={styles.content}>
      <div className={styles.logo}>
        <div className={styles.line1}>
          <div className={styles.all}>
            All
          </div>
        </div>
        <div className={styles.line2}>
        <img src={logo} alt="AIO" />
        <div className={styles.one}>
            One
          </div>
        </div>
        <div className={styles.line3}>
          <div className={styles.in}>
            In
          </div>
        </div>
      </div>
      <div className={styles.about}>
      Инновационный крипто-проект, представляющий из себя экосистему, которая объединяет в себе сразу несколько нейросетей
      </div>
      <div className={styles.buttons}>
        <button className={styles.join}>Присоединиться</button>
        <button className={styles.whitepaper}><div className={styles.whitepaper__text}>
        Whitepaper</div></button>
      </div>
    </div>
  </main>
  );
};

export default Main;
