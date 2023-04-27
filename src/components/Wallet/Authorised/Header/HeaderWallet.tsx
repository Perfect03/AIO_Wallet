import styles from './HeaderWallet.module.scss';
import logo from '../../../../assets/logo__header.svg';
import wallet from '../../../../assets/wallet.svg';
import logoLeft from '../../../../assets/logo__left.svg';
import coin from '../../../../assets/coin.svg';
import React, { useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import i18n from '../../../../i18n';
import { useTranslation } from 'react-i18next';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Context, ContextType } from '../../../../languageContext';
import { NavLink } from 'react-router-dom';

interface IHeaderWallet {
  balance: number;
  walletID: string;
}

const HeaderWallet = ({ balance, walletID }: IHeaderWallet) => {
  const { language, setLanguage } = useContext(Context) as ContextType;

  const handleLenguageChange = (lang: string) => {
    if (lang === 'ru') {
      i18n.changeLanguage('ru');
      setLanguage('ru');
    } else if (lang === 'en') {
      i18n.changeLanguage('en');
      setLanguage('en');
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <header className={styles.headerAuthorised}>
        <div className={styles.left}>
          <NavLink to="/">
            <img src={logoLeft} alt="AIO" className={styles.logo} />
          </NavLink>
          <nav>
            <div className={styles.top}>
              <NavLink to="/">
                <button className={styles.leftLink}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.02 2.83992L3.63 7.03992C2.73 7.73992 2 9.22992 2 10.3599V17.7699C2 20.0899 3.89 21.9899 6.21 21.9899H17.79C20.11 21.9899 22 20.0899 22 17.7799V10.4999C22 9.28992 21.19 7.73992 20.2 7.04992L14.02 2.71992C12.62 1.73992 10.37 1.78992 9.02 2.83992Z"
                      stroke="url(#paint0_linear_422_1)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 17.99V14.99"
                      stroke="url(#paint1_linear_422_1)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_422_1"
                        x1="2"
                        y1="12.0036"
                        x2="22"
                        y2="12.0036"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
                        <stop
                          className={styles.stop2}
                          offset="1"
                          stopColor="rgba(122, 123, 124, 1)"
                        />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_422_1"
                        x1="12"
                        y1="16.49"
                        x2="13"
                        y2="16.49"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
                        <stop
                          className={styles.stop2}
                          offset="1"
                          stopColor="rgba(122, 123, 124, 1)"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </button>
              </NavLink>
              <NavLink to="/">
                <button className={styles.leftLink}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.7516 16.8604V18.8904C10.7516 20.6104 9.15158 22.0004 7.18158 22.0004C5.21158 22.0004 3.60156 20.6104 3.60156 18.8904V16.8604C3.60156 18.5804 5.20158 19.8004 7.18158 19.8004C9.15158 19.8004 10.7516 18.5704 10.7516 16.8604Z"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.7501 14.11C10.7501 14.61 10.6101 15.07 10.3701 15.47C9.78006 16.44 8.57004 17.05 7.17004 17.05C5.77004 17.05 4.56003 16.43 3.97003 15.47C3.73003 15.07 3.59009 14.61 3.59009 14.11C3.59009 13.25 3.99007 12.48 4.63007 11.92C5.28007 11.35 6.17003 11.01 7.16003 11.01C8.15003 11.01 9.04006 11.36 9.69006 11.92C10.3501 12.47 10.7501 13.25 10.7501 14.11Z"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.7516 14.11V16.86C10.7516 18.58 9.15158 19.8 7.18158 19.8C5.21158 19.8 3.60156 18.57 3.60156 16.86V14.11C3.60156 12.39 5.20158 11 7.18158 11C8.17158 11 9.06161 11.35 9.71161 11.91C10.3516 12.47 10.7516 13.25 10.7516 14.11Z"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 10.9699V13.03C22 13.58 21.56 14.0299 21 14.0499H19.0399C17.9599 14.0499 16.97 13.2599 16.88 12.1799C16.82 11.5499 17.0599 10.9599 17.4799 10.5499C17.8499 10.1699 18.36 9.94995 18.92 9.94995H21C21.56 9.96995 22 10.4199 22 10.9699Z"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 10.5V8.5C2 5.78 3.64 3.88 6.19 3.56C6.45 3.52 6.72 3.5 7 3.5H16C16.26 3.5 16.51 3.50999 16.75 3.54999C19.33 3.84999 21 5.76 21 8.5V9.95001H18.92C18.36 9.95001 17.85 10.17 17.48 10.55C17.06 10.96 16.82 11.55 16.88 12.18C16.97 13.26 17.96 14.05 19.04 14.05H21V15.5C21 18.5 19 20.5 16 20.5H13.5"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_422_3"
                        x1="2"
                        y1="12.0036"
                        x2="22"
                        y2="12.0036"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
                        <stop
                          className={styles.stop2}
                          offset="1"
                          stopColor="rgba(122, 123, 124, 1)"
                        />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_422_1"
                        x1="12"
                        y1="16.49"
                        x2="13"
                        y2="16.49"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
                        <stop
                          className={styles.stop2}
                          offset="1"
                          stopColor="rgba(122, 123, 124, 1)"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </button>
              </NavLink>
              <NavLink to="/">
                <button className={styles.leftLink}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.28 8.45001L19 4.72998L15.28 1.01001"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 4.72998H19"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.71997 11.55L1 15.2701L4.71997 18.9901"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 15.27H1"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_422_3"
                        x1="2"
                        y1="12.0036"
                        x2="22"
                        y2="12.0036"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
                        <stop
                          className={styles.stop2}
                          offset="1"
                          stopColor="rgba(122, 123, 124, 1)"
                        />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_422_1"
                        x1="12"
                        y1="16.49"
                        x2="13"
                        y2="16.49"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
                        <stop
                          className={styles.stop2}
                          offset="1"
                          stopColor="rgba(122, 123, 124, 1)"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </button>
              </NavLink>
              <NavLink to="/">
                <button className={styles.leftLink}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.7514 7.04997C17.5114 7.00997 17.2614 6.99998 17.0014 6.99998H7.00141C6.72141 6.99998 6.45141 7.01998 6.19141 7.05998C6.33141 6.77998 6.53141 6.52001 6.77141 6.28001L10.0214 3.02C11.3914 1.66 13.6114 1.66 14.9814 3.02L16.7314 4.78996C17.3714 5.41996 17.7114 6.21997 17.7514 7.04997Z"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 19C9 19.75 8.79 20.46 8.42 21.06C7.73 22.22 6.46 23 5 23C3.54 23 2.27 22.22 1.58 21.06C1.21 20.46 1 19.75 1 19C1 16.79 2.79 15 5 15C7.21 15 9 16.79 9 19Z"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.49172 18.9795H3.51172"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 17.5195V20.5095"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 12V17C22 20 20 22 17 22H7.63C7.94 21.74 8.21 21.42 8.42 21.06C8.79 20.46 9 19.75 9 19C9 16.79 7.21 15 5 15C3.8 15 2.73 15.53 2 16.36V12C2 9.28 3.64 7.38 6.19 7.06C6.45 7.02 6.72 7 7 7H17C17.26 7 17.51 7.00999 17.75 7.04999C20.33 7.34999 22 9.26 22 12Z"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 12.5H19C17.9 12.5 17 13.4 17 14.5C17 15.6 17.9 16.5 19 16.5H22"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_422_3"
                        x1="2"
                        y1="12.0036"
                        x2="22"
                        y2="12.0036"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
                        <stop
                          className={styles.stop2}
                          offset="1"
                          stopColor="rgba(122, 123, 124, 1)"
                        />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_422_1"
                        x1="12"
                        y1="16.49"
                        x2="13"
                        y2="16.49"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
                        <stop
                          className={styles.stop2}
                          offset="1"
                          stopColor="rgba(122, 123, 124, 1)"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </button>
              </NavLink>
              <NavLink to="/">
                <button className={styles.leftLink}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 6.25V8.25"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 12V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H12"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 6.25V8.25"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 16V18"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 16V18"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 7.25H18"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12H22"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.56 20.33C21 21.3 19.95 21.95 18.75 21.95C16.96 21.95 15.86 20.15 15.86 20.15M15.93 17.09C16.49 16.11 17.54 15.46 18.75 15.46C20.92 15.46 22 17.26 22 17.26M22 15.25V17.25H20M17.86 20.14H15.86V22"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_422_3"
                        x1="2"
                        y1="12.0036"
                        x2="22"
                        y2="12.0036"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
                        <stop
                          className={styles.stop2}
                          offset="1"
                          stopColor="rgba(122, 123, 124, 1)"
                        />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_422_1"
                        x1="12"
                        y1="16.49"
                        x2="13"
                        y2="16.49"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
                        <stop
                          className={styles.stop2}
                          offset="1"
                          stopColor="rgba(122, 123, 124, 1)"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </button>
              </NavLink>
            </div>
            <div className={styles.bottom}>
              <NavLink to="/">
                <button className={styles.leftLink}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_422_3"
                        x1="2"
                        y1="12.0036"
                        x2="22"
                        y2="12.0036"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
                        <stop
                          className={styles.stop2}
                          offset="1"
                          stopColor="rgba(122, 123, 124, 1)"
                        />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_422_1"
                        x1="12"
                        y1="16.49"
                        x2="13"
                        y2="16.49"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
                        <stop
                          className={styles.stop2}
                          offset="1"
                          stopColor="rgba(122, 123, 124, 1)"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </button>
              </NavLink>
              <NavLink to="/">
                <button className={styles.leftLink}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 12H3.62"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
                      stroke="#7A7B7C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_422_3"
                        x1="2"
                        y1="12.0036"
                        x2="22"
                        y2="12.0036"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
                        <stop
                          className={styles.stop2}
                          offset="1"
                          stopColor="rgba(122, 123, 124, 1)"
                        />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_422_1"
                        x1="12"
                        y1="16.49"
                        x2="13"
                        y2="16.49"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
                        <stop
                          className={styles.stop2}
                          offset="1"
                          stopColor="rgba(122, 123, 124, 1)"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </button>
              </NavLink>
            </div>
          </nav>
        </div>
        <div className={styles.headerContainer}>
          <div className={styles.left}>
            <div className={styles.coin}>
              <img src={coin} alt="AIO" />
            </div>
            <div className={styles.balance}>$ {`${balance}`.slice(0, 6)}</div>
          </div>
          <div className={styles.right}>
            <div className={styles.langs}>
              <span
                className={`${styles.lang} ${language === 'ru' ? styles.active : ''}`}
                onClick={() => handleLenguageChange('ru')}
              >
                RU
              </span>
              <span> / </span>
              <span
                className={`${styles.lang} ${language === 'en' ? styles.active : ''}`}
                onClick={() => handleLenguageChange('en')}
              >
                EN
              </span>
            </div>
            <div className={styles.wallet}>
              <img src={wallet} alt="AIO" className={styles.logo} />
              <span className={styles.id}>
                {walletID.slice(0, 6)}…{walletID.slice(-4)}
              </span>
            </div>
          </div>
        </div>
      </header>
      <ToastContainer className={styles.toastify} theme={'dark'}></ToastContainer>
    </>
  );
};

export default HeaderWallet;
