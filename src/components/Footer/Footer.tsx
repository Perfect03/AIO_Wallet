import { Link } from 'react-router-dom';
import logo from '../../assets/logo__header.svg';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <img src={logo} alt="AIO" />
        <ul>
          <li>
            <Link to="/" className={styles.active}>
              Главная
            </Link>
          </li>
          <li>
            <Link to="/">Наши преимущества</Link>
          </li>
          <li>
            <Link to="/">Нейросети</Link>
          </li>
          <li>
            <Link to="/">Дорожная карта</Link>
          </li>
          <li>
            <Link to="/">Токеномика</Link>
          </li>
          <li>
            <Link to="/">Распределение</Link>
          </li>
        </ul>
        <button className={styles.button}>AIO-Wallet</button>
      </div>
    </footer>
  );
};

export default Footer;
