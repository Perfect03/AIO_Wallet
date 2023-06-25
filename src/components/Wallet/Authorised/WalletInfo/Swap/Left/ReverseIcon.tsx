import styles from './Left.module.scss';

export default function ReverseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className={styles.to}
        d="M10.1627 12.96L12.9527 15.7499L15.7427 12.96"
        stroke="#7A7B7C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={styles.to}
        d="M12.9526 2.25L12.9526 15.75"
        stroke="#7A7B7C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={styles.from}
        d="M7.83789 5.03998L5.04787 2.25L2.25789 5.03998"
        stroke="#7A7B7C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={styles.from}
        d="M5.04785 15.75L5.04785 2.25"
        stroke="#7A7B7C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
