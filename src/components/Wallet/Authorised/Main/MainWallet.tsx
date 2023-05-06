import styles from './MainWallet.module.scss';
import deposit from '../../../../assets/deposit.svg';
import refresh from '../../../../assets/refresh.svg';
import withdraw from '../../../../assets/withdraw.svg';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import getNativeBalance from '../../../../scripts/quoting/getNativeBalance';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { TWallet } from '../../../../scripts/getWallet';
import AddCustomModal from './Modals/AddCustomModal';
import checkSavedAssets, { Asset } from './helpers/checkSavedAssets';
import WithdrawModal from './Modals/WidthdrawModal';
import DepositModal from './Modals/DepositModal';
import getBalances from './helpers/getBalances';

const MainWallet = () => {
  const [nativeBal, setNativeBal] = useState('');
  const [bnbQuote, setBnbQuote] = useState(0);
  const [withdrawModalIsOpen, setWithdrawModalIsOpen] = useState(false);
  const [depositModalIsOpen, setDepositModalIsOpen] = useState(false);
  const [assetsModalIsOpen, setAssetsModalIsOpen] = useState(false);

  const [assets, setAssets] = useState<Asset[]>([]);

  const walletData = useLocalStorage<TWallet>('wallet', {
    pk: '',
    addr: '',
  })[0];

  useEffect(() => {
    const savedAssets = window.localStorage.getItem('assets');
    const parsed: string[] = JSON.parse(savedAssets ? savedAssets : '[]');

    (async () => {
      let userAssets = checkSavedAssets(parsed ? parsed : []);
      setAssets(userAssets);
      userAssets = await getBalances(userAssets, walletData.addr);
      setAssets(userAssets);

      const bal = await getNativeBalance(walletData.addr);
      setNativeBal(bal.toString());
    })();
  }, []);

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
          <div className={styles.yourAssets}>
            <h1 className={styles.title}>{t('Your assets')}</h1>
            <div className={styles.describe}>
              {t('Here you can safely store, send and receive assets')}
            </div>
            <div className={styles.assets}>
              {assets.map((el, index) => {
                return (
                  <div className={styles.asset} key={index}>
                    <div className={styles.coin}>
                      <img src={el.logoURI} alt="" width={44} height={44} />
                    </div>
                    <div className={styles.coinAbout}>
                      <div className={styles.firstLine}>
                        <div className={styles.currency}>{el.name}</div>
                        <div className={styles.sum}>
                          <button>
                            <img src={refresh} alt="" />
                          </button>
                          <>{el.balance}</>
                        </div>
                      </div>
                      <div className={styles.secondLine}>
                        <span className={styles.address}>Show address</span>
                        <span className={styles.usd}>{`${''}`.slice(0, 6)} USD</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className={styles.addToken} onClick={() => setAssetsModalIsOpen(true)}>
              {t('Add custom tokens')}
            </button>
          </div>
        </div>
        <DepositModal
          depositModalIsOpen={depositModalIsOpen}
          setDepositModalIsOpen={setDepositModalIsOpen}
        />
        {/* <WithdrawModal
          withdrawModalIsOpen={withdrawModalIsOpen}
          setWithdrawModalIsOpen={setWithdrawModalIsOpen}
        /> */}
        <AddCustomModal
          assets={assets}
          setAssets={setAssets}
          assetsModalIsOpen={assetsModalIsOpen}
          setAssetsModalIsOpen={setAssetsModalIsOpen}
        />
      </main>
    </>
  );
};

export default MainWallet;
