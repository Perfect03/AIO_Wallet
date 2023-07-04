import styles from '../MainWallet.module.scss';
import extSwap from '../../../../../scripts/quoting/token-lists/pancakeswap-extended-swap.json';
import ext from '../../../../../scripts/quoting/token-lists/pancakeswap-extended.json';
import { useTranslation } from 'react-i18next';
import useLocalStorage from '../../../../../hooks/useLocalStorage';
import { Asset } from '../helpers/checkSavedAssets';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { createFilterToken } from '../helpers/filtering';
import isEthereumAddress from '../helpers/isEthereumAddress';
import {
  addAsset,
  updateAssetBalance,
  setSwapFromAsset,
  setSwapToAsset,
} from '../../../../../store';
import { useDispatch } from 'react-redux';
import addNewAsset from '../helpers/addNewAsset';
import back from '../../../../../assets/back.svg';
import getTokenBalance from '../../../../../scripts/quoting/getTokenBalance';
import { TWallet } from '../../../../../scripts/getWallet';
import getTokenContract from '../../../../../scripts/quoting/token-lists/getTokenContract';
import custom from '../../../../../assets/CustomToken.svg';

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
  swap?: string;
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
    if (props.swap) {
      let newAsset;
      if (newAddress) newAsset = addNewAsset(newAddress)!;
      else
        newAsset = {
          name: 'BNB Token',
          symbol: 'BNB',
          address: '0',
          chainId: 56,
          decimals: 18,
          logoURI:
            'https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_BNB.png',
        };

      if (props.swap == 'from') dispatch(setSwapFromAsset(newAsset));
      if (props.swap == 'to') dispatch(setSwapToAsset(newAsset));
      props.setAssetsModalIsOpen(false);
    } else {
      if (savedAssets.includes(newAddress)) {
        toast['error'](t('This asset already exists'));
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
  }

  async function handleAddCustom() {
    if (!savedAssets.includes(searchValue)) {
      try {
        const token = getTokenContract(searchValue);
        const name = await token.name();
        const symbol = await token.symbol();
        const decimals = await token.decimals();

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
            logoURI: custom,
          };

          dispatch(addAsset(asset));
          props.setAssetsModalIsOpen(false);
          toast['success'](t('Token added'));

          dispatch(
            updateAssetBalance({
              address: asset?.address,
              balance: await getTokenBalance(asset, walletData.addr),
            })
          );
        } else throw 'invalid address';
      } catch {
        setIsValidCustomToken(false);
        //setTimeout(() => setIsValidCustomToken(true), 3000);
        toast['error'](t('Error! This address is not a token'));
      }
    } else if (props.swap) {
      try {
        const token = getTokenContract(searchValue);
        const name = await token.name();
        const symbol = await token.symbol();
        const decimals = await token.decimals();

        const asset = {
          name,
          symbol,
          address: searchValue,
          chainId: 56,
          decimals,
          logoURI: custom,
        };

        if (props.swap == 'from') dispatch(setSwapFromAsset(asset));
        if (props.swap == 'to') dispatch(setSwapToAsset(asset));
      } catch {
        toast['error'](t('Error! This address is not a token'));
      }
    } else toast['info'](t('Error! This address is not a token'));

    setIsCustom(false);
    setSearchValue('');
  }

  useEffect(() => {
    if (props.swap) setTokenList(extSwap);
    else setTokenList(ext);
  }, [props.assetsModalIsOpen]);

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
        <h1 className={styles.modalTitle}>{isCustom ? t('Enter address') : t('Select asset')}</h1>
        <button
          className={styles.modalBack}
          onClick={() => {
            if (isCustom) setIsCustom(false);
            else props.setAssetsModalIsOpen(false);
          }}
        >
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
        {!isCustom ? (
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
        ) : (
          ''
        )}
        {isCustom ? (
          <div className={styles.addCustom} onClick={async () => await handleAddCustom()}>
            {t('Add custom')}
          </div>
        ) : (
          <div
            className={styles.custom}
            onClick={() => {
              setIsCustom(true);
            }}
          >
            {t('Or search with contract address')}
          </div>
        )}
      </div>
    </Modal>
  );
}
