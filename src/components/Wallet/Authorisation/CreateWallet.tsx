import styles from './CreateWallet.module.scss';
import copy from '../../../assets/copy.svg';
import back from '../../../assets/back.svg';
import Header from './Header/Header';
import { useEffect, useState } from 'react';
import { getWallet, TWallet } from '../../../scripts/getWallet';
import { useTranslation } from 'react-i18next';
import SeedInput from './SeedInput';
import { toast } from 'react-toastify';
import useLocalStorage from '../../../hooks/useLocalStorage';
import Wallet from '../Authorised/Wallet';
import getRandomInt from '../../../scripts/getRandomInt';
import { Wallet as typeWallet } from 'ethers';

const CreateWallet = () => {
  const { t } = useTranslation();
  const [animation, setAnimation] = useState('start');
  const [step, setStep] = useState(1);
  const [walletData, setWalletData] = useLocalStorage<TWallet>('wallet', {
    pk: '',
    addr: '',
  });
  const [mnemonic, setMnemonic] = useState('');
  const [mnenonicCheck, setMnemonicCheck] = useState<string[]>([]);
  const [checkValues, setCheckValues] = useState<string[]>([]);
  const [valid, setValid] = useState(true);
  const [wallet, setWallet] = useState<typeWallet>();
  const [checkIndices, setCheckIndices] = useState<number[]>([]);

  useEffect(() => {
    setAnimation('middle');

    if (walletData.pk) {
      setStep(5);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setValid(true), 2000);
    return () => clearTimeout(timer);
  }, [valid]);

  const changeStep = (i: number) => {
    setTimeout(() => {
      setStep(i);
      setAnimation('middle');

      if (i === 2) {
        const newWallet = getWallet();
        setWallet(newWallet);
        setCheckValues(['', '', '']);
        setMnemonic(newWallet.mnemonic.phrase);
      }
      if (i === 3) {
        let index1, index2, index3;
        while (true) {
          index1 = getRandomInt(1, 13);
          index2 = getRandomInt(1, 13);
          index3 = getRandomInt(1, 13);
          if (index1 !== index2 && index2 !== index3) break;
        }

        const splited = mnemonic.split(' ');

        setCheckIndices([index1, index2, index3]);
        setMnemonicCheck([splited[index1 - 1], splited[index2 - 1], splited[index3 - 1]]);
      }
    }, 300);
  };

  function handleCopyClick() {
    navigator.clipboard
      .writeText(mnemonic)
      .then(() => {
        toast['success'](t('Copy seed'));
      })
      .catch(() => {
        toast['error'](t('Copy seed error'));
      });
  }

  function handleInput(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    console.log(checkValues);
    console.log(e.target.value);
    const newCheck = [...checkValues];
    newCheck[index] = e.target.value.toLowerCase();
    setCheckValues(newCheck);
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == 'Enter') {
      document.getElementById(`input-check-${index + 1}`)?.focus();
    }
  }

  function handleSubmitClick() {
    let isValid = true;
    console.log(mnenonicCheck, checkValues);
    for (let i = 0; i < mnenonicCheck.length; i++) {
      if (mnenonicCheck[i] !== checkValues[i]) isValid = false;
    }
    setValid(isValid);

    if (isValid) {
      setWalletData({
        pk: wallet!.privateKey,
        addr: wallet!.address,
      });
      setStep(5);
    }
  }

  return (
    <>
      {step < 5 ? (
        <>
          <Header />
          <main>
            <div className={styles.container}>
              <div className={styles.ellipse}></div>
              <div className={styles.content}>
                {step === 1 && (
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
                {step === 2 && (
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
                          changeStep(3);
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
                {step === 3 && (
                  <div
                    className={`${styles.info} 
          ${animation == 'middle' && styles.animation} 
          ${animation == 'end' && styles.animation_start} 
          ${animation == 'start' && styles.animation_end}`}
                  >
                    <button
                      className={styles.back}
                      onClick={() => {
                        setAnimation('end');
                        changeStep(2);
                      }}
                    >
                      <img src={back} alt="" />
                    </button>
                    <h1>{t('Seed phrase check')}</h1>
                    <div className={styles.words}>
                      {Array(3)
                        .fill('')
                        .map((el, index) => (
                          <div className={styles.word} key={index}>
                            <div className={styles.number}>{checkIndices[index]}</div>
                            <input
                              id={`input-check-${index}`}
                              className={styles.inputWord}
                              type="text"
                              value={checkValues[index]}
                              onChange={(e) => handleInput(index, e)}
                              onKeyDown={(e) => handleKeyDown(index, e)}
                            />
                          </div>
                        ))}
                    </div>
                    <div className={styles.buttons}>
                      <button className={styles.understand} onClick={handleSubmitClick}>
                        {valid ? t('Proceed') : t('Incorrect')}
                      </button>
                    </div>
                  </div>
                )}
                {step === 4 && (
                  <div
                    className={`${styles.info} 
            ${animation == 'middle' && styles.animation} 
            ${animation == 'end' && styles.animation_start} 
            ${animation == 'start' && styles.animation_end}`}
                  >
                    <button
                      className={styles.back}
                      onClick={() => {
                        setAnimation('end');
                        changeStep(1);
                      }}
                    >
                      <img src={back} alt="" />
                    </button>
                    <h1>{t('Enter your seed phrase')}</h1>
                    <SeedInput setAnimation={setAnimation} setStep={setStep} />
                  </div>
                )}
                {step !== 4 && step !== 3 && (
                  <a
                    className={styles.restore}
                    onClick={() => {
                      changeStep(4);
                      setAnimation('end');
                    }}
                  >
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
