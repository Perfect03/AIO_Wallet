import styles from './Main.module.scss';
import zealy from '../../../assets/partners/zealy.png';
import pinkSale from '../../../assets/partners/pinkSale.png';
import linke from '../../../assets/partners/linke.png';
import galxe from '../../../assets/partners/galxe.png';
import DEXView from '../../../assets/partners/DEXView.png';
import logoTokenomics from '../../../assets/logo__tokenomics.svg';
import arrow from '../../../assets/arrow__down.svg';
import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Card from '../Card/Card';
import { useTranslation } from 'react-i18next';
import Developments from '../Developments/Developments';
import Navbar from '../Navbar/Navbar';

import { toast } from 'react-toastify';
import { Link, animateScroll as scroll } from 'react-scroll';
import Tokenomics from '../Tokenomics/Tokenomics';
import { Context, ContextType } from '../../../languageContext';
import Logo from '../../Logo/Logo';

interface IProps {
  stat: boolean;
  setStat: React.Dispatch<React.SetStateAction<boolean>>;
}

const Main = ({ stat, setStat }: IProps) => {
  const { t } = useTranslation();
  const { language } = useContext(Context) as ContextType;
  return (
    <main
      onClick={() => {
        setStat(false);
      }}
    >
      <section id="section1" className={styles.section__one}>
        <div className={styles.ellipse}></div>
        <div className={styles.content}>
          <Logo></Logo>
          <div className={styles.about}>{t('Innovative crypto-project')}</div>
          <div className={styles.buttons}>
            <div
              className={styles.presale}
              onClick={(event) => {
                event.preventDefault();
                window.open(
                  'https://www.pinksale.finance/launchpad/0xb88E663A55381CD29b10bA82E2574Fccdc2C7a01?chain=BSC'
                );
              }}
            >
              Presale
            </div>
            {/* <button
              className={styles.join}
              onClick={(event) => {
                event.preventDefault();
                window.open(`https://t.me/AIO_OFFICIAL_${language === 'ru' ? 'CIS' : 'EN'}`);
              }}
            >
              <div className={styles.whitepaper__text}>{t('Join')}</div>
            </button> */}
            <button
              className={styles.whitepaper}
              onClick={(event) => {
                event.preventDefault();
                window.open(`https://${language === 'ru' ? 'cis' : 'en'}.aio-docs.xyz/`);
              }}
            >
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
            <button
              className={styles.telegram}
              onClick={(event) => {
                event.preventDefault();
                window.open(`https://t.me/AIO_OFFICIAL_${language === 'ru' ? 'CIS' : 'EN'}`);
              }}
            >
              <svg
                width="27"
                height="22"
                viewBox="0 0 27 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.29176 9.29865C9.28825 6.25039 13.9537 4.2408 16.288 3.26986C22.9531 0.497636 24.338 0.0160711 25.2407 0.000169546C25.4392 -0.00332783 25.8832 0.0458755 26.1707 0.279201C26.4135 0.476217 26.4803 0.742358 26.5123 0.92915C26.5443 1.11594 26.5841 1.54146 26.5524 1.87395C26.1912 5.66891 24.6284 14.8783 23.8333 19.1287C23.4969 20.9272 22.8345 21.5303 22.1932 21.5893C20.7994 21.7175 19.7411 20.6682 18.3912 19.7833C16.2789 18.3987 15.0856 17.5367 13.0352 16.1856C10.6657 14.6241 12.2017 13.7659 13.5521 12.3633C13.9055 11.9962 20.0463 6.4107 20.1652 5.90401C20.18 5.84064 20.1938 5.60442 20.0535 5.47969C19.9132 5.35496 19.7061 5.39762 19.5566 5.43154C19.3447 5.47962 15.9703 7.71 9.43326 12.1227C8.47543 12.7804 7.60787 13.1009 6.83055 13.0841C5.97363 13.0656 4.32525 12.5995 3.09985 12.2012C1.59685 11.7127 0.402295 11.4543 0.506314 10.6246C0.560494 10.1924 1.15564 9.75044 2.29176 9.29865Z"
                  fill="black"
                />
              </svg>
            </button>
            <button
              className={styles.twitter}
              onClick={(event) => {
                event.preventDefault();

                window.open('https://twitter.com/AIO_ECOSYSTEM');
              }}
            >
              <svg
                width="27"
                height="26"
                viewBox="0 0 27 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_136_24)">
                  <path
                    d="M8.67934 23.5625C18.4882 23.5625 23.8548 15.434 23.8548 8.38708C23.8548 8.15856 23.8497 7.92497 23.8396 7.69645C24.8835 6.94148 25.7845 6.00634 26.5 4.93497C25.5277 5.36754 24.4954 5.65006 23.4384 5.77286C24.5514 5.10571 25.3847 4.05766 25.784 2.82298C24.7369 3.4435 23.5919 3.88122 22.3979 4.11739C21.5934 3.26259 20.5297 2.6966 19.3713 2.50695C18.2129 2.3173 17.0243 2.51453 15.9892 3.06817C14.9541 3.6218 14.1303 4.50099 13.645 5.56982C13.1597 6.63864 13.04 7.83756 13.3045 8.98122C11.1844 8.87483 9.11026 8.32407 7.21665 7.36467C5.32303 6.40526 3.65217 5.05862 2.31238 3.41204C1.63143 4.58607 1.42306 5.97534 1.72962 7.29749C2.03617 8.61964 2.83465 9.77546 3.96277 10.53C3.11585 10.5032 2.28747 10.2751 1.54609 9.86481V9.93083C1.54534 11.1629 1.97127 12.3572 2.7515 13.3107C3.53173 14.2643 4.6181 14.9182 5.82594 15.1613C5.04139 15.3759 4.21798 15.4072 3.41941 15.2527C3.76024 16.3123 4.42337 17.239 5.31625 17.9036C6.20913 18.5681 7.28721 18.9374 8.40004 18.9597C6.51079 20.4438 4.17702 21.2487 1.77461 21.2449C1.34856 21.2442 0.922932 21.2181 0.5 21.1667C2.94059 22.7325 5.77966 23.5641 8.67934 23.5625Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_136_24">
                    <rect width="26" height="26" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
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
                  <button
                    className={styles.to}
                    onClick={(event) => {
                      event.preventDefault();
                      language == 'ru'
                        ? window.open('https://t.me/AIO_OFFICIAL_CIS')
                        : window.open('https://t.me/AIO_OFFICIAL_EN');
                    }}
                  >
                    AIO-Chat
                  </button>
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
                  <NavLink className={styles.to} to="AIO-Wallet">
                    AIO-Wallet
                  </NavLink>
                </div>
                <div className={styles.ellipse}></div>
              </div>
            </div>
            <div className={styles.developmentWrapper}>
              <div className={styles.development}>
                <div className={styles.content}>
                  <div className={styles.describe}>
                    <h1>AIO-Swap</h1>
                    <div className={styles.about}>{t('AIO-Swap')}</div>
                  </div>
                  <button
                    className={styles.to}
                    onClick={() => {
                      toast['info'](t('In development'));
                    }}
                  >
                    AIO-Swap
                  </button>
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
                  <button
                    className={styles.to}
                    onClick={() => {
                      toast['info'](t('In development'));
                    }}
                  >
                    AIO-Invest
                  </button>
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
                  <button
                    className={styles.to}
                    onClick={() => {
                      toast['info'](t('In development'));
                    }}
                  >
                    AIO-Trade
                  </button>
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
              </ul>
            </div>
            <div className={styles.item}>
              <div className={styles.title}>{t('Phase')} III</div>
              <ul className={styles.list}>
                <li>{t('Phase3_1')}</li>
                <li>{t('Phase3_2')}</li>
                <li>{t('Phase3_3')}</li>
                <li>{t('Phase3_4')}</li>
                <li>{t('Phase3_5')}</li>
              </ul>
            </div>
            <div className={styles.item}>
              <div className={styles.title}>{t('Phase')} IV</div>
              <ul className={styles.list}>
                <li>{t('Phase4_1')}</li>
                <li>{t('Phase4_2')}</li>
                <li>{t('Phase4_3')}</li>
                <li>{t('Phase4_4')}</li>
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
        <h1>{t('Tok&Dist')}</h1>
        <div className={styles.block}>
          <div className={styles.statistics}>
            <img src={logoTokenomics} alt="AIO" />
            <ul>
              <li>
                <span>Token name: </span>
                <span className={styles.value}>AIO</span>
              </li>
              <li>
                <span>Token ticker: </span>
                <span className={styles.value}>$AIO</span>
              </li>
              <li>
                <span>Total supply: </span>
                <span className={styles.value}>100 000 000 $AIO</span>
              </li>
              <li>
                <span>Blockchain: </span>
                <span className={styles.value}>Binance Smart Chain (BSC)</span>
              </li>
            </ul>
            <button
              className={styles.join}
              onClick={(event) => {
                event.preventDefault();
                window.open(`https://t.me/AIO_OFFICIAL_${language === 'ru' ? 'CIS' : 'EN'}`);
              }}
            >
              {t('Join')}
            </button>
          </div>
          <div className={styles.diagram}>
            <Tokenomics></Tokenomics>
          </div>
        </div>
      </section>
      <section id="section6" className={styles.section__six}>
        <h1>{t('Partners')}</h1>
        <div className={styles.block}>
          <img
            className={styles.partner}
            onClick={(event) => {
              event.preventDefault();
              window.open('https://zealy.io/c/aio/');
            }}
            src={zealy}
            alt="Zealy"
          />
          <img
            className={styles.partner}
            onClick={(event) => {
              event.preventDefault();
              window.open(
                'https://www.pinksale.finance/launchpad/0xb88E663A55381CD29b10bA82E2574Fccdc2C7a01?chain=BSC'
              );
            }}
            src={pinkSale}
            alt="PinkSale"
          />
          <img
            className={styles.partner}
            onClick={(event) => {
              event.preventDefault();
              window.open('https://galxe.com/aioecosystem/campaigns');
            }}
            src={galxe}
            alt="Galxe"
          />
          <img
            className={styles.partner}
            onClick={(event) => {
              event.preventDefault();
              window.open('https://link3.to/aio_ecosystem');
            }}
            src={linke}
            alt="Linke"
          />
          <img
            className={styles.partner}
            onClick={(event) => {
              event.preventDefault();
              window.open('https://www.dexview.com/bsc/0xe5fA0495966B124DD55B390794683bd5CffF4EFA');
            }}
            src={DEXView}
            alt="DEXView"
          />
        </div>
      </section>
      <Link to="section2" smooth={true}>
        <img className={styles.arrow} src={arrow} alt="" />
      </Link>
      <Navbar status={stat} setStatus={setStat}></Navbar>
    </main>
  );
};

export default Main;
