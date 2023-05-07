import { useState } from 'react';
import Modal from 'react-modal';
import styles from '../MainWallet.module.scss';
import { useTranslation } from 'react-i18next';
import useLocalStorage from '../../../../../hooks/useLocalStorage';
import { TWallet } from '../../../../../scripts/getWallet';
import back from '../../../../../assets/back.svg';
import copyForModal from '../../../../../assets/copyForModal.svg';
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';

const depositModalStyles = {
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
    maxHeight: '531px',
  },
};

export default function DepositModal(props: {
  depositModalIsOpen: boolean;
  setDepositModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const wallet = useLocalStorage<TWallet>('wallet', {
    pk: '',
    addr: '',
  })[0];

  const { t } = useTranslation();

  function handleCopyClick() {
    navigator.clipboard
      .writeText(wallet.addr)
      .then(() => {
        toast['info'](t('Copy address'));
      })
      .catch((err) => {
        toast['error'](t('Copy address error'));
      });
  }

  return (
    <Modal
      isOpen={props.depositModalIsOpen}
      onRequestClose={() => props.setDepositModalIsOpen(false)}
      style={depositModalStyles}
      className={styles.modal}
      appElement={document.getElementById('root') || undefined}
    >
      <button className={styles.modalBack} onClick={() => props.setDepositModalIsOpen(false)}>
        <img src={back} alt="" />
      </button>
      <h1 className={styles.modalTitle}>{t('Deposit')}</h1>
      <h2 className={styles.modalSubTitle}>{t('Only BEP-20 assets can be deposited')}</h2>
      <div className={styles.field}>
        <div className={styles.fieldTitle}>{t('Network')}</div>
        <div className={styles.network}>
          <div className={styles.networkTitle}>BSC</div>
          <div className={styles.networkSubTitle}>(BEP20)</div>
        </div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldTitle}>{t('Address')}</div>
        <div className={styles.addressDeposit}>
          <p className={styles.addressText}>{wallet.addr}</p>
          <button className={styles.addressCopy} onClick={handleCopyClick}>
            <img src={copyForModal} alt="" />
          </button>
        </div>
      </div>
      <div className={styles.qrBorder}>
        <div className={styles.qr}>
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={wallet.addr}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
    </Modal>
  );
}
