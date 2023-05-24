import styles from './Header.module.scss';
import logo from '../../../assets/logo__header.svg';
import { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';
import { Context, ContextType } from '../../../languageContext';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, setUserAddress } from '../../../store';
import metamaskProvider from '../../../scripts/rpc/metamaskProvider';
import useConnectWallet from '../../../hooks/useConnectWallet';

const HeaderWallet = () => {
  const { language, setLanguage } = useContext(Context) as ContextType;

  const dispatch = useDispatch();

  const userAddress = useSelector((state: { assets: AppState }) => state.assets.userAddress);

  const handleLenguageChange = (lang: string) => {
    if (lang === 'ru') {
      i18n.changeLanguage('ru');
      setLanguage('ru');
    } else if (lang === 'en') {
      i18n.changeLanguage('en');
      setLanguage('en');
    }
  };

  useConnectWallet();

  async function handleConnectWallet() {
    const address = (await metamaskProvider?.send('eth_requestAccounts', []))[0];

    dispatch(setUserAddress(address));

    await window.ethereum?.request!({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x38',
          rpcUrls: ['https://bscrpc.com'],
          chainName: 'BSC',
          nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
          },
          blockExplorerUrls: ['https://bscscan.com'],
        },
      ],
    });
  }

  const { t } = useTranslation();

  return (
    <>
      <header className={styles.header}>
        <NavLink to="/">
          <img src={logo} alt="AIO" className={styles.logo} />
        </NavLink>
        <div className={styles.right}>
          <div className={styles.button} onClick={async () => handleConnectWallet()}>
            {userAddress
              ? `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`
              : t('Connect wallet')}
          </div>
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
        </div>
      </header>
      <ToastContainer className={styles.toastify} theme={'dark'}></ToastContainer>
    </>
  );
};

export default HeaderWallet;
