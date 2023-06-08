import styles from './Swap.module.scss';
import btc from '../../../../../assets/bitcoin_small.svg';
import info from '../../../../../assets/info.svg';
import more from '../../../../../assets/more.svg';
import fromTo from '../../../../../assets/from-to.svg';
import { useTranslation } from 'react-i18next';
import useResize from '../../../../../hooks/use-resize';
import useLoadTransactions from '../../../../../hooks/useLoadTransactions';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../store';
import { useState } from 'react';
import Right from './Right/Right';
import Left from './Left/Left';

interface IAssetTemp {
  logo: string;
  name: string;
}

export default function Swap() {
  const { t } = useTranslation();
  const transactions = useSelector((state: { assets: AppState }) => state.assets.transactions);

  return (
    <div className={styles.swap}>
      <Left></Left>
      <Right></Right>
    </div>
  );
}
