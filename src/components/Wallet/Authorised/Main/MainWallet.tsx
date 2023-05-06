import styles from './MainWallet.module.scss';
import deposit from '../../../../assets/deposit.svg';
import refresh from '../../../../assets/refresh.svg';
import withdraw from '../../../../assets/withdraw.svg';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import getNativeBalance from '../../../../scripts/quoting/getNativeBalance';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { TWallet } from '../../../../scripts/getWallet';
import checkSavedAssets, { Asset } from './helpers/checkSavedAssets';
import WithdrawModal from './Modals/WidthdrawModal';
import DepositModal from './Modals/DepositModal';
import getBalances from './helpers/getBalances';
import Assets from '../WalletInfo/Assets';
import Transactions from '../WalletInfo/Transactions';

const MainWallet = () => {
  const [nativeBal, setNativeBal] = useState('');
  const [bnbQuote, setBnbQuote] = useState(0);
  const [withdrawModalIsOpen, setWithdrawModalIsOpen] = useState(false);
  const [depositModalIsOpen, setDepositModalIsOpen] = useState(false);
  const [assetsWindow, setAssetsWindow] = useState('assets');

  const { t } = useTranslation();

  return (
    <>
      <main className={styles.mainWalletAuthorised}>
        <div className={styles.container}>
          <div className={styles.yourBalance}>
            <h1 className={styles.title}>{t('Your balance')}</h1>
            <div className={styles.usd}>{`${bnbQuote * +nativeBal}`.slice(0, 8)} USD</div>
            <div className={styles.btc}>{`${nativeBal}`.slice(0, 10)} BTC</div>
            <div className={styles.buttons}>
              <button className={styles.deposit} onClick={() => setDepositModalIsOpen(true)}>
                <img src={deposit} alt="" />
                <span>{t('Deposit')}</span>
              </button>
              <button className={styles.withdraw} onClick={() => setWithdrawModalIsOpen(true)}>
                <img src={withdraw} alt="" />
                <span>{t('Withdraw')}</span>
              </button>
            </div>
          </div>
          {assetsWindow == 'assets' ? <Assets /> : <Transactions />}
        </div>
        <DepositModal
          depositModalIsOpen={depositModalIsOpen}
          setDepositModalIsOpen={setDepositModalIsOpen}
        />
        <WithdrawModal
          withdrawModalIsOpen={withdrawModalIsOpen}
          setWithdrawModalIsOpen={setWithdrawModalIsOpen}
        />
      </main>
    </>
  );
};

export default MainWallet;
