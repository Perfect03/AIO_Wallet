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
import Navbar from '../Navbar/Navbar';
import useLocalStorage from '../../hooks/use-localStorage';
interface IProps {
  stat: boolean,
  setStat: React.Dispatch<React.SetStateAction<boolean>>
}

const Main = ({stat, setStat}: IProps) => {
  const { t } = useTranslation();
  const Scroll = useScrollTo();
  const [language, setLanguage] = useLocalStorage('language', 'en');
  return (
    <main onClick={() => {setStat(false)}}>
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
            <button className={styles.telegram} onClick={(event) => {event.preventDefault(); language === 'ru' ? window.open('https://t.me/AIO_OFFICIAL_CIS') : window.open('https://t.me/AIO_OFFICIAL_EN');}}>
              <img src={telegram} alt="tg" />
            </button>
            <button className={styles.twitter} onClick={(event) => {event.preventDefault(); window.open("https://twitter.com/AIO_ECOSYSTEM");}}>
              <img src={twitter} alt="tw" />
            </button>
          </div>
        </div>
      </section>

      <section id="section3" className={styles.section__three}>
        <div className={styles.block}>
          <h1>{t('Developments')}</h1>
          <Developments></Developments>
          <div className={styles.developments}>
            <div className={styles.developmentWrapper}>
              <div className={styles.development}>
                <div className={styles.content}>
                  <div className={styles.describe}>
                    <h1>AIO-Chat</h1>
                    <div className={styles.about}>{t('AIO-Chat')}</div>
                  </div>
                  <button className={styles.to}>AIO-Chat</button>
                </div>
                <div className={styles.ellipse}></div>
              </div>
            </div>
            <div className={styles.developmentWrapper}>
              <div className={styles.development}>
                <div className={styles.content}>
                  <div className={styles.describe}>
                    <h1>AIO-Wallet</h1>
                    <div className={styles.about}>{t('AIO-Wallet')}</div>
                  </div>
                  <button className={styles.to}>AIO-Wallet</button>
                </div>
                <div className={styles.ellipse}></div>
              </div>
            </div>
            <div className={styles.developmentWrapper}>
              <div className={styles.development}>
                <div className={styles.content}>
                  <div className={styles.describe}>
                    <h1>AIO-Invest</h1>
                    <div className={styles.about}>{t('AIO-Invest')}</div>
                  </div>
                  <button className={styles.to}>AIO-Invest</button>
                </div>
                <div className={styles.ellipse}></div>
              </div>
            </div>
            <div className={styles.developmentWrapper}>
              <div className={styles.development}>
                <div className={styles.content}>
                  <div className={styles.describe}>
                    <h1>AIO-Trade</h1>
                    <div className={styles.about}>{t('AIO-Trade')}</div>
                  </div>
                  <button className={styles.to}>AIO-Trade</button>
                </div>
                <div className={styles.ellipse}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="section4" className={styles.section__four}>
        <div className={styles.block}>
          <h1>{t('Roadmap')}</h1>
          <Card></Card>
          <div className={styles.items}>
            <div className={styles.item}>
              <div className={styles.title}>{t('Phase')} I</div>
              <ul className={styles.list}>
                <li>{t('Phase1_1')}</li>
                <li>{t('Phase1_2')}</li>
                <li>{t('Phase1_3')}</li>
                <li>{t('Phase1_4')}</li>
                <li>{t('Phase1_5')}</li>
                <li>{t('Phase1_6')}</li>
                <li>{t('Phase1_7')}</li>
                <li>{t('Phase1_8')}</li>
              </ul>
            </div>
            <div className={styles.item}>
              <div className={styles.title}>{t('Phase')} II</div>
              <ul className={styles.list}>
                <li>{t('Phase2_1')}</li>
                <li>{t('Phase2_2')}</li>
                <li>{t('Phase2_3')}</li>
                <li>{t('Phase2_4')}</li>
                <li>{t('Phase2_5')}</li>
                <li>{t('Phase2_6')}</li>
                <li>{t('Phase2_7')}</li>
              </ul>
            </div>
            <div className={styles.item}>
              <div className={styles.title}>{t('Phase')} III</div>
              <ul className={styles.list}>
                <li>{t('Phase3_1')}</li>
                <li>{t('Phase3_2')}</li>
                <li>{t('Phase3_3')}</li>
                <li>{t('Phase3_4')}</li>
              </ul>
            </div>
            <div className={styles.item}>
              <div className={styles.title}>{t('Phase')} IV</div>
              <ul className={styles.list}>
                <li>{t('Phase4_1')}</li>
                <li>{t('Phase4_2')}</li>
                <li>{t('Phase4_3')}</li>
                <li>{t('Phase4_4')}</li>
                <li>{t('Phase4_5')}</li>
              </ul>
            </div>
            <div className={styles.item}>
              <div className={styles.title}>{t('Phase')} V</div>
              <ul className={styles.list}>
                <li>{t('Phase5_1')}</li>
                <li>{t('Phase5_2')}</li>
                <li>{t('Phase5_3')}</li>
                <li>{t('Phase5_4')}</li>
                <li>{t('Phase5_5')}</li>
                <li>{t('Phase5_6')}</li>
                <li>{t('Phase5_7')}</li>
                <li>{t('Phase5_8')}</li>
              </ul>
            </div>
          </div>
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
     <Navbar status={stat} setStatus={setStat}></Navbar>
    </main>
  );
};

export default Main;
