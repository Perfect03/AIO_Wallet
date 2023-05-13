import styles from './WalletInfo.module.scss';
import deposit from '../../../../assets/deposit.svg';
import withdraw from '../../../../assets/withdraw.svg';
import { useTranslation } from 'react-i18next';
import useResize from '../../../../hooks/use-resize';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import useAddressTransactions, { Transaction } from '../../../../hooks/useAddressTransactions';

export default function Transactions() {
  const { t } = useTranslation();
  const width = useResize();

  const [transactions, setTransactions] = useLocalStorage<Array<Transaction>>('txsMap', []);

  const walletData = useLocalStorage('wallet', {
    pk: '',
    addr: '',
  })[0];

  useAddressTransactions(walletData.addr);

  return (
    <>
      <div className={styles.describe}>{t('Select coin for transaction type')}</div>
      <div className={styles.transactions}>
        {transactions.map((el, index) => (
          <div
            className={styles.transaction}
            key={index}
            title={width < 540 ? `${el.type == 'deposit' ? t('From') : t('To')}: ${el.client}` : ''}
          >
            <div className={styles.left}>
              <div className={styles.icon}>
                <img src={el.type == 'withdraw' ? withdraw : deposit} alt="" />
              </div>
              <div className={styles.about}>
                <div className={styles.type}>{el.type}</div>
                <div className={styles.info}>
                  <span className={styles.date}>{el.date}</span>
                  <div className={styles.ellipse}></div>
                  <span className={styles.client} title={width > 539 ? el.client : ''}>
                    {el.type == 'deposit' ? t('From') : t('To')}: {el.client?.slice(0, 4)}…
                    {el.client?.slice(-2)}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.sums}>
              <div className={styles.btc}>
                {`${el.value}`.slice(0, 6)} {el.assetSymbol}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
