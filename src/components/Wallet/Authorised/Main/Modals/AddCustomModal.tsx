import { useEffect, useState } from 'react';
import styles from '../MainWallet.module.scss';
import top7 from '../../../../../scripts/quoting/token-lists/pancakeswap-top-7.json';
import { useTranslation } from 'react-i18next';
import useLocalStorage from '../../../../../hooks/useLocalStorage';
import checkSavedAssets, { Asset } from '../helpers/checkSavedAssets';
import { TWallet } from '../../../../../scripts/getWallet';
import Modal from 'react-modal';

const assetsModalStyles = {
  overlay: {
    backgroundColor: 'rgba(15, 12, 23, 0.82)',
    zIndex: 31,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '423px',
    background: 'rgba(29, 25, 37, 0.92)',
    backdropFilter: 'blur(11px)',
    borderRadius: '6px',
    padding: '24px',
    border: 0,
  },
};

export default function AddCustomModal(props: {
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
  assetsModalIsOpen: boolean;
  setAssetsModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
      props.setAssetsModalIsOpen(false);
      props.setAssets(checkSavedAssets(newAssets));
      setSavedAssets(newAssets);
    }
  }

  return (
    <Modal
      isOpen={props.assetsModalIsOpen}
      onRequestClose={() => props.setAssetsModalIsOpen(false)}
      style={assetsModalStyles}
      className={styles.modal}
    >
      <form name="assets" method="post" action="">
        <h1 className={styles.modalTitle}>{t('Select assets')}</h1>
        <div className={styles.searchWrapper}>
          <input
            className={styles.search}
            name="searchAssets"
            placeholder={`${t('Search')}`}
          ></input>
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
    </Modal>
  );
}
