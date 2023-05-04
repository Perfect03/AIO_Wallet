import { NavLink } from 'react-router-dom';
import styles from '../HeaderWallet.module.scss';

export default function SwapIcon() {
  return (
    <NavLink to="/">
      <button className={styles.leftLink}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.28 8.45001L19 4.72998L15.28 1.01001"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 4.72998H19"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.71997 11.55L1 15.2701L4.71997 18.9901"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 15.27H1"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_422_3"
              x1="2"
              y1="12.0036"
              x2="22"
              y2="12.0036"
              gradientUnits="userSpaceOnUse"
            >
              <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
              <stop className={styles.stop2} offset="1" stopColor="rgba(122, 123, 124, 1)" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_422_1"
              x1="12"
              y1="16.49"
              x2="13"
              y2="16.49"
              gradientUnits="userSpaceOnUse"
            >
              <stop className={styles.stop1} stopColor="rgba(122, 123, 124, 1)" />
              <stop className={styles.stop2} offset="1" stopColor="rgba(122, 123, 124, 1)" />
            </linearGradient>
          </defs>
        </svg>
      </button>
    </NavLink>
  );
}
