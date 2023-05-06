import { NavLink } from 'react-router-dom';
import useLocalStorage from '../../../../../hooks/useLocalStorage';
import styles from '../HeaderWallet.module.scss';

export default function ExitIcon() {
  function handleExitClick() {
    try {
      window.localStorage.removeItem('wallet');
      window.localStorage.removeItem('assets');
    } catch (e) {}
  }

  return (
    <NavLink to="/">
      <button className={styles.leftLink} onClick={handleExitClick}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 12H3.62"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
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
