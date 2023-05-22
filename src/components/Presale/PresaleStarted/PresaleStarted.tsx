import styles from './PresaleStarted.module.scss';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';
import RefLink from '../RefLink';
import ConnectButton from '../ConnectButton';
import { ChangeEvent, useEffect, useState } from 'react';
import getPresaleContract from '../../../scripts/quoting/presale/getPresaleContract';
import { BigNumber, ethers } from 'ethers';
import { fromReadableAmount } from '../../../scripts/quoting/libs/conversion';

const PresaleStarted = () => {
  const [nativeValue, setNativeValue] = useState<number>();
  const [aioValue, setAioValue] = useState(0);
  const [supplyLeft, setSupplyLeft] = useState<BigNumber>();
  const [refAddress, setRefAddress] = useState('');
  const { t } = useTranslation();

  const isWalletConnected = useSelector(
    (state: { assets: AppState }) => state.assets.isWaleltConnected
  );

  useEffect(() => {
    (async () => {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop: string) => searchParams.get(prop),
      });

      setRefAddress(params.ref);

      const contract = getPresaleContract();
      const endTime = await contract.END_TIME();
      const supplyLeft = (await contract.amountLeft()).div(10 ** 9);
      setSupplyLeft(supplyLeft);
    })();
  }, []);

  function handleSumInput(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (+e.target.value > 0) {
      setNativeValue(+e.target.value);
      setAioValue(+(+e.target.value / 0.0000125).toFixed(8));
    } else if (+e.target.value === 0) {
      setNativeValue(undefined);
      setAioValue(0);
    } else {
      setNativeValue(0);
      setAioValue(0);
    }
  }

  async function handleBuyClick() {
    const contract = getPresaleContract();

    if (nativeValue !== undefined && nativeValue > 0) {
      if (ethers.utils.isAddress(refAddress)) {
        try {
          await contract.buy(refAddress, { value: fromReadableAmount(nativeValue, 18) });
          toast['success'](t('Successful purchase'));
        } catch {
          toast['error'](t('Something went wrong'));
        }
      } else {
        try {
          await contract.buy({ value: fromReadableAmount(nativeValue, 18) });
          toast['success'](t('Successful purchase'));
        } catch {
          toast['error'](t('Something went wrong'));
        }
      }
    }
  }

  return (
    <>
      <h1 className={styles.title}>{t('Presale Information')}</h1>
      <ul className={styles.info}>
        <li>
          <span>Token name: </span>
          <span className={styles.value}>$AIO</span>
        </li>
        <li>
          <span>Presale Supply: </span>
          <span className={styles.value}>12.000.000 $AIO</span>
        </li>
        <li>
          <span>Presale Price: </span>
          <span className={styles.value}>0.0000125 $BNB = 1 $AIO</span>
        </li>
        <li>
          <span>Time to the end: </span>
          <span className={styles.value}>00:00:00</span>
        </li>
      </ul>
      <div className={styles.sum}>
        <div className={styles.strip}>
          <div className={styles.thereIs} style={{ width: `${(5000000 / 12000000) * 100}%` }}></div>
        </div>
        <div className={styles.numbers}>
          <span>0</span>
          <span>150</span>
        </div>
      </div>
      {isWalletConnected ? (
        <>
          <RefLink styles={styles} />
          <span className={styles.amountTitle}>{t('Amount $BNB')}</span>
          <div className={styles.amount}>
            <input
              className={styles.amountSum}
              type="number"
              placeholder="0.00..."
              value={nativeValue}
              onChange={handleSumInput}
            ></input>
            <button
              className={styles.buy}
              onClick={async () => await handleBuyClick()}
            >{`Buy ${aioValue} AIO`}</button>
          </div>
        </>
      ) : (
        <ConnectButton />
      )}
    </>
  );
};

export default PresaleStarted;
