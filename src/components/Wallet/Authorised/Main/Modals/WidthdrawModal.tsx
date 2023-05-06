import { useState } from 'react';
import Modal from 'react-modal';
import styles from '../MainWallet.module.scss';
import back from '../../../../../assets/back.svg';
import more from '../../../../../assets/more.svg';
import { useTranslation } from 'react-i18next';

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
    background: 'rgba(29, 25, 37, 0.92)',
    backdropFilter: 'blur(11px)',
    borderRadius: '6px',
    padding: '24px',
    border: 0,
    maxHeight: '100vh', // потом нужно исправлять для каждой отдельной вариации окна
  },
};

export default function WithdrawModal(props: {
  withdrawModalIsOpen: boolean;
  setWithdrawModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isWithdrawalMenuOpen, setIsWithdrawalMenuOpen] = useState(false);
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [widthdrawSum, setWithdrawSum] = useState(0);

  const { t } = useTranslation();

  return (
    <Modal
      isOpen={props.withdrawModalIsOpen}
      onRequestClose={() => props.setWithdrawModalIsOpen(false)}
      style={withdrawModalStyles}
      className={styles.modal}
    >
      <form name="withdraw" method="post" action="">
        <button className={styles.modalBack} onClick={() => props.setWithdrawModalIsOpen(false)}>
          <img src={back} alt="" />
        </button>
        <h1 className={styles.modalTitle}>{t('Withdraw')}</h1>
        <h2 className={styles.modalSubTitle}>{t('Only BEP-20 assets can be withdrawn')}</h2>
        <div className={styles.field}>
          <div className={styles.fieldTitle}>{t('Select assets')}</div>
          <ul>
            <li
              className={styles.modalAsset}
              onClick={() => {
                setIsWithdrawalMenuOpen(!isWithdrawalMenuOpen);
              }}
            >
              <div className={styles.asset}>
                <img className={styles.modalAssetImage} src={''} alt="" />
                {``}
              </div>
              <img className={styles.assetMore} src={more} alt="" />
            </li>
            {/* {isWithdrawalMenuOpen &&
              assets.slice(1).map((el, index) => (
                <li className={styles.modalAsset} key={index}>
                  <div className={styles.asset}>
                    <img className={styles.modalAssetImage} src={''} alt="" />
                    {``}
                  </div>
                </li>
              ))} */}
          </ul>
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
        {withdrawAddress.length ? (
          <div className={styles.field}>
            <div className={styles.fieldTitles}>
              <div className={styles.fieldTitle}>{t('Withdrawal amount')}</div>
              <div className={styles.fieldSubTitle}>All</div>
            </div>
            <input
              className={styles.withdrawAiAmount}
              name="withdrawal"
              placeholder={`${t('Minimum amount')}: 0.34124331 BTC`}
              onChange={(e) => setWithdrawSum(Number(e.target.value))}
              value={widthdrawSum}
            ></input>
          </div>
        ) : (
          ''
        )}
        <div className={styles.modalInfo}>
          <div className={styles.infoTitle}>{t('Balance')} BTC</div>
          <div className={styles.info}>0.34124331 BTC</div>
        </div>
        <div className={styles.modalInfo} style={{ display: 'none' }}>
          <div className={styles.infoTitle}>{t('Minimum amount')}</div>
          <div className={styles.info}>0.34124331 BTC</div>
        </div>
        <div className={styles.modalInfo}>
          <div className={styles.infoTitle}>{t('Network comission')}</div>
          <div className={styles.info}>0.0000043 ~ 0.0002 BTC</div>
        </div>
        <div className={styles.sum}>0.34124331 BTC</div>
        <button className={styles.submit} type="submit">
          {t('to withdraw')}
        </button>
      </form>
    </Modal>
  );
}
