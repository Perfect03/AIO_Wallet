import styles from './Left.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import more from '../../../../../../assets/more.svg';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Share from './Share/Share';
import AddCustomModal from '../../../Main/Modals/AddCustomModal';
import { AppState, setSwapFromAsset, setSwapToAsset } from '../../../../../../store';
import { Asset } from '../../../Main/helpers/checkSavedAssets';
import ReverseIcon from './ReverseIcon';
import { generateRoute } from '../../../../../../scripts/quoting/swap/routing';
import { TWallet } from '../../../../../../scripts/getWallet';
import useLocalStorage from '../../../../../../hooks/useLocalStorage';
import { Percent } from '@pancakeswap/sdk';

export default function Left() {
  const { t } = useTranslation();

  const assetIn = useSelector((state: { assets: AppState }) => state.assets.swapFromAsset);
  const assetOut = useSelector((state: { assets: AppState }) => state.assets.swapToAsset);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [swap, setSwap] = useState('');

  const walletData = useLocalStorage<TWallet>('wallet', {
    pk: '',
    addr: '',
  })[0];

  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.left}>
        <h1 className={styles.title}>{t('Swap')}</h1>
        <div className={`${styles.assets}`}>
          <div className={styles.asset}>
            <div className={styles.line}>
              <div
                className={`${styles.modalAsset} ${isMenuOpen && styles.colored}`}
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setSwap('from');
                }}
              >
                <div className={styles.assetInfo}>
                  <div className={styles.logo}>
                    <img
                      className={styles.modalAssetImage}
                      src={assetIn.logoURI}
                      alt={`${assetIn.symbol}`}
                      width={18}
                      height={18}
                    />
                  </div>
                  {assetIn.name}
                </div>
                <img className={styles.assetMore} src={more} alt="" />
              </div>
              <div className={styles.balance}>{t('Balance')}: 0.0000</div>
            </div>
            <input
              className={styles.sum}
              onChange={async (e) => {
                const trade = await generateRoute({
                  in: assetIn,
                  amount: +e.target.value,
                  out: assetOut,
                  exactOutput: false,
                  recipient: walletData.addr,
                  slippageBips: 50,
                });

                console.log(trade);
              }}
            />
            <Share></Share>
          </div>
          <div
            className={styles.fromTo}
            onClick={() => {
              dispatch(setSwapFromAsset(assetOut));
              dispatch(setSwapToAsset(assetIn));
            }}
          >
            <ReverseIcon></ReverseIcon>
          </div>
          <div className={styles.asset}>
            <div className={styles.line}>
              <div
                className={`${styles.modalAsset} ${isMenuOpen && styles.colored}`}
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setSwap('to');
                }}
              >
                <div className={styles.assetInfo}>
                  <div className={styles.logo}>
                    <img
                      className={styles.modalAssetImage}
                      src={assetOut.logoURI}
                      alt={`${assetOut.symbol}`}
                      width={18}
                      height={18}
                    />
                  </div>
                  {assetOut.name}
                </div>
                <img className={styles.assetMore} src={more} alt="" />
              </div>
            </div>
            <input className={styles.sum} onChange={(e) => {}} />
          </div>
        </div>
        <span className={styles.price}>1 AIO = 0.000001 BNB</span>
        <button className={styles.go} onClick={() => {}}>
          {t('Swap')}
        </button>
      </div>
      <AddCustomModal
        assetsModalIsOpen={isMenuOpen}
        setAssetsModalIsOpen={setIsMenuOpen}
        swap={swap}
      />
    </>
  );
}
