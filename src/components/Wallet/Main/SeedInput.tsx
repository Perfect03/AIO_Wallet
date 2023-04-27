import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useLocalStorage from '../../../hooks/use-localStorage';
import restoreWallet from '../../../scripts/restoreWallet';
import styles from './Main.module.scss';

export default function SeedInput(props: {
  setAnimation: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [seed, setSeed] = useState<string[]>([]);
  const [valid, setValid] = useState(true);
  const { t } = useTranslation();

  function handleWordInput(index: number, e: ChangeEvent<HTMLInputElement>) {
    const newSeed = seed;
    newSeed[index] = e.target.value.toLowerCase();
    setSeed(newSeed);
    console.log(index);
  }

  function handleKeyDown(index: number, e: KeyboardEvent) {
    if (e.key == 'Enter') {
      document.getElementById(`input-${index + 1}`)?.focus();
    }
  }

  function handleSubmitClick() {
    const wallet = restoreWallet(seed.join(' '));

    if (wallet) {
      try {
        localStorage.setItem('wallet', JSON.stringify(wallet));
      } catch (error) {}
    } else setValid(false);
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
        <button
          className={styles.understand}
          onClick={(event) => {
            event.preventDefault();
            props.setAnimation('end');
            handleSubmitClick();
            // {...} navigate to wallet page
          }}
        >
          {valid ? t('Proceed') : t('Not valid seed phrase!')}
        </button>
      </div>
    </>
  );
}
