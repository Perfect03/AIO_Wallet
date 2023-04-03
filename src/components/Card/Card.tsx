import styles from './Card.module.scss';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { useState } from 'react';

const Card = () => {
  const settings = {
      className: styles.active,
      dots: false,
      infinite: false,
      speed: 50,
      slidesToShow: 4,
      slidesToScroll: 0.25,
      initialSlide: 0,
      afterChange: (index: number) => {
        setTimeout(() => {
          setPhase(index*4)
        });
      }
  };
  const [phase, setPhase] = useState(0);
  return (
    <div className={styles.card__container}>
    <Slider {...settings}>
    <div className={styles.item}>
      <h1 className={styles.number}>01</h1>
      <div className={`${styles.border} ${phase === 0 ? styles.active : ''}`}></div>
      <div className={styles.title}>Фаза I</div>
      <ul className={`${styles.list} ${phase === 0 ? styles.active : ''}`}>
        <li>Создание первоначальной концепции</li>
        <li>Разработка алгоритма AIO-Chat / AIO-Wallet</li>
        <li>Тестирование AIO-Chat / AIO-Wallet</li>
        <li>Запуск AIO-Chat в виде Telegram бота</li>
        <li>Создание социальных сетей</li>
        <li>Разработка веб-сайта</li>
        <li>Запуск масштабного конкурса для ранних участников AIO</li>
      </ul>
      </div>
      <div className={styles.item}>
      <h1 className={styles.number}>02</h1>
      <div className={`${styles.border} ${phase === 1 ? styles.active : ''}`}></div>
      <div className={styles.title}>Фаза II</div>
      <ul className={`${styles.list} ${phase === 1 ? styles.active : ''}`}>
        <li>Запуск AIO-Wallet в сети BSC в виде DAPP</li>
        <li>Запуск амбассадор программ</li>
        <li>Разработка алгоритма AIO-Invest</li>
        <li>Тестирование AIO-Invest</li>
        <li>Запуск AIO-Invest Beta в виде Telegram бота</li>
        <li>Вторая волна рекламы</li>
        <li>Анонс пресейла токена AIO</li>
      </ul>
      </div>
      <div className={styles.item}>
      <h1 className={styles.number}>03</h1>
      <div className={`${styles.border} ${phase === 2 ? styles.active : ''}`}></div>
      <div className={styles.title}>Фаза III</div>
      <ul className={`${styles.list} ${phase === 2 ? styles.active : ''}`}>
        <li>Добавление поддержки EVM сетей <br /> в AIO-Wallet</li>
        <li>Старт пресейла токена AIO</li>
        <li>Третья волна рекламы</li>
        <li>Добавление AIO-Chat в DAPP</li>
      </ul>
      </div>
      <div className={styles.item}>
      <h1 className={styles.number}>04</h1>
      <div className={`${styles.border} ${phase === 3 ? styles.active : ''}`}></div>
      <div className={styles.title}>Фаза IV</div>
      <ul className={`${styles.list} ${phase === 3 ? styles.active : ''}`}>
        <li>Запуск токена AIO</li>
        <li>Листинг токена AIO на DEX биржах</li>
        <li>Создание AIO DAO</li>
        <li>Четвертая волна рекламы</li>
        <li>Создание расширения AIO-Wallet</li>
      </ul>
      </div>
    <div className={styles.item}>
      <h1 className={styles.number}>05</h1>
      <div className={`${styles.border} ${phase === 4 ? styles.active : ''}`}></div>
      <div className={styles.title}>Фаза V</div>
      <ul className={`${styles.list} ${phase === 4 ? styles.active : ''}`}>
      <li>Запуск токена AIO</li>
        <li>Листинг токена AIO на DEX биржах</li>
        <li>Создание AIO DAO</li>
        <li>Четвертая волна рекламы</li>
        <li>Создание расширения AIO-Wallet</li>
      </ul>
      </div>
  </Slider>
  </div>
  );
};

export default Card;
