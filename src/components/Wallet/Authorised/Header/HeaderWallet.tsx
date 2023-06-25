import styles from './HeaderWallet.module.scss';
import wallet from '../../../../assets/wallet.svg';
import logoLeft from '../../../../assets/logo__left.svg';
import coin from '../../../../assets/coin.svg';
import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import i18n from '../../../../i18n';
import { useTranslation } from 'react-i18next';
import { Context, ContextType } from '../../../../languageContext';
import { NavLink } from 'react-router-dom';
import HomeIcon from './icons/HomeIcon';
import TransactIcon from './icons/TransactIcon';
import SwapIcon from './icons/SwapIcon';
import InvestIcon from './icons/InvestIcon';
import TradesIcon from './icons/TradesIcon';
import SettingsIcon from './icons/SettingsIcon';
import ExitIcon from './icons/ExitIcon';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { TWallet } from '../../../../scripts/getWallet';
import getTokenBalance from '../../../../scripts/quoting/getTokenBalance';
import getTokenContract from '../../../../scripts/quoting/token-lists/getTokenContract';
import getQuoteToNative from '../../../../scripts/quoting/getQuoteToNative';
import { store } from '../../../../store';
import getTokenPrice from '../../../../scripts/quoting/getTokenPrice';

const HeaderWallet = () => {
  const [price, setPrice] = useState<number | undefined>();
  const { language, setLanguage } = useContext(Context) as ContextType;

  const walletInfo = useLocalStorage<TWallet>('wallet', {
    pk: '',
    addr: '',
  })[0];

  const handleLanguageChange = (lang: string) => {
    if (lang === 'ru') {
      i18n.changeLanguage('ru');
      setLanguage('ru');
    } else if (lang === 'en') {
      i18n.changeLanguage('en');
      setLanguage('en');
    }
  };
  const [burgerStatus, setBurgerStatus] = useState(false);

  function handleCopyClick() {
    navigator.clipboard
      .writeText(walletInfo.addr)
      .then(() => {
        toast['info'](t('Copy address'));
      })
      .catch((err) => {
        toast['error'](t('Copy address error'));
      });
  }

  useEffect(() => {
    (async () => {
      try {
        const newPrice = await getTokenPrice(store.getState().assets.assets[0]);
        console.log(newPrice);
        setPrice(newPrice ? newPrice : undefined);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <header className={styles.headerAuthorised}>
        <div className={styles.left}>
          <NavLink to="/">
            <img src={logoLeft} alt="AIO" className={styles.logo} />
          </NavLink>
          <div className={styles.burger}>
            <div
              className={`${styles.burgerBtn} ${burgerStatus ? styles.burgerActive : ''}`}
              onClick={() => setBurgerStatus(!burgerStatus)}
            >
              <span></span>
            </div>
          </div>
          <nav className={burgerStatus ? styles.active : ''}>
            <div className={styles.top}>
              <div className={styles.langs}>
                <span
                  className={`${styles.lang} ${language === 'ru' ? styles.active : ''}`}
                  onClick={() => handleLanguageChange('ru')}
                >
                  RU
                </span>
                <span> / </span>
                <span
                  className={`${styles.lang} ${language === 'en' ? styles.active : ''}`}
                  onClick={() => handleLanguageChange('en')}
                >
                  EN
                </span>
              </div>
              <HomeIcon />
              <TransactIcon />
              <SwapIcon />
              <InvestIcon />
              <TradesIcon />
            </div>
            <div className={styles.bottom}>
              <ExitIcon />
            </div>
          </nav>
        </div>
        <div className={styles.headerContainer}>
          <div className={styles.left}>
            <div className={styles.coin}>
              <img src={coin} alt="AIO" />
            </div>
            <div className={styles.balance}>$ {price} </div>
          </div>
          <div className={styles.right}>
            <div className={styles.langs}>
              <span
                className={`${styles.lang} ${language === 'ru' ? styles.active : ''}`}
                onClick={() => handleLanguageChange('ru')}
              >
                RU
              </span>
              <span className={styles.between}> / </span>
              <span
                className={`${styles.lang} ${language === 'en' ? styles.active : ''}`}
                onClick={() => handleLanguageChange('en')}
              >
                EN
              </span>
            </div>
            <div className={styles.wallet}>
              <img src={wallet} alt="AIO" className={styles.logo} />
              <span title={t('Copy') as string} className={styles.id} onClick={handleCopyClick}>
                {walletInfo.addr.slice(0, 6)}…{walletInfo.addr.slice(-4)}
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
