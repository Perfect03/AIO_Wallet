import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useLocalStorage from '../../../hooks/use-localStorage';
import { TWallet } from '../../../scripts/getWallet';
import restoreWallet from '../../../scripts/restoreWallet';
import styles from './CreateWallet.module.scss';
import { ethers, Wallet } from 'ethers';

export default function SeedInput(props: {
  setAnimation: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [seed, setSeed] = useState<string[]>([]);
  const [valid, setValid] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (!valid) setTimeout(() => setValid(true), 3000);
  }, [valid]);

  const setWallet = useLocalStorage<TWallet>('wallet', {
    pk: '',
    addr: '',
  })[1];

  function handleWordInput(index: number, e: ChangeEvent<HTMLInputElement>) {
    const newSeed = seed;
    newSeed[index] = e.target.value.toLowerCase();
    setSeed(newSeed);
    console.log(newSeed);
  }

  function handleKeyDown(index: number, e: KeyboardEvent) {
    if (e.key == 'Enter') {
      document.getElementById(`input-${index + 1}`)?.focus();
    }
  }

  console.log(seed);

  function handleSubmitClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const wallet = restoreWallet(seed.join(' '));

    if (wallet.address) {
      setWallet({
        pk: wallet.privateKey,
        addr: wallet.address,
      });
      props.setStep(6);
      props.setAnimation('end');
      e.preventDefault();
    } else {
      setValid(false);
    }
  }

  return (
    <>
      <div className={styles.words}>
        {Array(12)
          .fill('')
          .map((el, index) => (
            <div className={styles.word} key={index}>
              <div className={styles.number}>{index + 1}</div>
              <input
                id={`input-${index}`}
                className={styles.inputWord}
                type="text"
                value={seed[index]}
                onChange={(e) => handleWordInput(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            </div>
          ))}
      </div>
      <div className={styles.buttons}>
        <button className={styles.understand} onClick={(e) => handleSubmitClick(e)}>
          {valid ? t('Proceed') : t('Not valid seed phrase!')}
        </button>
      </div>
    </>
  );
}
