import styles from './Logo.module.scss';
import logo from '../../assets/logo__main.svg';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <div className={styles.line1}>
        <div className={styles.all}>All</div>
        <div className={styles.one}>One</div>
      </div>
      <div className={styles.line2}>
        <img src={logo} alt="AIO" />
        <div className={styles.one}>One</div>
      </div>
      <div className={styles.line3}>
        <div className={styles.in}>In</div>
      </div>
    </div>
  );
};

export default Logo;
