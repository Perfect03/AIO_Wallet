import styles from './MainWallet.module.scss';
import logo from '../../../../assets/logo__header.svg';
import deposit from '../../../../assets/deposit.svg';
import refresh from '../../../../assets/refresh.svg';
import withdraw from '../../../../assets/withdraw.svg';
import bitcoin from '../../../../assets/bitcoin.svg';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Context, ContextType } from '../../../../languageContext';
import { NavLink } from 'react-router-dom';
import { IWallet } from '../../../../interfaces/interfaces';
import Modal from 'react-modal';

interface IMainWallet {
  user: IWallet;
}

const MainWallet = ({ user }: IMainWallet) => {
  const [depositModalIsOpen, setDepositModalIsOpen] = React.useState(false);
  const [withdrawModalIsOpen, setWithdrawModalIsOpen] = React.useState(false);
  const depositModalStyles = {
    overlay: {
      backgroundColor: 'rgba(15, 12, 23, 0.82)',
      zIndex: 31,
    },
    content: {
      width: '423px',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(29, 25, 37, 0.92)',
      backdropFilter: 'blur(11px)',
      borderRadius: '6px',
      padding: 0,
      border: 0,
      left: 'calc(50vw  - 423px/2)',
    },
  }

  const { t } = useTranslation();

  return (
    <>
      <main className={styles.mainWalletAuthorised}>
        <div className={styles.container}>
          <div className={styles.yourBalance}>
            <h1 className={styles.title}>{t('Your balance')}</h1>
            <div className={styles.usd}>{`${user.balance}`.slice(0, 8)} USD</div>
            <div className={styles.btc}>{`${user.btc}`.slice(0, 10)} BTC</div>
            <div className={styles.buttons}>
              <button className={styles.deposit} onClick={() => setDepositModalIsOpen(true)}>
                <img src={deposit} alt="" />
                <span>{t('Deposit')}</span>
              </button>
              <button className={styles.withdraw} onClick={() => {

              }}>
                <img src={withdraw} alt="" />
                <span>{t('Withdraw')}</span>
              </button>
            </div>
          </div>
          <div className={styles.yourAssets}>
            <h1 className={styles.title}>{t('Your assets')}</h1>
            <div className={styles.describe}>
              {t('Here you can safely store, send and receive assets')}
            </div>
            <div className={styles.assets}>
              <div className={styles.asset}>
                <div className={styles.coin}>
                  <img src={bitcoin} alt="" />
                </div>
                <div className={styles.coinAbout}>
                  <div className={styles.firstLine}>
                    <div className={styles.currency}>Bitcoin</div>
                    <div className={styles.sum}>
                      <button>
                        <img src={refresh} alt="" />
                      </button>
                      {user.btc}
                    </div>
                  </div>
                  <div className={styles.secondLine}>
                    <span className={styles.address}>Show address</span>
                    <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                  </div>
                </div>
              </div>
              <div className={styles.asset}>
                <div className={styles.coin}>
                  <img src={bitcoin} alt="" />
                </div>
                <div className={styles.coinAbout}>
                  <div className={styles.firstLine}>
                    <div className={styles.currency}>Bitcoin</div>
                    <div className={styles.sum}>
                      <button>
                        <img src={refresh} alt="" />
                      </button>
                      {user.btc}
                    </div>
                  </div>
                  <div className={styles.secondLine}>
                    <span className={styles.address}>Show address</span>
                    <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                  </div>
                </div>
              </div>
            </div>
            <button className={styles.addToken}>{t('Add custom tokens')}</button>
          </div>
        </div>
        <Modal
        isOpen={depositModalIsOpen}
        onRequestClose={() => setDepositModalIsOpen(false)}
        style={depositModalStyles}
        contentLabel="Example Modal"
        >
          22
        </Modal>
      </main>
    </>
  );
};

export default MainWallet;
