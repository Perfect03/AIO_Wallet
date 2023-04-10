import styles from './Header.module.scss';
import logo from '../../assets/logo__header.svg';
import React from 'react';
import useLocalStorage from '../../hooks/use-localStorage';
import i18n from '../../i18n';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../Navbar/Navbar';

interface IProps {
  stat: boolean;
  setStat: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ stat, setStat }: IProps) => {
  const [language, setLanguage] = useLocalStorage('language', 'en');
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
            <a href="#section1">{t('Main')}</a>
          </li>
          <li>
            <a href="#section2">{t('Our advantages')}</a>
          </li>
          <li>
            <a href="#section3">{t('Neurals')}</a>
          </li>
          <li>
            <a href="#section4">{t('Roadmap')}</a>
          </li>
          <li>
            <a href="#section5">{t('Tokenomics')}</a>
          </li>
          <li>
            <a href="#section5">{t('Distribution')}</a>
          </li>
        </ul>
        <div className={styles.right}>
          <button className={styles.button}>AIO-Wallet</button>
          <div className={styles.langs}>
            <span
              className={`${styles.lang} ${language === 'ru' ? styles.active : ''}`}
              onClick={() => handleLenguageChange('ru')}
            >
              RU
            </span>
            <span className={styles.between}> / </span>
            <span
              className={`${styles.lang} ${language === 'en' ? styles.active : ''}`}
              onClick={() => handleLenguageChange('en')}
            >
              EN
            </span>
          </div>
          <nav>
            <div className={styles.burgerBtn} onClick={() => setStat(!stat)}>
              <span></span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
