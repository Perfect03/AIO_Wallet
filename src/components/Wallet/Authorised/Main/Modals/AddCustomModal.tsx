import styles from '../MainWallet.module.scss';
import ext from '../../../../../scripts/quoting/token-lists/pancakeswap-extended.json';
import { useTranslation } from 'react-i18next';
import useLocalStorage from '../../../../../hooks/useLocalStorage';
import checkSavedAssets, { Asset } from '../helpers/checkSavedAssets';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { createFilterToken } from '../helpers/filtering';
import isEthereumAddress from '../helpers/isEthereumAddress';
import { addAsset, updateAssetBalance } from '../../../store';
import { useDispatch } from 'react-redux';
import addNewAsset from '../helpers/addNewAsset';
import back from '../../../../../assets/back.svg';
import getTokenBalance from '../../../../../scripts/quoting/getTokenBalance';
import { TWallet } from '../../../../../scripts/getWallet';
import getTokenContract from '../../../../../scripts/quoting/token-lists/getTokenContract';

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
  const [isCustom, setIsCustom] = useState(false);
  const [isValidCustomToken, setIsValidCustomToken] = useState(true);
  const dispatch = useDispatch();

  const walletData = useLocalStorage<TWallet>('wallet', {
    pk: '',
    addr: '',
  })[0];

  async function handleAddCustomClick(newAddress: string) {
    if (savedAssets.includes(newAddress)) {
      toast['error'](t('This asset is already exists'));
    } else {
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

  async function handleAddCustom() {
    if (!savedAssets.includes(searchValue)) {
      try {
        const token = getTokenContract(searchValue);
        console.log(token);
        const name = await token.name();
        const symbol = await token.symbol();
        const decimals = await token.decimals();

        console.log(typeof 'asd');

        if (
          typeof name === 'string' &&
          typeof symbol === 'string' &&
          typeof decimals === 'number'
        ) {
          setSavedAssets([...savedAssets, searchValue]);

          const asset = {
            name,
            symbol,
            address: searchValue,
            chainId: 56,
            decimals,
            logoURI: '',
          };

          dispatch(addAsset(asset));

          props.setAssetsModalIsOpen(false);

          dispatch(
            updateAssetBalance({
              address: asset?.address,
              balance: await getTokenBalance(asset, walletData.addr),
            })
          );
        } else throw 'invalid address';
      } catch {
        setIsValidCustomToken(false);
        setTimeout(() => setIsValidCustomToken(true), 3000);
      }
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

    if (!newTokenList.length && isEthereumAddress(searchValue) == 'valid') {
      setIsCustom(true);
    }
  }, [searchValue]);

  return (
    <Modal
      isOpen={props.assetsModalIsOpen}
      onRequestClose={() => props.setAssetsModalIsOpen(false)}
      style={assetsModalStyles}
      className={styles.modal}
      appElement={document.getElementById('root') || undefined}
    >
      <div className={styles.modalWindow}>
        <h1 className={styles.modalTitle}>{t('Select asset')}</h1>
        <button className={styles.modalBack} onClick={() => props.setAssetsModalIsOpen(false)}>
          <img src={back} alt="" />
        </button>
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
          {isCustom ? (
            isValidCustomToken ? (
              <span onClick={handleAddCustom}>Add custom token</span>
            ) : (
              'Error! This address is not a token'
            )
          ) : (
            ''
          )}
        </div>
      </div>
    </Modal>
  );
}
