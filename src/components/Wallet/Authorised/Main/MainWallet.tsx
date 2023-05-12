import styles from './MainWallet.module.scss';
import deposit from '../../../../assets/deposit.svg';
import withdraw from '../../../../assets/withdraw.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import WithdrawModal from './Modals/WidthdrawModal';
import { toast } from 'react-toastify';
import { isLoadingReducer, store } from '../../store';
import DepositModal from './Modals/DepositModal';
import Transactions from '../WalletInfo/Transactions';
import Assets from '../WalletInfo/Assets';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import { Triangle } from 'react-loader-spinner';
import useTotalBalance from '../../../../hooks/useTotalBalance';
import useAddressTransactions from '../../../../hooks/useAddressTransactions';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { useEffect } from 'react';
import useLoadAssets from '../../../../hooks/useLoadAssets';

const MainWallet = () => {
  const [withdrawModalIsOpen, setWithdrawModalIsOpen] = useState(false);
  const [depositModalIsOpen, setDepositModalIsOpen] = useState(false);
  const [assetsWindow, setAssetsWindow] = useState('assets');
  const [loaderTimer, setLoaderTimer] = useState<NodeJS.Timeout>();
  const dispatch = useDispatch();

  const assets = useSelector((state: { assets: AppState }) => state.assets.assets);

  const [nativeBalance, usdBalance] = useTotalBalance(assets);
  const isLoad = useSelector((state: { assets: AppState }) => state.assets.load);

  useLoadAssets();

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

  const walletData = useLocalStorage('wallet', {
    pk: '',
    addr: '',
  })[0];
  useAddressTransactions(walletData.addr);

  const { t } = useTranslation();

  return (
    <>
      <main className={styles.mainWalletAuthorised}>
        {isLoad && (
          <div className={styles.loader}>
            <Triangle
              height="80"
              width="80"
              color="#B35BCE"
              ariaLabel="triangle-loading"
              wrapperStyle={{
                position: 'fixed',
                zIndex: '1000',
                top: '50%',
                left: '50%',
              }}
              visible={true}
            />
          </div>
        )}
        <div className={styles.container}>
          <div className={styles.yourBalance}>
            <h1 className={styles.title}>{t('Your balance')}</h1>
            <div className={styles.usd}>{`${usdBalance}`} USD</div>
            <div className={styles.btc}>{`${nativeBalance}`} BNB</div>
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
          {assetsWindow === 'assets' ? <Assets /> : ''}
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
