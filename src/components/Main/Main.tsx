import styles from './Main.module.scss';
import logo from '../../assets/logo__main.svg';
import arrow from '../../assets/arrow__down.svg';
import telegram from '../../assets/telegram.svg';
import twitter from '../../assets/twitter.svg'
import React from 'react';

const Main = () => {
  const Scroll = () => {
    window.scrollBy(0, window.innerHeight);
  }
  return (
  <main>
    <section className={styles.section__one}>
      <div className={styles.ellipse}></div>
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
    <div className={styles.ellipse}></div>
    </section>
    <section className={styles.section__two}>
    <div className={styles.block}>
      <h1>Наши преимущества</h1>
      <div className={styles.description}>
      Все нейросети в проекте AIO будут работать в связке друг с другом, что позволит пользователям получать полный и всесторонний набор услуг. Например, пользователь может общаться с  чат-ботом для получения советов по инвестированию и сразу же совершать необходимые операции в AIO кошельке. Таким образом, проект AIO обеспечивает пользователям удобный  и эффективный способ управления своими финансами.
      </div>
      <div className={styles.social}>
        <button className={styles.telegram}><img src={telegram} alt="tg" /></button>
        <button className={styles.twitter}><img src={twitter} alt="tw" /></button>
      </div>
    </div>
    </section>
    <img className={styles.arrow} src={arrow} alt="" onClick={Scroll}/>
  </main>
  );
};

export default Main;
