import styles from './Wallet.module.scss';
import HeaderWallet from './Header/HeaderWallet';
import MainWallet from './Main/MainWallet';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { IWallet } from '../../../interfaces/interfaces';
import { Context, ContextType } from '../../../languageContext';

const Wallet = () => {
  return (
    <>
      <HeaderWallet />
      <MainWallet />
    </>
  );
};

export default Wallet;
