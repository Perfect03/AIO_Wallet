import styles from './MainWallet.module.scss';
import deposit from '../../../../assets/deposit.svg';
import withdraw from '../../../../assets/withdraw.svg';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import WithdrawModal from './Modals/WidthdrawModal';
import DepositModal from './Modals/DepositModal';
import Transactions from '../WalletInfo/Transactions';
import Assets from '../WalletInfo/Assets';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import useTotalBalance from '../../../../hooks/useTotalBalance';

const MainWallet = () => {
  const [withdrawModalIsOpen, setWithdrawModalIsOpen] = useState(false);
  const [depositModalIsOpen, setDepositModalIsOpen] = useState(false);
  const [assetsWindow, setAssetsWindow] = useState('assets');

  const assets = useSelector((state: { assets: AppState }) => state.assets.assets);

  const [nativeBalance, usdBalance] = useTotalBalance(assets);

  const { t } = useTranslation();

  return (
    <>
      <main className={styles.mainWalletAuthorised}>
        <div className={styles.container}>
          <div className={styles.yourBalance}>
            <h1 className={styles.title}>{t('Your balance')}</h1>
            <div className={styles.usd}>{`${usdBalance}`} USD</div>
            <div className={styles.btc}>{`${nativeBalance}`} BTC</div>
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
