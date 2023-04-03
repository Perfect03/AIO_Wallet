import styles from './Main.module.scss';
import logo from '../../assets/logo__main.svg';
import logoTokenomics from '../../assets/logo__tokenomics.svg';
import arrow from '../../assets/arrow__down.svg';
import telegram from '../../assets/telegram.svg';
import twitter from '../../assets/twitter.svg';
import React from 'react';
import Card from '../Card/Card';
import { useTranslation } from 'react-i18next';
import { useScrollTo } from 'react-use-window-scroll';
import Developments from '../Developments/Developments';

const Main = () => {
  const { t } = useTranslation();
  const Scroll = useScrollTo();
  return (
    <main>
      <section id="section1" className={styles.section__one}>
        <div className={styles.ellipse}></div>
        <div className={styles.content}>
          <div className={styles.logo}>
            <div className={styles.line1}>
              <div className={styles.all}>All</div>
            </div>
            <div className={styles.line2}>
              <img src={logo} alt="AIO" />
              <div className={styles.one}>One</div>
            </div>
            <div className={styles.line3}>
              <div className={styles.in}>In</div>
            </div>
          </div>
          <div className={styles.about}>{t('Innovative crypto-project')}</div>
          <div className={styles.buttons}>
            <button className={styles.join}>{t('Join')}</button>
            <button className={styles.whitepaper}>
              <div className={styles.whitepaper__text}>Whitepaper</div>
            </button>
          </div>
        </div>
        <div className={styles.ellipse}></div>
      </section>

      <section id="section2" className={styles.section__two}>
        <div className={styles.block}>
          <h1>{t('Our advantages')}</h1>
          <div className={styles.description}>{t('All neurals')}</div>
          <div className={styles.social}>
            <button className={styles.telegram}>
              <img src={telegram} alt="tg" />
            </button>
            <button className={styles.twitter}>
              <img src={twitter} alt="tw" />
            </button>
          </div>
        </div>
      </section>

      <section id="section3" className={styles.section__three}>
        <div className={styles.block}>
          <h1>{t('Developments')}</h1>
          <Developments></Developments>
        </div>
      </section>

      <section id="section4" className={styles.section__four}>
        <div className={styles.block}>
          <h1>{t('Roadmap')}</h1>
          <Card></Card>
        </div>
      </section>

      <section id="section5" className={styles.section__five}>
        <div className={styles.block}>
          <h1>{t('Tok&Dist')}</h1>
          <div className={styles.statistics}>
            <img src={logoTokenomics} alt="AIO" />
            <ul>
              <li>
                <span>Token name: </span>
                <span className={styles.value}>AIO</span>
              </li>
              <li>
                <span>Token ticker: </span>
                <span className={styles.value}>$ AIO</span>
              </li>
              <li>
                <span>Total supply: </span>
                <span className={styles.value}>100 000 000 $ AIO</span>
              </li>
              <li>
                <span>Blockchain: </span>
                <span className={styles.value}>Binance Smart Chain (BSC)</span>
              </li>
            </ul>
            <button className={styles.join}>{t('Join')}</button>
          </div>
          <div className={styles.numbers}>
            <div className={styles.parametr}>
              <span className={styles.key}>Presale</span>
              <span className={styles.value}>55%</span>
            </div>
            <div className={styles.parametr}>
              <span className={styles.key}>Liquidity</span>
              <span className={styles.value}>25%</span>
            </div>
            <div className={styles.parametr}>
              <span className={styles.key}>Marketing</span>
              <span className={styles.value}>10%</span>
            </div>
            <div className={styles.parametr}>
              <span className={styles.key}>Team</span>
              <span className={styles.value}>10%</span>
            </div>
          </div>
        </div>
      </section>
      <img
        className={styles.arrow}
        src={arrow}
        alt=""
        onClick={() => Scroll({ top: window.innerHeight, behavior: 'smooth' })}
      />
    </main>
  );
};

export default Main;
