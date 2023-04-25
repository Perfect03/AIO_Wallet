import styles from './Main.module.scss';
import copy from '../../../assets/copy.svg';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Context, ContextType } from '../../../languageContext';

const Main = () => {
  const { t } = useTranslation();
  const { language } = useContext(Context) as ContextType;
  const [animation, setAnimation] = useState('start');
  const [step, setStep] = useState(1);
  useEffect(() => {
    setAnimation('middle');
  }, []);
  const changeStep = (i: number) => {
    setTimeout(() => {
      setStep(i);
      setAnimation('middle');
    }, 300);
  }
  const words = ["1addle", "2addle", "3addle", "4addle", "5addle", "6addle", "7addle", "8addle", "9addle", "10addle", "11addle", "12addle", ];
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.ellipse}></div>
        <div className={styles.content}>
          {step == 1 && <div
            className={`${styles.create} 
            ${animation == 'middle' && styles.animation} 
            ${animation == 'start' && styles.animation_start} 
            ${animation == 'end' && styles.animation_end}`}
          >
            <h1>{t('Create Wallet')}</h1>
            <button
              onClick={(event) => {
                event.preventDefault();
                setAnimation('end');
                changeStep(2);
              }}
            >
              {t('Save secret phrase')}
            </button>
          </div>}
          {step == 2 && <div
            className={`${styles.info} 
            ${animation == 'middle' && styles.animation} 
            ${animation == 'end' && styles.animation_start} 
            ${animation == 'start' && styles.animation_end}`}
          >
            <h1>{t('Your secret phrase')}</h1>
            <div className={styles.infoText}>
            {t('All neurals in AIO')}
              </div>
              <div className={styles.buttons}>
            <button className={styles.understand}
              onClick={(event) => {
                event.preventDefault();
                setAnimation('start');
                changeStep(3);
              }}
            >
              {t('I understand')}
            </button>
            </div>
          </div>}
          {step == 3 && <div
            className={`${styles.info} 
            ${animation == 'middle' && styles.animation} 
            ${animation == 'start' && styles.animation_start} 
            ${animation == 'end' && styles.animation_end}`}
          >
            <h1>{t('Your secret phrase')}</h1>
            <div className={styles.infoText}>
            {t('Write these words')}
              </div>
              <div className={styles.buttons}>
            <button className={styles.understand}
              onClick={(event) => {
                event.preventDefault();
                setAnimation('end');
                changeStep(4);
              }}
            >
              {t('I understand')}
            </button>
            </div>
          </div>}
          {step == 4 && <div
            className={`${styles.info} 
            ${animation == 'middle' && styles.animation} 
            ${animation == 'end' && styles.animation_start} 
            ${animation == 'start' && styles.animation_end}`}
          >
            <h1>{t('Your secret phrase')}</h1>
            <div className={styles.infoText}>
            {t('Write these words')}
              </div>
              <div className={styles.words}>
              {words.map((el, index) => 
                <div className={styles.word}>
                  <div className={styles.number}>
                    {index+1}
                  </div>
                  <div>{el}</div>
                </div>
              )}
              </div>
              <div className={styles.buttons}>
            <button className={styles.understand}
              onClick={(event) => {
                event.preventDefault();
                setAnimation('end');
                changeStep(4);
              }}
            >
              {t('I understand')}
            </button>
            <button className={styles.copy}>
              <img src={copy} alt="" />
            </button>
            </div>
          </div>}
          <div className={styles.restore}>{t('Restore from 12-word seed')}</div>
        </div>
        <div className={styles.ellipse}></div>
      </div>
    </main>
  );
};

export default Main;
