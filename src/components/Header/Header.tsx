import styles from './Header.module.scss';
import logo from '../../assets/logo__header.svg';
import React from 'react';
import useLocalStorage from '../../hooks/use-localStorage';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import { Link, animateScroll as scroll } from 'react-scroll';
import Navbar from '../Navbar/Navbar';

interface IProps {
  stat: boolean;
  setStat: React.Dispatch<React.SetStateAction<boolean>>;
  lang: string;
  setLanguage: (lang: string) => void;
}

const Header = ({ stat, setStat, lang, setLanguage }: IProps) => {
  //const [language, setLanguage] = useLocalStorage('language', 'en');

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

  const [scroll, setScroll] = React.useState(0);
  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header className={scroll > window.innerHeight + 5 ? styles.sticky : ''}>
      <div className={styles.container}>
        <img src={logo} alt="AIO" />
        <ul>
          <li>
            <Link to="section1" smooth={true}>
              {t('Main')}
            </Link>
          </li>
          <li>
            <Link to="section2" smooth={true} offset={-85}>
              {t('Our advantages')}
            </Link>
          </li>
          <li>
            <Link to="section3" smooth={true} offset={-85}>
              {t('Neurals')}
            </Link>
          </li>
          <li>
            <Link to="section4" smooth={true} offset={-85}>
              {t('Roadmap')}
            </Link>
          </li>
          <li>
            <Link to="section5" smooth={true} offset={-85}>
              {t('Tokenomics')}
            </Link>
          </li>
          <li>
            <Link to="section5" smooth={true} offset={-85}>
              {t('Distribution')}
            </Link>
          </li>
        </ul>
        <div className={styles.right}>
          <button
            className={styles.button}
            onClick={() => {
              toast['info'](t('In development'));
            }}
          >
            AIO-Wallet
          </button>
          <div className={styles.langs}>
            <span
              className={`${styles.lang} ${lang === 'ru' ? styles.active : ''}`}
              onClick={() => handleLenguageChange('ru')}
            >
              RU
            </span>
            <span className={styles.between}> / </span>
            <span
              className={`${styles.lang} ${lang === 'en' ? styles.active : ''}`}
              onClick={() => handleLenguageChange('en')}
            >
              EN
            </span>
          </div>
          <nav>
            <div
              className={`${styles.burgerBtn} ${stat ? styles.burgerActive : ''}`}
              onClick={() => setStat(!stat)}
            >
              <span></span>
            </div>
          </nav>
        </div>
      </div>
      <ToastContainer className={styles.toastify} theme={'dark'}></ToastContainer>
    </header>
  );
};

export default Header;
