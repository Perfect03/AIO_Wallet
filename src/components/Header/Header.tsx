import styles from './Header.module.scss';
import logo from '../../assets/logo__header.svg';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [scroll, setScroll] = React.useState(0);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header className={scroll > window.innerHeight + 5 ? styles.sticky : ''}>
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
        <div className={styles.right}>
          <button className={styles.button}>AIO-Wallet</button>
          <div className={styles.langs}>
            <span>RU</span>
            <span> / </span>
            <span>EN</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
