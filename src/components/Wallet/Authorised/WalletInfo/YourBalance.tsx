import styles from './WalletInfo.module.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { TWallet } from '../../../../scripts/getWallet';
import deposit from '../../../../assets/deposit.svg';
import withdraw from '../../../../assets/withdraw.svg';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, updateAssetBalance } from '../../../../store';
import getTokenBalance from '../../../../scripts/quoting/getTokenBalance';
import { store } from '../../../../store';
import getNativeBalance from '../../../../scripts/quoting/getNativeBalance';
import useTotalBalance from '../../../../hooks/useTotalBalance';

export default function YourBalance(props: {
  setDeposit: React.Dispatch<React.SetStateAction<boolean>>;
  setWithdraw: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const assets = useSelector((state: { assets: AppState }) => state.assets.assets);
  const [nativeBalance, usdBalance] = useTotalBalance(assets);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const walletData = useLocalStorage<TWallet>('wallet', {
    pk: '',
    addr: '',
  })[0];

  async function handleRefreshBalances() {
    for (const storedAsset of store.getState().assets.assets) {
      let assetBalance;
      if (storedAsset.symbol === 'BNB') assetBalance = await getNativeBalance(walletData.addr);
      else assetBalance = await getTokenBalance(storedAsset, walletData.addr);
      dispatch(updateAssetBalance({ address: storedAsset.address, balance: assetBalance }));
    }
  }

  return (
    <div className={styles.yourBalance}>
      <h1 className={styles.title}>{t('Your balance')}</h1>
      <div className={styles.usd}>{`${usdBalance}`} USD</div>
      <div className={styles.btc}>{`${nativeBalance}`} BNB</div>
      <div className={styles.buttons}>
        <button className={styles.deposit} onClick={() => props.setDeposit(true)}>
          <img src={deposit} alt="" />
          <span>{t('Deposit')}</span>
        </button>
        <button className={styles.withdraw} onClick={() => props.setWithdraw(true)}>
          <img src={withdraw} alt="" />
          <span>{t('Withdraw')}</span>
        </button>
      </div>
    </div>
  );
}
