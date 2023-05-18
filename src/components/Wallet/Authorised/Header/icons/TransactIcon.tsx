import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../HeaderWallet.module.scss';
import { AppState, changeWallet, walletPart } from '../../../store';

export default function TransactIcon() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const walletWindow = useSelector((state: { assets: AppState }) => state.assets.wallet);

  return (
    <button
      className={`${styles.leftLink} ${walletWindow == 'transactions' ? styles.active : ''}`}
      onClick={() => {
        dispatch(changeWallet('transactions'));
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 13.5V3C20 2.44772 19.5523 2 19 2H5C4.44772 2 4 2.44772 4 3V21C4 21.5523 4.44772 22 5 22H10.5"
          stroke="url(#paint0_linear_713_861)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 6L15.5 6"
          stroke="url(#paint1_linear_713_861)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 10L15.5 10"
          stroke="url(#paint2_linear_713_861)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 14H11.5"
          stroke="url(#paint3_linear_713_861)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.5 22L17.7678 20.2678M17.7678 20.2678C18.2202 19.8154 18.5 19.1904 18.5 18.5C18.5 17.1193 17.3807 16 16 16C14.6193 16 13.5 17.1193 13.5 18.5C13.5 19.8807 14.6193 21 16 21C16.6904 21 17.3154 20.7202 17.7678 20.2678Z"
          stroke="url(#paint4_linear_713_861)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_713_861"
            x1="4"
            y1="12"
            x2="20"
            y2="12"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
            <stop className={styles.stop2} offset="1" stopColor="rgba(122, 123, 124, 1)" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_713_861"
            x1="8.5"
            y1="6.5"
            x2="15.5"
            y2="6.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
            <stop className={styles.stop2} offset="1" stopColor="rgba(122, 123, 124, 1)" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_713_861"
            x1="8.5"
            y1="10.5"
            x2="15.5"
            y2="10.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
            <stop className={styles.stop2} offset="1" stopColor="rgba(122, 123, 124, 1)" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_713_861"
            x1="8.5"
            y1="14.5"
            x2="11.5"
            y2="14.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
            <stop className={styles.stop2} offset="1" stopColor="rgba(122, 123, 124, 1)" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_713_861"
            x1="13.5"
            y1="19"
            x2="19.5"
            y2="19"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
            <stop className={styles.stop2} offset="1" stopColor="rgba(122, 123, 124, 1)" />
          </linearGradient>
        </defs>
      </svg>
    </button>
  );
}
