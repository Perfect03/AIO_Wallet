import styles from './YourAssets.module.scss';
import copy from '../../../assets/copy.svg';
import React, { useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const YourAssets = () => {
  const [refLink, setRefLink] = useState('');
  function handleCopyClick() {
    navigator.clipboard
      .writeText(refLink)
      .then(() => {
        toast['success'](t('Copy referral link'));
      })
      .catch(() => {
        toast['error'](t('Copy referral link error'));
      });
  }
  const { t } = useTranslation();

  return (
    <div className={styles.assets}>
      <h1 className={styles.title}>{t('Your Assets')}</h1>
      <ul className={styles.info}>
        <li>
          <span>You have: </span>
          <span className={styles.value}>0 $AIO</span>
        </li>
        <li>
          <span>Claimable: </span>
          <span className={styles.value}>0 $AIO</span>
        </li>
      </ul>
      <span className={styles.yourLink}>{t('Your Referral Link')}</span>
      <div className={styles.link}>
        <input
          className={styles.linkText}
          type="text"
          disabled
          value=""
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
