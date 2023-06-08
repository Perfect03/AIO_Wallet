import styles from './YourAssets.module.scss';
import copy from '../../../assets/copy.svg';
import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useFetchVestingData from '../../../hooks/useFetchVestingData';
import getPresaleContract from '../../../scripts/quoting/presale/getPresaleContract';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';
import metamaskProvider from '../../../scripts/rpc/metamaskProvider';

const YourAssets = () => {
  const [locked, claimable] = useFetchVestingData();
  const { t } = useTranslation();
  const userAddress = useSelector((state: { assets: AppState }) => state.assets.userAddress);

  function handleCopyClick() {
    navigator.clipboard
      .writeText(process.env.REACT_APP_TOKEN_ADDRESS as string)
      .then(() => {
        toast['success'](t('Token address copied'));
      })
      .catch(() => {
        toast['error'](t('Something went wrong'));
      });
  }

  async function handleClaim() {
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

    if (userAddress && metamaskProvider) {
      const contract = getPresaleContract().connect(metamaskProvider.getSigner());
      console.log(contract);
      try {
        const tx = await contract['claim()']();
        await tx.wait();
        toast['success'](t('Successful claim'));
      } catch (err) {
        toast['error'](t('Nothing to claim'));
      }
    }
  }

  return (
    <div className={styles.assets}>
      <h1 className={styles.title}>{t('Your vesting data')}</h1>
      <div className={styles.claim}>
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
        <button
          className={claimable > 0 ? '' : styles.inactive}
          onClick={async () => handleClaim()}
        >
          {t('Claim')}
        </button>
      </div>
      <span className={styles.yourLink}>{t('Token address')}</span>
      <div className={styles.link}>
        <input
          className={styles.linkText}
          type="text"
          disabled
          value={process.env.REACT_APP_TOKEN_ADDRESS as string}
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
