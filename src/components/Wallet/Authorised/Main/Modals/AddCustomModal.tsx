import { useEffect, useState } from 'react';
import styles from '../MainWallet.module.scss';
import top7 from '../../../../../scripts/quoting/token-lists/pancakeswap-top-7.json';
import { useTranslation } from 'react-i18next';
import useLocalStorage from '../../../../../hooks/useLocalStorage';
import checkSavedAssets, { AssetWithBalance } from '../helpers/checkSavedAssets';
import { TWallet } from '../../../../../scripts/getWallet';

export default function AddCustomModal(props: {
  assets: AssetWithBalance[];
  setAssets: React.Dispatch<React.SetStateAction<AssetWithBalance[]>>;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();

  const [savedAssets, setSavedAssets] = useLocalStorage<string[]>('assets', []);
  const wallet = useLocalStorage<TWallet>('wallet', {
    pk: '',
    addr: '',
  })[0];

  async function handleAddCustomClick(newAddress: string) {
    if (!savedAssets.includes(newAddress)) {
      const newAssets = [...savedAssets, newAddress];
      props.close(false);
      props.setAssets(await checkSavedAssets(newAssets, wallet.addr));
      setSavedAssets(newAssets);
    }
  }

  return (
    <form name="assets" method="post" action="">
      <h1 className={styles.modalTitle}>{t('Select assets')}</h1>
      <div className={styles.searchWrapper}>
        <input className={styles.search} name="searchAssets" placeholder={`${t('Search')}`}></input>
      </div>
      <div className={styles.modalAssets}>
        {top7.tokens.map((el, index) => {
          return (
            <div
              className={styles.modalAsset}
              key={index}
              onClick={async () => await handleAddCustomClick(el.address)}
            >
              <div className={styles.logo}>
                <img src={el.logoURI} alt={`${el.symbol} logo`} width={44} height={44} />
              </div>
              <div className={styles.asset}>
                <span className={styles.assetTitle}>{el.symbol}</span>
                <span className={styles.assetName}>{el.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
}
