import styles from './Developments.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

const Developments = () => {
  const { t } = useTranslation();

  const settings = {
    className: styles.active,
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  return (
    <div className={styles.developments}>
      <Slider {...settings}>
        <div className={styles.developmentWrapper}>
          <div className={styles.development}>
            <div className={styles.content}>
              <div className={styles.describe}>
                <h1>AIO-Chat</h1>
                <div className={styles.about}>{t('AIO-Chat')}</div>
              </div>
              <button className={styles.to}>AIO-Chat</button>
            </div>
            <div className={styles.ellipse}></div>
          </div>
        </div>
        <div className={styles.developmentWrapper}>
          <div className={styles.development}>
            <div className={styles.content}>
              <div className={styles.describe}>
                <h1>AIO-Wallet</h1>
                <div className={styles.about}>{t('AIO-Wallet')}</div>
              </div>
              <button className={styles.to}>AIO-Wallet</button>
            </div>
            <div className={styles.ellipse}></div>
          </div>
        </div>
        <div className={styles.developmentWrapper}>
          <div className={styles.development}>
            <div className={styles.content}>
              <div className={styles.describe}>
                <h1>AIO-Invest</h1>
                <div className={styles.about}>{t('AIO-Invest')}</div>
              </div>
              <button className={styles.to}>AIO-Invest</button>
            </div>
            <div className={styles.ellipse}></div>
          </div>
        </div>
        <div className={styles.developmentWrapper}>
          <div className={styles.development}>
            <div className={styles.content}>
              <div className={styles.describe}>
                <h1>AIO-Trade</h1>
                <div className={styles.about}>{t('AIO-Trade')}</div>
              </div>
              <button className={styles.to}>AIO-Trade</button>
            </div>
            <div className={styles.ellipse}></div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Developments;
