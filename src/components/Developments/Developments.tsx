import styles from './Developments.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useLocalStorage from '../../hooks/use-localStorage';

const Developments = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useLocalStorage('language', 'en');

  const settings = {
    className: styles.active,
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1.75,
        },
      },
      {
        breakpoint: 1130,
        settings: {
          slidesToShow: 2.25,
          slidesToScroll: 1.375,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1.5,
        },
      },
    ],
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
              <button
                className={styles.to}
                onClick={(event) => {
                  event.preventDefault();
                  language == 'ru'
                    ? window.open('https://forms.gle/5uTAuXWaKX8x6PWt8')
                    : window.open('https://forms.gle/HwWjGgHXbVrtrsLT7');
                }}
              >
                AIO-Chat
              </button>
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
              <button
                className={styles.to}
                onClick={() => {
                  toast['info'](t('In development'));
                }}
              >
                AIO-Wallet
              </button>
            </div>
            <div className={styles.ellipse}></div>
          </div>
        </div>
        <div className={styles.developmentWrapper}>
          <div className={styles.development}>
            <div className={styles.content}>
              <div className={styles.describe}>
                <h1>AIO-Swap</h1>
                <div className={styles.about}>{t('AIO-Swap')}</div>
              </div>
              <button
                className={styles.to}
                onClick={() => {
                  toast['info'](t('In development'));
                }}
              >
                AIO-Swap
              </button>
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
              <button
                className={styles.to}
                onClick={() => {
                  toast['info'](t('In development'));
                }}
              >
                AIO-Invest
              </button>
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
              <button
                className={styles.to}
                onClick={() => {
                  toast['info'](t('In development'));
                }}
              >
                AIO-Trade
              </button>
            </div>
            <div className={styles.ellipse}></div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Developments;
