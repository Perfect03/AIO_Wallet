import logo from '../../assets/logo__main.svg';
import logoTokenomics from '../../assets/logo__tokenomics.svg';
import arrow from '../../assets/arrow__down.svg';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import React, { useEffect } from 'react';
import Card from '../Home/Card/Card';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Link, animateScroll as scroll } from 'react-scroll';

interface IProps {
  stat: boolean;
  setStat: React.Dispatch<React.SetStateAction<boolean>>;
  lang: string;
}

const Wallet = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default Wallet;
