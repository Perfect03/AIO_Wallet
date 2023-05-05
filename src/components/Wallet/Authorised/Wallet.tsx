import styles from './Wallet.module.scss';
import HeaderWallet from './Header/HeaderWallet';
import MainWallet from './Main/MainWallet';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IWallet } from '../../../interfaces/interfaces';
import { toast } from 'react-toastify';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Context, ContextType } from '../../../languageContext';
import getLatestQuotes from '../../../scripts/getLatestQuotes';
import { getIdMap } from '../../../scripts/cryptocurrencyMap';
import convert from '../../../scripts/convert';
import getTokenBalance from '../../../scripts/getTokenBalance';
import defaultProvider from '../../../scripts/rpc/defaultProvider';

const Wallet = () => {
  const { t } = useTranslation();
  const { language } = useContext(Context) as ContextType;
  const balance = 0.007765463463544;
  const walletID = '0xe2562749506238901826374956789234592544232';
  const btc = 0.3412433123432532;
  const user: IWallet = {
    balance: balance,
    walletID: walletID,
    btc: btc,
  };

  return (
    <>
      <HeaderWallet />
      <MainWallet />
    </>
  );
};

export default Wallet;
