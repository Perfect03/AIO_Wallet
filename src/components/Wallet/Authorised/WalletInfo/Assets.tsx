import styles from './WalletInfo.module.scss';
import refresh from '../../../../assets/refresh.svg';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import checkSavedAssets, { Asset } from '../Main/helpers/checkSavedAssets';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { TWallet } from '../../../../scripts/getWallet';
import getBalances from '../Main/helpers/getBalances';
import getNativeBalance from '../../../../scripts/quoting/getNativeBalance';
import AddCustomModal from '../Main/Modals/AddCustomModal';

const assetsModalStyles = {
  overlay: {
    backgroundColor: 'rgba(15, 12, 23, 0.82)',
    zIndex: 31,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    background: 'rgba(29, 25, 37, 0.92)',
    backdropFilter: 'blur(11px)',
    borderRadius: '6px',
    padding: '24px',
    border: 0,
  },
};

export default function Assets() {
  const [assetsModalIsOpen, setAssetsModalIsOpen] = React.useState(false);
  const [nativeBal, setNativeBal] = useState('');

  const [assets, setAssets] = useState<Asset[]>([]);

  const walletData = useLocalStorage<TWallet>('wallet', {
    pk: '',
    addr: '',
  })[0];

  useEffect(() => {
    const savedAssets = window.localStorage.getItem('assets');
    const parsed: string[] = JSON.parse(savedAssets ? savedAssets : '[]');

    (async () => {
      let userAssets = checkSavedAssets(parsed ? parsed : []);
      setAssets(userAssets);
      userAssets = await getBalances(userAssets, walletData.addr);
      setAssets(userAssets);

      const bal = await getNativeBalance(walletData.addr);
      setNativeBal(bal.toString());
    })();
  }, []);
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.yourAssets}>
        <h1 className={styles.title}>{t('Your assets')}</h1>
        <div className={styles.describe}>
          {t('Here you can safely store, send and receive assets')}
        </div>
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
                      <button>
                        <img src={refresh} alt="" />
                      </button>
                      <>{el.balance}</>
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
        assets={assets}
        setAssets={setAssets}
        assetsModalIsOpen={assetsModalIsOpen}
        setAssetsModalIsOpen={setAssetsModalIsOpen}
      />
    </>
  );
}
