import styles from './Swap.module.scss';
import { useTranslation } from 'react-i18next';
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
