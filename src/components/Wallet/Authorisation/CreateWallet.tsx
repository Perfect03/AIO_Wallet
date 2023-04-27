import styles from './CreateWallet.module.scss';
import copy from '../../../assets/copy.svg';
import Header from './Header/Header';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  _generateMnemonic,
  _getHdRootKey,
  _generatePrivateKey,
  _getPublicKey,
  _getEthAddress,
  _store,
  main,
} from '../../../generateseed';

import { toast } from 'react-toastify';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Context, ContextType } from '../../../languageContext';
import Wallet from '../Authorised/Wallet';

const CreateWallet = () => {
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
  };
  const words = [
    '1addle',
    '2addle',
    '3addle',
    '4addle',
    '5addle',
    '6addle',
    '7addle',
    '8addle',
    '9addle',
    '10addle',
    '11addle',
    '12addle',
  ];
  // main()
  //   .then(() => process.exit(0))
  //   .catch((error) => {
  //     console.error(error);
  //     process.exit(1);
  //   });
  //console.log(word);
  return (
    <>
      {step < 5 ? (
        <>
          <Header></Header>
          <main>
            {' '}
            <div className={styles.container}>
              <div className={styles.ellipse}></div>
              <div className={styles.content}>
                {step == 1 && (
                  <div
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
                  </div>
                )}
                {step == 2 && (
                  <div
                    className={`${styles.info} 
            ${animation == 'middle' && styles.animation} 
            ${animation == 'end' && styles.animation_start} 
            ${animation == 'start' && styles.animation_end}`}
                  >
                    <h1>{t('Your secret phrase')}</h1>
                    <div className={styles.infoText}>{t('All neurals in AIO')}</div>
                    <div className={styles.buttons}>
                      <button
                        className={styles.understand}
                        onClick={(event) => {
                          event.preventDefault();
                          setAnimation('start');
                          changeStep(3);
                        }}
                      >
                        {t('I understand')}
                      </button>
                    </div>
                  </div>
                )}
                {step == 3 && (
                  <div
                    className={`${styles.info} 
            ${animation == 'middle' && styles.animation} 
            ${animation == 'start' && styles.animation_start} 
            ${animation == 'end' && styles.animation_end}`}
                  >
                    <h1>{t('Your secret phrase')}</h1>
                    <div className={styles.infoTexts}>
                      <div className={styles.infoText}>{t('Write these words')}</div>
                      <div className={styles.infoText}>{t('Select seed language')}</div>
                    </div>
                    <div className={styles.buttons}>
                      <button
                        className={styles.buttonLanguage}
                        onClick={(event) => {
                          event.preventDefault();
                          setAnimation('end');
                          changeStep(4);
                        }}
                      >
                        RU
                      </button>
                      <button
                        className={styles.buttonLanguage}
                        onClick={(event) => {
                          event.preventDefault();
                          setAnimation('end');
                          changeStep(4);
                        }}
                      >
                        EN
                      </button>
                    </div>
                  </div>
                )}
                {step == 4 && (
                  <div
                    className={`${styles.info} ${styles.infoWords} 
            ${animation == 'middle' && styles.animation} 
            ${animation == 'end' && styles.animation_start} 
            ${animation == 'start' && styles.animation_end}`}
                  >
                    <h1>{t('Your secret phrase')}</h1>
                    <div className={styles.infoText}>{t('Write these words')}</div>
                    <div className={styles.words}>
                      {words.map((el, index) => (
                        <div key={index} className={styles.word}>
                          <div className={styles.number}>{index + 1}</div>
                          <div>{el}</div>
                        </div>
                      ))}
                    </div>
                    <div className={styles.infoTexts}>
                      <div className={styles.infoText}>{t('SeedAbout1')}</div>
                      <div className={styles.infoText}>{t('SeedAbout2')}</div>
                    </div>
                    <div className={styles.buttons}>
                      <button
                        className={styles.understand}
                        onClick={(event) => {
                          event.preventDefault();
                          setAnimation('end');
                          changeStep(5);
                        }}
                      >
                        {t('I understand')}
                      </button>
                      <button
                        className={styles.copy}
                        onClick={() => {
                          navigator.clipboard
                            .writeText(words.join(' '))
                            .then(() => {
                              toast['success'](t('Copy seed'));
                            })
                            .catch((err) => {
                              toast['error'](t('Copy seed error'));
                            });
                        }}
                      >
                        <img src={copy} alt="" />
                      </button>
                    </div>
                  </div>
                )}
                <div className={styles.restore}>{t('Restore from 12-word seed')}</div>
              </div>
              <div className={styles.ellipse}></div>
            </div>
          </main>
        </>
      ) : (
        <Wallet></Wallet>
      )}
    </>
  );
};

export default CreateWallet;
