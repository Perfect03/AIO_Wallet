import styles from './MainWallet.module.scss';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import WithdrawModal from './Modals/WidthdrawModal';
import { toast } from 'react-toastify';
import { changeWallet, isLoadingReducer } from '../../../../store';
import DepositModal from './Modals/DepositModal';
import Transactions from '../WalletInfo/Transactions';
import Assets from '../WalletInfo/Assets';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../store';
import { useEffect } from 'react';
import useLoadAssets from '../../../../hooks/useLoadAssets';
import useLoadTransactions from '../../../../hooks/useLoadTransactions';
import YourBalance from '../WalletInfo/YourBalance';
import Swap from '../WalletInfo/Swap/MainSwap';

const MainWallet = () => {
  const [withdrawModalIsOpen, setWithdrawModalIsOpen] = useState(false);
  const [depositModalIsOpen, setDepositModalIsOpen] = useState(false);
  const [loaderTimer, setLoaderTimer] = useState<NodeJS.Timeout>();
  const dispatch = useDispatch();

  const walletWindow = useSelector((state: { assets: AppState }) => state.assets.wallet);

  const isLoad = useSelector((state: { assets: AppState }) => state.assets.load);

  useLoadAssets();
  const isLoading = useLoadTransactions();

  useEffect(() => {
    if (!isLoad) {
      return () => {
        clearTimeout(loaderTimer);
      };
    } else {
      const timer = setTimeout(() => {
        toast['error'](t('Check internet connecion'));
        dispatch(isLoadingReducer(false));
      }, 15000);
      setLoaderTimer(timer);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isLoad]);

  useEffect(
    () => () => {
      window.localStorage.removeItem('transactions');
    },
    []
  );

  const { t } = useTranslation();

  return (
    <>
      <main className={styles.mainWalletAuthorised}>
        <div className={`${styles.container} ${walletWindow == 'swap' && styles.swap}`}>
          {walletWindow == 'swap' ? (
            <Swap></Swap>
          ) : (
            <>
              <YourBalance
                setWithdraw={setWithdrawModalIsOpen}
                setDeposit={setDepositModalIsOpen}
              ></YourBalance>
              <div className={styles.yourAssets}>
                <div className={styles.titles}>
                  <h1
                    className={`${styles.title}  ${
                      walletWindow === 'assets' ? styles.active : styles.inActive
                    }`}
                    onClick={() => dispatch(changeWallet('assets'))}
                  >
                    {t('Your assets')}
                  </h1>
                  <h1
                    className={`${styles.title} ${
                      walletWindow !== 'assets' ? styles.active : styles.inActive
                    }`}
                    onClick={() => dispatch(changeWallet('transactions'))}
                  >
                    {t('Transactions')}
                  </h1>
                </div>
                {walletWindow === 'assets' ? <Assets /> : <Transactions isLoading={isLoading} />}
              </div>
            </>
          )}
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
