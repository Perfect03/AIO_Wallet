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

interface IMainWallet {
  user: IWallet;
}

const MainWallet = ({ user }: IMainWallet) => {
  const { language, setLanguage } = useContext(Context) as ContextType;

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
              <button className={styles.deposit}>
                <img src={deposit} alt="" />
                <span>Deposit</span>
              </button>
              <button className={styles.withdraw}>
                <img src={withdraw} alt="" />
                <span>Withdraw</span>
              </button>
            </div>
          </div>
          <div className={styles.yourAssets}>
            <h1 className={styles.title}>{t('Your assets')}</h1>
            <div className={styles.describe}>
              {t('Write these words in the correct order and keep them')}
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
            </div>
            <button className={styles.addToken}>{t('Add custom tokens')}</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default MainWallet;
