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

  const assets = useSelector((state: { assets: AppState }) => state.assets.assets);
  const [fromAsset, setFromAsset] = useState<Asset>(assets[0]);
  const [toAsset, setToAsset] = useState<Asset>(assets[assets.length - 1]);
  const [isFromMenuOpen, setIsFromMenuOpen] = useState(false);
  const [isToMenuOpen, setIsToMenuOpen] = useState(false);
  const [reversed, setReversed] = useState(false);

  return (
    <>
      <div className={styles.left}>
        <h1 className={styles.title}>{t('Swap')}</h1>
        <div className={`${styles.assets} ${reversed && styles.reversed}`}>
          <div className={styles.asset}>
            <div className={styles.lineFrom}>
              <div className={`${styles.dropdownBlock} ${isFromMenuOpen && styles.opened}`}>
                <ul>
                  <li
                    className={`${styles.modalAsset} ${isFromMenuOpen && styles.colored}`}
                    onClick={() => {
                      setIsFromMenuOpen(!isFromMenuOpen);
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
                  </li>
                  {isFromMenuOpen &&
                    assets
                      .filter((el) => JSON.stringify(el) !== JSON.stringify(fromAsset))
                      .map((el, index) => (
                        <li
                          className={`${styles.modalAsset} ${isFromMenuOpen && styles.colored}`}
                          key={index}
                          onClick={() => {
                            setIsFromMenuOpen(!isFromMenuOpen);
                            setFromAsset(el);
                          }}
                        >
                          <div className={styles.assetInfo}>
                            <div className={styles.logo}>
                              <img
                                className={styles.modalAssetImage}
                                src={el.logoURI}
                                alt={`${el.symbol}`}
                                width={18}
                                height={18}
                              />
                            </div>
                            {el.name}
                          </div>
                        </li>
                      ))}
                </ul>
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
            <div className={styles.lineTo}>
              <div
                className={`${styles.modalAsset} ${isToMenuOpen && styles.colored}`}
                onClick={() => {
                  setIsToMenuOpen(!isToMenuOpen);
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
      <AddCustomModal assetsModalIsOpen={isToMenuOpen} setAssetsModalIsOpen={setIsToMenuOpen} />
    </>
  );
}
