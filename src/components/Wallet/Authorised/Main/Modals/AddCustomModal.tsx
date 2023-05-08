import styles from '../MainWallet.module.scss';
import ext from '../../../../../scripts/quoting/token-lists/pancakeswap-extended.json';
import { useTranslation } from 'react-i18next';
import useLocalStorage from '../../../../../hooks/useLocalStorage';
import checkSavedAssets, { Asset } from '../helpers/checkSavedAssets';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { createFilterToken } from '../helpers/filtering';
import isEthereumAddress from '../helpers/isEthereumAddress';
import { addAsset, updateAssetBalance } from '../../../store';
import { useDispatch } from 'react-redux';
import addNewAsset from '../helpers/addNewAsset';
import getTokenBalance from '../../../../../scripts/quoting/getTokenBalance';
import { TWallet } from '../../../../../scripts/getWallet';

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
    maxWidth: '90vw',
    background: 'rgba(29, 25, 37, 0.92)',
    backdropFilter: 'blur(11px)',
    borderRadius: '6px',
    border: 0,
  },
};

export default function AddCustomModal(props: {
  assetsModalIsOpen: boolean;
  setAssetsModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState('');
  const [savedAssets, setSavedAssets] = useLocalStorage<string[]>('assets', []);
  const [tokenList, setTokenList] = useState<Asset[]>([]);
  const dispatch = useDispatch();
  const walletData = useLocalStorage<TWallet>('wallet', {
    pk: '',
    addr: '',
  })[0];

  async function handleAddCustomClick(newAddress: string) {
    if (!savedAssets.includes(newAddress)) {
      const newAsset = addNewAsset(newAddress)!;
      setSavedAssets([...savedAssets, newAddress]);
      dispatch(addAsset(newAsset));
      props.setAssetsModalIsOpen(false);
      dispatch(
        updateAssetBalance({
          address: newAsset?.address,
          balance: await getTokenBalance(newAsset, walletData.addr),
        })
      );
    }
  }

  useEffect(() => {
    setTokenList(ext);
  }, []);

  useEffect(() => {
    const newTokenList = ext.filter(
      createFilterToken(searchValue, () => isEthereumAddress(searchValue) == 'valid')
    );
    setTokenList(newTokenList);
  }, [searchValue]);

  return (
    <Modal
      isOpen={props.assetsModalIsOpen}
      onRequestClose={() => props.setAssetsModalIsOpen(false)}
      style={assetsModalStyles}
      className={styles.modal}
      appElement={document.getElementById('root') || undefined}
    >
      <form name="assets" method="post" action="">
        <h1 className={styles.modalTitle}>{t('Select asset')}</h1>
        <div className={styles.searchWrapper}>
          <input
            className={styles.search}
            name="searchAssets"
            placeholder={`${t('Search')}`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className={styles.modalAssets}>
          {tokenList.map((el, index) => {
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
