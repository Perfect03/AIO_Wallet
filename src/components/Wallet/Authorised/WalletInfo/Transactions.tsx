import styles from './WalletInfo.module.scss';
import deposit from '../../../../assets/deposit.svg';
import withdraw from '../../../../assets/withdraw.svg';
import { useTranslation } from 'react-i18next';
import useResize from '../../../../hooks/use-resize';
import useLoadTransactions from '../../../../hooks/useLoadTransactions';
import { Triangle } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

export default function Transactions(props: { isLoading: boolean }) {
  const { t } = useTranslation();
  const width = useResize();
  const transactions = useSelector((state: { assets: AppState }) => state.assets.transactions);

  return (
    <>
      <div className={styles.describe}>{t('Deposits and withdrawals of tokens and BNB')}</div>
      <div className={styles.transactions}>
        {props.isLoading && (
          <div className={styles.loader}>
            <Triangle
              height="80"
              width="80"
              color="#B35BCE"
              ariaLabel="triangle-loading"
              visible={true}
            />
          </div>
        )}
        {!props.isLoading && !transactions.length ? (
          <div className={styles.sign}>{t('No transactions found')}</div>
        ) : (
          <></>
        )}
        {transactions.map((el, index) => (
          <div
            className={styles.transaction}
            key={index}
            title={
              width < 540
                ? `${el.transactionType == 'deposit' ? t('From') : t('To')}: ${el.client}`
                : ''
            }
          >
            <div className={styles.left}>
              <div className={styles.icon}>
                <img src={el.transactionType == 'withdraw' ? withdraw : deposit} alt="" />
              </div>
              <div className={styles.about}>
                <div className={styles.type}>{el.transactionType}</div>
                <div className={styles.info}>
                  <span className={styles.date}>{el.date}</span>
                  <div className={styles.ellipse}></div>
                  <span className={styles.client} title={width > 539 ? el.client : ''}>
                    {el.transactionType == 'deposit' ? t('From') : t('To')}:{' '}
                    {el.client?.slice(0, 6)}…{el.client?.slice(-4)}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.sums}>
              <div className={styles.btc}>
                {`${el.value}`.slice(0, 6)} {el.symbol}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
