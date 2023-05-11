import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from '../HeaderWallet.module.scss';

export default function TransactIcon() {
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
            d="M20 13.5V3C20 2.44772 19.5523 2 19 2H5C4.44772 2 4 2.44772 4 3V21C4 21.5523 4.44772 22 5 22H10.5"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 6L15.5 6"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 10L15.5 10"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 14H11.5"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.5 22L17.7678 20.2678M17.7678 20.2678C18.2202 19.8154 18.5 19.1904 18.5 18.5C18.5 17.1193 17.3807 16 16 16C14.6193 16 13.5 17.1193 13.5 18.5C13.5 19.8807 14.6193 21 16 21C16.6904 21 17.3154 20.7202 17.7678 20.2678Z"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </NavLink>
  );
}
