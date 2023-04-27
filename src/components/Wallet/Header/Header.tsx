import styles from './Header.module.scss';
import logo from '../../../assets/logo__header.svg';
import React, { useContext } from 'react';
import useLocalStorage from '../../../hooks/use-localStorage';
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Context, ContextType } from '../../../languageContext';
import { NavLink } from 'react-router-dom';

const HeaderWallet = () => {
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
    <header className={styles.header}>
      <NavLink to="/">
        <img src={logo} alt="AIO" className={styles.logo} />
      </NavLink>
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
    </header>
  );
};

export default HeaderWallet;
