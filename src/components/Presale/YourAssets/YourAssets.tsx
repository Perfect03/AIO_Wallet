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
import getTokenContract from '../../../scripts/quoting/token-lists/getTokenContract';
import { Contract } from 'ethers';
import defaultProvider from '../../../scripts/rpc/defaultProvider';
import ABI from './MigrationABI.json';

const UINT256MAX = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

const YourAssets = () => {
  const [locked, claimable] = useFetchVestingData();
  const { t } = useTranslation();
  const userAddress = useSelector((state: { assets: AppState }) => state.assets.userAddress);

  function handleOldCopyClick() {
    navigator.clipboard
      .writeText(process.env.REACT_APP_TOKEN_ADDRESS as string)
      .then(() => {
        toast['success'](t('Token address copied'));
      })
      .catch(() => {
        toast['error'](t('Something went wrong'));
      });
  }

  function handleNewCopyClick() {
    navigator.clipboard
      .writeText(process.env.REACT_APP_NEW_TOKEN_ADDRESS as string)
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

  async function handleApproveClick() {
    if (metamaskProvider) {
      const token = getTokenContract(process.env.REACT_APP_TOKEN_ADDRESS as string).connect(
        metamaskProvider.getSigner()
      );

      try {
        const tx = await token['approve(address,uint256)'](
          process.env.REACT_APP_MIGRATION_CONTRACT_ADDRESS,
          UINT256MAX
        );

        await tx.wait();
        toast['success'](t('Successful approve'));
      } catch (err) {
        console.log(err);
        toast['error'](t('Error'));
      }
    }
  }

  async function handleMigrateClick() {
    const exchanger = new Contract(
      process.env.REACT_APP_MIGRATION_CONTRACT_ADDRESS as string,
      ABI,
      defaultProvider
    );

    const token = getTokenContract(process.env.REACT_APP_TOKEN_ADDRESS as string);

    try {
      if (metamaskProvider) {
        const signer = metamaskProvider.getSigner();
        const balance = await token['balanceOf(address)'](await signer.getAddress());

        if (balance.gt(0)) {
          const tx = await exchanger.connect(signer)['exchange()']();

          await tx.wait();

          toast['success'](t('Successful migration'));
        } else toast['error'](t('Insufficient balance'));
      } else throw 'Connect metamask';
    } catch (err) {
      console.log(err);
      toast['error'](t('Error'));
    }
  }

  return (
    <>
      <div className={styles.assets}>
        <h1 className={styles.title}>{t('Presale #1 vesting data')}</h1>
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
          <button className={styles.copy} onClick={handleOldCopyClick}>
            <img src={copy} alt="" />
          </button>
        </div>
      </div>
      <div className={styles.migration}>
        <h1 className={styles.title}>{t('Migrating tokens')}</h1>
        <div className={styles.buttons}>
          <button className={styles.active} onClick={async () => handleApproveClick()}>
            {t('Approve')}
          </button>
          {'→'}
          <button className={styles.active} onClick={async () => handleMigrateClick()}>
            {t('Migrate')}
          </button>
        </div>
        <span className={styles.yourLink}>{t('Token address')}</span>
        <div className={styles.link}>
          <input
            className={styles.linkText}
            type="text"
            disabled
            value={process.env.REACT_APP_NEW_TOKEN_ADDRESS as string}
            onChange={(event) => {
              event.preventDefault();
            }}
          ></input>
          <button className={styles.copy} onClick={handleNewCopyClick}>
            <img src={copy} alt="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default YourAssets;
