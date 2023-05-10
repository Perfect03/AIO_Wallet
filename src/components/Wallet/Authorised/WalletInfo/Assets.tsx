import styles from './WalletInfo.module.scss';
import refresh from '../../../../assets/refresh.svg';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import checkSavedAssets, { Asset } from '../Main/helpers/checkSavedAssets';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { TWallet } from '../../../../scripts/getWallet';
import AddCustomModal from '../Main/Modals/AddCustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, updateAssetBalance, isLoadingReducer } from '../../store';
import { loadAssets } from '../../store';
import getTokenBalance from '../../../../scripts/quoting/getTokenBalance';
import { store } from '../../store';
import getNativeBalance from '../../../../scripts/quoting/getNativeBalance';

export default function Assets() {
  const [assetsModalIsOpen, setAssetsModalIsOpen] = React.useState(false);
  // здесь создать стейт для отслеживания загрузки токенов, наверное true по дефолту
  const dispatch = useDispatch();
  const assets = useSelector((state: { assets: AppState }) => state.assets.assets);
  const { t } = useTranslation();

  const walletData = useLocalStorage<TWallet>('wallet', {
    pk: '',
    addr: '',
  })[0];

  useEffect(() => {
    const savedAssets = window.localStorage.getItem('assets');
    const parsed: string[] = JSON.parse(savedAssets ? savedAssets : '[]');
    if (parsed.length) dispatch(isLoadingReducer(true));

    (async () => {
      const userAssets = await checkSavedAssets(parsed ? parsed : []);
      dispatch(isLoadingReducer(false));
      dispatch(loadAssets(userAssets));

      for (const storedAsset of store.getState().assets.assets) {
        let assetBalance;
        if (storedAsset.symbol === 'BNB') assetBalance = await getNativeBalance(walletData.addr);
        else assetBalance = await getTokenBalance(storedAsset, walletData.addr);
        dispatch(updateAssetBalance({ address: storedAsset.address, balance: assetBalance }));
      }
    })();
  }, []);

  async function handleRefreshBalances() {
    for (const storedAsset of store.getState().assets.assets) {
      let assetBalance;
      if (storedAsset.symbol === 'BNB') assetBalance = await getNativeBalance(walletData.addr);
      else assetBalance = await getTokenBalance(storedAsset, walletData.addr);
      dispatch(updateAssetBalance({ address: storedAsset.address, balance: assetBalance }));
    }
  }

  return (
    <>
      <div className={styles.yourAssets}>
        <h1 className={styles.title}>{t('Your assets')}</h1>
        <div className={styles.describe}>
          {t('Here you can safely store, send and receive assets')}
        </div>
        <span className={styles.refresh} onClick={async () => handleRefreshBalances()}>
          {t('Refresh balances')}
        </span>
        <div className={styles.assets}>
          {assets.map((el, index) => {
            return (
              <div className={styles.asset} key={index}>
                <div className={styles.coin}>
                  <img src={el.logoURI} alt="" width={44} height={44} />
                </div>
                <div className={styles.coinAbout}>
                  <div className={styles.firstLine}>
                    <div className={styles.currency}>{el.name}</div>
                    <div className={styles.sum}>
                      {el.balance} {el.symbol}
                    </div>
                  </div>
                  <div className={styles.secondLine}>
                    <span className={styles.address}>Show address</span>
                    <span className={styles.usd}>{`${''}`.slice(0, 6)} USD</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button className={styles.addToken} onClick={() => setAssetsModalIsOpen(true)}>
          {t('Add custom tokens')}
        </button>
      </div>
      <AddCustomModal
        assetsModalIsOpen={assetsModalIsOpen}
        setAssetsModalIsOpen={setAssetsModalIsOpen}
      />
    </>
  );
}
