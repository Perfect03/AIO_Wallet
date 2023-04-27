import styles from './Wallet.module.scss';
import HeaderWallet from './Header/HeaderWallet';
import MainWallet from './Main/MainWallet';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  _generateMnemonic,
  _getHdRootKey,
  _generatePrivateKey,
  _getPublicKey,
  _getEthAddress,
  _store,
  main,
} from '../../../generateseed';
import { IWallet } from '../../../interfaces/interfaces';

import { toast } from 'react-toastify';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Context, ContextType } from '../../../languageContext';

const Wallet = () => {
  const { t } = useTranslation();
  const { language } = useContext(Context) as ContextType;
  const words = [
    '1addle',
    '2addle',
    '3addle',
    '4addle',
    '5addle',
    '6addle',
    '7addle',
    '8addle',
    '9addle',
    '10addle',
    '11addle',
    '12addle',
  ];
  const balance = 0.007765463463544;
  const walletID = '0xe2562749506238901826374956789234592544232';
  const btc = 0.3412433123432532431241232132;
  const user: IWallet = {
    balance: balance,
    walletID: walletID,
    btc: btc,
  };
  // main()
  //   .then(() => process.exit(0))
  //   .catch((error) => {
  //     console.error(error);
  //     process.exit(1);
  //   });
  //console.log(word);
  return (
    <>
      <HeaderWallet balance={balance} walletID={walletID}></HeaderWallet>
      <MainWallet user={user}></MainWallet>
    </>
  );
};

export default Wallet;
