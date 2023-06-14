import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../HeaderWallet.module.scss';
import { AppState, changeWallet, walletPart } from '../../../../../store';
import { NavLink } from 'react-router-dom';

export default function SwapIcon() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const walletWindow = useSelector((state: { assets: AppState }) => state.assets.wallet);

  return (
    <button
      className={`${styles.leftLink} ${walletWindow == 'swap' ? styles.active : ''}`}
      onClick={() => {
        const link = window.location.href;
        if (!link.includes('swap')) {
          console.log(link);
          console.log(window.location);
          console.log(window.location.href);
          if (link[link.length - 1] !== '/') window.location.href += '/swap';
          else window.location.href += 'swap';
        }
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="6.85716"
          cy="6.85728"
          r="3.42857"
          stroke="url(#paint0_linear_713_868)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="17.1429"
          cy="17.1429"
          r="3.42857"
          stroke="url(#paint1_linear_713_868)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.0005 22C6.47764 22 2.00049 17.5228 2.00049 12L5.33382 13.6667"
          stroke="url(#paint2_linear_713_868)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.0005 2C17.5233 2 22.0005 6.47715 22.0005 12L18.6672 10.3333"
          stroke="url(#paint3_linear_713_868)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_713_868"
            x1="3.42859"
            y1="6.85728"
            x2="10.2857"
            y2="6.85728"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
            <stop className={styles.stop2} offset="1" stopColor="rgba(122, 123, 124, 1)" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_713_868"
            x1="13.7144"
            y1="17.1429"
            x2="20.5715"
            y2="17.1429"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
            <stop className={styles.stop2} offset="1" stopColor="rgba(122, 123, 124, 1)" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_713_868"
            x1="2.00049"
            y1="17"
            x2="12.0005"
            y2="17"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
            <stop className={styles.stop2} offset="1" stopColor="rgba(122, 123, 124, 1)" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_713_868"
            x1="12.0005"
            y1="7"
            x2="22.0005"
            y2="7"
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
