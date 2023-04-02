import styles from './Header.module.scss';
import logo from '../../assets/logo__header.svg';
import React from 'react';

const Header = () => {
  return (
  <header>
    <div className={styles.container}>
    <img src={logo} alt="AIO" />
    <ul>
      <li>Главная</li>
      <li>Наши преимущества</li>
      <li>Нейросети</li>
      <li>Дорожная карта</li>
      <li>Токеномика</li>
      <li>Распределение</li>
    </ul>
    <div className={styles.right}>
    <button className={styles.button}>AIO-Wallet</button>
    <div className={styles.langs}>
      <span>RU</span><span> / </span><span>EN</span>
    </div>
    </div>
    </div>
  </header>
  );
};

export default Header;
