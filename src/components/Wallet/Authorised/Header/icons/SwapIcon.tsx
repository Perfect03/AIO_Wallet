import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from '../HeaderWallet.module.scss';

export default function SwapIcon() {
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
          <circle
            cx="6.85716"
            cy="6.85728"
            r="3.42857"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="17.1429"
            cy="17.1429"
            r="3.42857"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.0005 22C6.47764 22 2.00049 17.5228 2.00049 12L5.33382 13.6667"
            stroke="#7A7B7C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.0005 2C17.5233 2 22.0005 6.47715 22.0005 12L18.6672 10.3333"
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
