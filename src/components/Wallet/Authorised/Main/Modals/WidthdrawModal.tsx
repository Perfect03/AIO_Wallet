import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from '../MainWallet.module.scss';
import back from '../../../../../assets/back.svg';
import more from '../../../../../assets/more.svg';
import { useTranslation } from 'react-i18next';
import { Asset } from '../helpers/checkSavedAssets';
import { useSelector } from 'react-redux';
import { AppState, store } from '../../../store';
import isEthereumAddress from '../helpers/isEthereumAddress';
import withdraw from '../../../../../scripts/widthdraw';
import useLocalStorage from '../../../../../hooks/useLocalStorage';
import { TWallet } from '../../../../../scripts/getWallet';
import getFees from '../../../../../scripts/quoting/getFees';
import { toReadableAmount } from '../../../../../scripts/quoting/libs/conversion';
import { BigNumber } from 'ethers';

const withdrawModalStyles = {
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
    maxHeight: '100vh', // потом нужно исправлять для каждой отдельной вариации окна
  },
};

export default function WithdrawModal(props: {
  withdrawModalIsOpen: boolean;
  setWithdrawModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const assets = useSelector((state: { assets: AppState }) => state.assets.assets);
  const unsubscribe = store.subscribe(handleSubscribe);

  const [isWithdrawalMenuOpen, setIsWithdrawalMenuOpen] = useState(false);
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawSum, setWithdrawSum] = useState<number | undefined>(undefined);
  const [withdrawAccept, setWithdrawAccept] = useState(false);
  const [withdrawAsset, setWithdrawAsset] = useState<Asset>(assets[0]);
  const [fees, setFees] = useState<BigNumber>(BigNumber.from(0));

  const wallet = useLocalStorage<TWallet>('wallet')[0];

  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const comission = await getFees();
      setFees(comission || BigNumber.from(0));
    })();
  }, []);

  useEffect(() => {
    if (!props.withdrawModalIsOpen) {
      setWithdrawAddress('');
      setWithdrawSum(undefined);
      setWithdrawAccept(false);
      setWithdrawAsset(assets[0]);
    }
  }, [props.withdrawModalIsOpen]);

  function handleClose() {
    props.setWithdrawModalIsOpen(false);
    setWithdrawAddress('');
    setWithdrawSum(0);
  }

  function handleSubscribe() {
    const bnb = store.getState().assets.assets[0];
    if (bnb.balance !== withdrawAsset.balance) setWithdrawAsset(bnb);
    unsubscribe();
  }

  function handleSubmitClick() {
    withdrawAccept ? () => {} : setWithdrawAccept(true);
  }

  return (
    <Modal
      isOpen={props.withdrawModalIsOpen}
      onRequestClose={handleClose}
      style={withdrawModalStyles}
      className={`${styles.modal} ${styles.modalWithdraw}`}
      appElement={document.getElementById('root') || undefined}
    >
      <div className={styles.modalWindow}>
        <button className={styles.modalBack} onClick={() => props.setWithdrawModalIsOpen(false)}>
          <img src={back} alt="" />
        </button>
        <h1 className={styles.modalTitle}>{t('Withdraw')}</h1>
        <h2 className={styles.modalSubTitle}>{t('Only BEP-20 assets can be withdrawn')}</h2>
        <div className={`${styles.field} ${isWithdrawalMenuOpen ? styles.listOpen : ''}`}>
          <div className={styles.fieldTitle}>{t('Select assets')}</div>
          <div className={styles.dropdownBlock}>
            <ul>
              <li
                className={styles.modalAsset}
                onClick={() => {
                  setIsWithdrawalMenuOpen(!isWithdrawalMenuOpen);
                }}
              >
                <div className={styles.asset}>
                  <img
                    className={styles.modalAssetImage}
                    src={withdrawAsset.logoURI}
                    alt={`${withdrawAsset.symbol}`}
                    width={32}
                    height={32}
                  />
                  {withdrawAsset.name}
                </div>
                <img className={styles.assetMore} src={more} alt="" />
              </li>
              {isWithdrawalMenuOpen &&
                assets
                  .filter((el) => el != withdrawAsset)
                  .map((el, index) => (
                    <li
                      className={styles.modalAsset}
                      key={index}
                      onClick={() => {
                        setIsWithdrawalMenuOpen(!isWithdrawalMenuOpen);
                        setWithdrawAsset(el);
                      }}
                    >
                      <div className={styles.asset}>
                        <img
                          className={styles.modalAssetImage}
                          src={el.logoURI}
                          alt={`${el.address} logo`}
                          width={32}
                          height={32}
                        />
                        {el.name}
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.fieldTitle}>{t('Address')}</div>
          <input
            className={styles.addressWithdraw}
            onChange={(e) => setWithdrawAddress(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <div className={styles.fieldTitle}>{t('Network')}</div>
          <div className={styles.network}>
            <div className={styles.networkTitle}>BSC</div>
            <div className={styles.networkSubTitle}>(BEP20)</div>
          </div>
        </div>
        {isEthereumAddress(withdrawAddress) == 'valid' ? (
          <div className={styles.field}>
            <div className={styles.fieldTitles}>
              <div className={styles.fieldTitle}>{t('Withdrawal amount')}</div>
              <div
                className={styles.fieldSubTitle}
                onClick={() => setWithdrawSum(withdrawAsset?.balance ? +withdrawAsset?.balance : 0)}
              >
                All
              </div>
            </div>
            <input
              className={styles.withdrawAiAmount}
              name="withdrawal"
              type="number"
              placeholder={`${t('Minimum amount')}: 0.34124331 BTC`}
              onChange={(e) => {
                const newValue = e.target.value;
                const sanitizedValue = +newValue.replace(/,/g, '.');
                if (sanitizedValue === 0) setWithdrawSum(undefined);
                else setWithdrawSum(sanitizedValue);
              }}
              value={withdrawSum}
            ></input>
          </div>
        ) : (
          ''
        )}
        <div className={styles.modalInfo}>
          <div className={styles.infoTitle}>{t('Balance')}</div>
          <div className={styles.info}>{`${withdrawAsset.balance} ${withdrawAsset.symbol}`}</div>
        </div>
        <div className={styles.modalInfo} style={{ display: 'none' }}>
          <div className={styles.infoTitle}>{t('Minimum amount')}</div>
          <div className={styles.info}>0.34124331 BTC</div>
        </div>
        <div className={styles.modalInfo}>
          <div className={styles.infoTitle}>{t('Network comission')}</div>
          <div className={styles.info}>
            {`${toReadableAmount(fees.mul(21000), 18)} ~ ${toReadableAmount(fees.mul(65000), 18)}`}{' '}
            BNB
          </div>
        </div>
        {withdrawSum ? (
          <>
            <div className={styles.sum}>0.34124331 BTC</div>
            <div
              className={withdrawAccept ? styles.submitInactive : styles.submit}
              onClick={handleSubmitClick}
            >
              {t('Withdraw')}
            </div>
          </>
        ) : (
          ''
        )}
        {withdrawAccept ? (
          <div
            className={`${styles.submit} ${styles.accept}`}
            onClick={() => withdraw(withdrawAsset!, withdrawAddress, withdrawSum!, wallet)}
          >
            {t('Accept withdraw')}
          </div>
        ) : (
          ''
        )}
      </div>
    </Modal>
  );
}
