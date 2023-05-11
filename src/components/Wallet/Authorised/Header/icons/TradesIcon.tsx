import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from '../HeaderWallet.module.scss';

export default function TradesIcon() {
  const { t } = useTranslation();

  return (
    <NavLink to=".">
      <button
        className={styles.leftLink}
        onClick={() => {
          toast['info'](t('In development'));
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
            d="M6 6.25V8.25"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 12V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H12"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 6.25V8.25"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 16V18"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 16V18"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 7.25H18"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12H22"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.56 20.33C21 21.3 19.95 21.95 18.75 21.95C16.96 21.95 15.86 20.15 15.86 20.15M15.93 17.09C16.49 16.11 17.54 15.46 18.75 15.46C20.92 15.46 22 17.26 22 17.26M22 15.25V17.25H20M17.86 20.14H15.86V22"
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
