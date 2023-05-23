import styles from './YourAssets.module.scss';
import copy from '../../../assets/copy.svg';
import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import useFetchVestingData from '../../../hooks/useFetchVestingData';
import getPresaleContract from '../../../scripts/quoting/presale/getPresaleContract';

const YourAssets = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  function handleCopyClick() {
    navigator.clipboard
      .writeText(tokenAddress)
      .then(() => {
        toast['success'](t('Copy referral link'));
      })
      .catch(() => {
        toast['error'](t('Copy referral link error'));
      });
  }

  useEffect(() => {
    (async () => {
      const contract = getPresaleContract();
      setTokenAddress(await contract['TOKEN']());
    })();
  }, []);
  const { t } = useTranslation();

  const [locked, claimable] = useFetchVestingData();

  return (
    <div className={styles.assets}>
      <h1 className={styles.title}>{t('Your vesting data')}</h1>
      <ul className={styles.info}>
        <li>
          <span>{t('Total amount locked: ')}</span>
          <span className={styles.value}>{locked} $AIO</span>
        </li>
        <li>
          <span>{t('Claimable: ')}</span>
          <span className={styles.value}>{claimable} $AIO</span>
        </li>
      </ul>
      <span className={styles.yourLink}>{t('Token address')}</span>
      <div className={styles.link}>
        <input
          className={styles.linkText}
          type="text"
          disabled
          value={tokenAddress}
          onChange={(event) => {
            event.preventDefault();
          }}
        ></input>
        <button className={styles.copy} onClick={handleCopyClick}>
          <img src={copy} alt="" />
        </button>
      </div>
    </div>
  );
};

export default YourAssets;
