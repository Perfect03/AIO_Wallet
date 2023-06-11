import styles from './Left.module.scss';
import { useSelector } from 'react-redux';
import more from '../../../../../../assets/more.svg';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Share from './Share/Share';
import AddCustomModal from '../../../Main/Modals/AddCustomModal';
import { AppState } from '../../../../../../store';
import { Asset } from '../../../Main/helpers/checkSavedAssets';

export default function Left() {
  const { t } = useTranslation();

  const [fromAsset, setFromAsset] = useState<Asset>(
    useSelector((state: { assets: AppState }) => state.assets.swapFromAsset)
  );
  const [toAsset, setToAsset] = useState<Asset>(
    useSelector((state: { assets: AppState }) => state.assets.swapToAsset)
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [swap, setSwap] = useState('');
  const [reversed, setReversed] = useState(false);

  return (
    <>
      <div className={styles.left}>
        <h1 className={styles.title}>{t('Swap')}</h1>
        <div className={`${styles.assets} ${reversed && styles.reversed}`}>
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
                      src={fromAsset.logoURI}
                      alt={`${fromAsset.symbol}`}
                      width={18}
                      height={18}
                    />
                  </div>
                  {fromAsset.name}
                </div>
                <img className={styles.assetMore} src={more} alt="" />
              </div>
              {!reversed && <div className={styles.balance}>{t('Balance')}: 0.0000</div>}
            </div>
            <input className={styles.sum} onChange={(e) => {}} />
            {!reversed && <Share></Share>}
          </div>
          <div className={styles.fromTo} onClick={() => setReversed(!reversed)}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={styles.to}
                d="M10.1627 12.96L12.9527 15.7499L15.7427 12.96"
                stroke="#7A7B7C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className={styles.to}
                d="M12.9526 2.25L12.9526 15.75"
                stroke="#7A7B7C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className={styles.from}
                d="M7.83789 5.03998L5.04787 2.25L2.25789 5.03998"
                stroke="#7A7B7C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className={styles.from}
                d="M5.04785 15.75L5.04785 2.25"
                stroke="#7A7B7C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
                      src={toAsset.logoURI}
                      alt={`${toAsset.symbol}`}
                      width={18}
                      height={18}
                    />
                  </div>
                  {toAsset.name}
                </div>
                <img className={styles.assetMore} src={more} alt="" />
              </div>
              {reversed && <div className={styles.balance}>{t('Balance')}: 0.0000</div>}
            </div>
            <input className={styles.sum} onChange={(e) => {}} />
            {reversed && <Share></Share>}
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
