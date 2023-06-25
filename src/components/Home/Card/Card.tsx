import styles from './Card.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

const Card = () => {
  const { t } = useTranslation();

  const settings = {
    className: styles.active,
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  const [phase, setPhase] = useState(2); // УКАЗАНИЕ ТЕКУЩЕЙ ФАЗЫ, НУМЕРАЦИЯ С НУЛЯ
  return (
    <div className={styles.card__container}>
      <Slider {...settings}>
        <div className={styles.item}>
          <h1 className={styles.number}>01</h1>
          <div className={`${styles.border} ${phase === 0 ? styles.active : ''}`}></div>
          <div className={styles.title}>{t('Phase')} I</div>
          <ul className={`${styles.list} ${phase === 0 ? styles.active : ''}`}>
            <li>{t('Phase1_1')}</li>
            <li>{t('Phase1_2')}</li>
            <li>{t('Phase1_3')}</li>
            <li>{t('Phase1_4')}</li>
            <li>{t('Phase1_5')}</li>
            <li>{t('Phase1_6')}</li>
            <li>{t('Phase1_7')}</li>
            <li>{t('Phase1_8')}</li>
          </ul>
        </div>
        <div className={styles.item}>
          <h1 className={styles.number}>02</h1>
          <div className={`${styles.border} ${phase === 1 ? styles.active : ''}`}></div>
          <div className={styles.title}>{t('Phase')} II</div>
          <ul className={`${styles.list} ${phase === 1 ? styles.active : ''}`}>
            <li>{t('Phase2_1')}</li>
            <li>{t('Phase2_2')}</li>
            <li>{t('Phase2_3')}</li>
            <li>{t('Phase2_4')}</li>
            <li>{t('Phase2_5')}</li>
          </ul>
        </div>
        <div className={styles.item}>
          <h1 className={styles.number}>03</h1>
          <div className={`${styles.border} ${phase === 2 ? styles.active : ''}`}></div>
          <div className={styles.title}>{t('Phase')} III</div>
          <ul className={`${styles.list} ${phase === 2 ? styles.active : ''}`}>
            <li>{t('Phase3_1')}</li>
            <li>{t('Phase3_2')}</li>
            <li>{t('Phase3_3')}</li>
            <li>{t('Phase3_4')}</li>
            <li>{t('Phase3_5')}</li>
          </ul>
        </div>
        <div className={styles.item}>
          <h1 className={styles.number}>04</h1>
          <div className={`${styles.border} ${phase === 3 ? styles.active : ''}`}></div>
          <div className={styles.title}>{t('Phase')} IV</div>
          <ul className={`${styles.list} ${phase === 3 ? styles.active : ''}`}>
            <li>{t('Phase4_1')}</li>
            <li>{t('Phase4_2')}</li>
            <li>{t('Phase4_3')}</li>
            <li>{t('Phase4_4')}</li>
          </ul>
        </div>
        <div className={styles.item}>
          <h1 className={styles.number}>05</h1>
          <div className={`${styles.border} ${phase === 3 ? styles.active : ''}`}></div>
          <div className={styles.title}>{t('Phase')} V</div>
          <ul className={`${styles.list} ${phase === 3 ? styles.active : ''}`}>
            <li>{t('Phase5_1')}</li>
            <li>{t('Phase5_2')}</li>
            <li>{t('Phase5_3')}</li>
            <li>{t('Phase5_4')}</li>
            <li>{t('Phase5_5')}</li>
            <li>{t('Phase5_6')}</li>
            <li>{t('Phase5_7')}</li>
            <li>{t('Phase5_8')}</li>
          </ul>
        </div>
      </Slider>
    </div>
  );
};

export default Card;
