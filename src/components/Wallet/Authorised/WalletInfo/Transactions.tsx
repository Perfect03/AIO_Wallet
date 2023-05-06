import styles from './WalletInfo.module.scss';
import deposit from '../../../../assets/deposit.svg';
import withdraw from '../../../../assets/withdraw.svg';
import { useTranslation } from 'react-i18next';
import useResize from '../../../../hooks/use-resize';

export default function Transactions() {
  const { t } = useTranslation();
  const width = useResize();

  const transactions = [
    {
      type: 'withdraw',
      date: 'May 20',
      client: '0x2344543rfref34543v5ersefsdfe23',
      usd: 248.543,
      btc: 0.35432534,
    },
    {
      type: 'deposit',
      date: 'June 21',
      client: '0xfce324c32654tgrewt54525342re3',
      usd: 288.543,
      btc: 0.4324324,
    },
    {
      type: 'withdraw',
      date: 'July 22',
      client: '0xw5234refr2cse123eqwdqw',
      usd: 288.543,
      btc: 0.9758674,
    },
    {
      type: 'deposit',
      date: 'August 23',
      client: '0xfcsdf2c4432rwet4354',
      usd: 111.543,
      btc: 0.3213211114,
    },
    {
      type: 'withdraw',
      date: 'September 24',
      client: 'oxer24325435gfdgf354dds',
      usd: 555.543,
      btc: 0.98888888,
    },
  ];

  return (
    <div className={styles.yourAssets}>
      <h1 className={styles.title}>{t('Transactions')}</h1>
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
                    {el.type == 'deposit' ? t('From') : t('To')}: {el.client.slice(0, 4)}…
                    {el.client.slice(-2)}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.sums}>
              <div className={styles.btc}>{`${el.btc}`.slice(0, 6)} BTC</div>
              <div className={styles.usd}>{`${el.usd}`.slice(0, 6)} USD</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
