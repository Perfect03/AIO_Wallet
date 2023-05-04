import styles from './CreateWallet.module.scss';
import copy from '../../../assets/copy.svg';
import Header from './Header/Header';
import { useContext, useEffect, useState } from 'react';
import { getWallet, TWallet } from '../../../scripts/getWallet';
import { useTranslation } from 'react-i18next';
import SeedInput from './SeedInput';
import { toast } from 'react-toastify';
import useLocalStorage from '../../../hooks/uselocalStorage';
import { Context, ContextType } from '../../../languageContext';
import Wallet from '../Authorised/Wallet';
import { ethers } from 'ethers';

const CreateWallet = () => {
  const { t } = useTranslation();
  const { language } = useContext(Context) as ContextType;
  const [animation, setAnimation] = useState('start');
  const [step, setStep] = useState(1);
  const [walletData, setWalletData] = useLocalStorage<TWallet>('wallet', {
    pk: '',
    addr: '',
  });
  const [mnemonic, setMnemonic] = useState('');

  useEffect(() => {
    setAnimation('middle');

    if (walletData.pk) {
      setStep(6);
    }
  }, []);

  const changeStep = (i: number) => {
    setTimeout(() => {
      setStep(i);
      setAnimation('middle');

      if (i === 4) {
        const newWallet = getWallet();
        setWalletData({
          pk: newWallet.privateKey,
          addr: newWallet.address,
        });
        setMnemonic(newWallet.mnemonic.phrase);
      }
    }, 300);
  };

  function handleCopyClick() {
    const stringMnemonic = new ethers.Wallet(walletData.pk).mnemonic.phrase;
    navigator.clipboard
      .writeText(stringMnemonic)
      .then(() => {
        toast['success'](t('Copy seed'));
      })
      .catch((err) => {
        toast['error'](t('Copy seed error'));
      });
  }

  return (
    <>
      {step < 6 ? (
        <>
          <Header />
          <main>
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
                      {t('Generate seed phrase')}
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
                    <h1>{t('Your seed phrase')}</h1>
                    <div className={styles.infoText}>{t('Write down this 12-word')}</div>
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
                    <h1>{t('Your seed phrase')}</h1>
                    <div className={styles.infoText}>{t('Write these words')}</div>
                    <div className={styles.buttons}>
                      <button
                        className={styles.understand}
                        onClick={(event) => {
                          event.preventDefault();
                          setAnimation('end');
                          changeStep(4);
                        }}
                      >
                        {t('Next')}
                      </button>
                    </div>
                  </div>
                )}
                {step == 4 && (
                  <div
                    className={`${styles.info} 
            ${animation == 'middle' && styles.animation} 
            ${animation == 'end' && styles.animation_start} 
            ${animation == 'start' && styles.animation_end}`}
                  >
                    <h1>{t('Your seed phrase')}</h1>
                    <div className={styles.infoText}>{t('Write these words')}</div>
                    <div className={styles.words}>
                      {mnemonic?.split(' ').map((el, index) => (
                        <div className={styles.word} key={index}>
                          <div className={styles.number}>{index + 1}</div>
                          <div>{el}</div>
                        </div>
                      ))}
                    </div>
                    <div className={styles.buttons}>
                      <button
                        className={styles.understand}
                        onClick={(event) => {
                          event.preventDefault();
                          setAnimation('end');
                          changeStep(6);
                        }}
                      >
                        {t('Next')}
                      </button>
                      <button className={styles.copy} onClick={handleCopyClick}>
                        <img src={copy} alt="" />
                      </button>
                    </div>
                  </div>
                )}
                {step === 5 && (
                  <div
                    className={`${styles.info} 
            ${animation == 'middle' && styles.animation} 
            ${animation == 'end' && styles.animation_start} 
            ${animation == 'start' && styles.animation_end}`}
                  >
                    <h1>{t('Enter Your seed phrase')}</h1>
                    <SeedInput setAnimation={setAnimation} setStep={setStep} />
                  </div>
                )}
                {step !== 5 && (
                  <a className={styles.restore} onClick={() => changeStep(5)}>
                    {t('Restore from 12-word seed')}
                  </a>
                )}
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
