import styles from './Swap.module.scss';
import btc from '../../../../../assets/bitcoin_small.svg';
import info from '../../../../../assets/info.svg';
import more from '../../../../../assets/more.svg';
import fromTo from '../../../../../assets/from-to.svg';
import { useTranslation } from 'react-i18next';
import useResize from '../../../../../hooks/use-resize';
import useLoadTransactions from '../../../../../hooks/useLoadTransactions';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../store';
import { useEffect, useState } from 'react';
import { generateRoute } from '../../../../../scripts/quoting/swap/routing';

interface IAssetTemp {
  logo: string;
  name: string;
}

export default function Swap() {
  const { t } = useTranslation();
  const width = useResize();
  const transactions = useSelector((state: { assets: AppState }) => state.assets.transactions);

  const assets = [
    { logo: btc, name: 'bitcoin1' },
    { logo: btc, name: 'bitcoin2' },
    { logo: btc, name: 'bitcoin3' },
    { logo: btc, name: 'bitcoin4' },
  ];

  const [fromAsset, setFromAsset] = useState<IAssetTemp>(assets[0]);
  const [toAsset, setToAsset] = useState<IAssetTemp>(assets[3]);
  const [isFromMenuOpen, setIsFromMenuOpen] = useState(false);
  const [isToMenuOpen, setIsToMenuOpen] = useState(false);
  const [isPercentsOpen, setIsPercentsOpen] = useState(false);
  const [fromAmount, setFromAmount] = useState<string | undefined>(undefined);
  const [toAmount, setToAmount] = useState<string | undefined>(undefined);
  const [isExactOutput, setIsExactOutput] = useState(false);
  const [speed, setSpeed] = useState(2);

  const percents = [0.1, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5];

  async function handleSwapClick() {}

  useEffect(() => {
    setIsExactOutput(false);

    (async () => {
      await generateRoute();
    })();
  }, [fromAmount]);

  useEffect(() => {
    setIsExactOutput(true);

    (async () => {
      await generateRoute();
    })();
  }, [toAmount]);

  return (
    <div className={styles.swap}>
      <div className={styles.left}>
        <h1 className={styles.title}>{t('Swap')}</h1>
        <div className={styles.asset}>
          <div className={styles.line}>
            <div className={styles.dropdownBlock}>
              <ul>
                <li
                  className={styles.modalAsset}
                  onClick={() => {
                    setIsFromMenuOpen(!isFromMenuOpen);
                  }}
                >
                  <div className={styles.assetInfo}>
                    <div className={styles.logo}>
                      <img
                        className={styles.modalAssetImage}
                        src={fromAsset.logo}
                        //alt={`${fromAsset.symbol}`}
                        //width={32}
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
                        className={styles.modalAsset}
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
                              src={fromAsset.logo}
                              //alt={`${fromAsset.symbol}`}
                              //width={32}
                              height={18}
                            />
                          </div>
                          {el.name}
                        </div>
                      </li>
                    ))}
              </ul>
            </div>
            <div className={styles.balance}>{t('Balance')}: 0.0000</div>
          </div>
          <input
            className={styles.sum}
            onChange={(e) => {
              setFromAmount(e.target.value);
            }}
          />
          <div className={styles.percents}>
            <div className={styles.percent}>
              <div className={styles.text}>25%</div>
            </div>
            <div className={styles.percent}>
              <div className={styles.text}>50%</div>
            </div>
            <div className={styles.percent}>
              <div className={styles.text}>75%</div>
            </div>
            <div className={styles.percent}>
              <div className={styles.text}>Max</div>
            </div>
          </div>
        </div>
        <div className={styles.fromTo}>
          <img src={fromTo} alt="to" />
        </div>
        <div className={styles.asset}>
          <div className={styles.line}>
            <div className={styles.dropdownBlock}>
              <ul>
                <li
                  className={styles.modalAsset}
                  onClick={() => {
                    setIsToMenuOpen(!isToMenuOpen);
                  }}
                >
                  <div className={styles.assetInfo}>
                    <div className={styles.logo}>
                      <img
                        className={styles.modalAssetImage}
                        src={fromAsset.logo}
                        //alt={`${fromAsset.symbol}`}
                        //width={32}
                        height={18}
                      />
                    </div>
                    {toAsset.name}
                  </div>
                  <img className={styles.assetMore} src={more} alt="" />
                </li>
                {isToMenuOpen &&
                  assets
                    .filter((el) => JSON.stringify(el) !== JSON.stringify(toAsset))
                    .map((el, index) => (
                      <li
                        className={styles.modalAsset}
                        key={index}
                        onClick={() => {
                          setIsToMenuOpen(!isToMenuOpen);
                          setToAsset(el);
                        }}
                      >
                        <div className={styles.assetInfo}>
                          <div className={styles.logo}>
                            <img
                              className={styles.modalAssetImage}
                              src={fromAsset.logo}
                              //alt={`${fromAsset.symbol}`}
                              //width={32}
                              height={18}
                            />
                          </div>
                          {el.name}
                        </div>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
          <input
            className={styles.sum}
            onChange={(e) => {
              setToAmount(e.target.value);
            }}
          />
        </div>
        <button className={styles.go} onClick={async () => await handleSwapClick()}>
          {t('Swap')}
        </button>
      </div>
      <div className={styles.right}>
        <div className={styles.coming}>
          <LineChart width={375} height={210}>
            <Line
              dataKey="value"
              stroke="#B35BCE"
              data={[
                { category: 'A', value: Math.random() },
                { category: 'B', value: Math.random() },
                { category: 'C', value: Math.random() },
                { category: 'D', value: Math.random() },
                { category: 'E', value: Math.random() },
                { category: 'F', value: Math.random() },
                { category: 'G', value: Math.random() },
              ]}
            />
          </LineChart>
          <div className={styles.text}>{t('Coming Soon')}</div>
        </div>
        <h1 className={styles.title}>{t('Settings')}</h1>
        <div className={styles.subtitle}>
          <div className={styles.text}>{t('Slippage Tolerance')}</div>
          <div className={styles.info} title="">
            <img src={info} alt="info" />
          </div>
        </div>
        <div className={styles.slippagePercents}>
          {percents.slice(0, 3).map((el, index) => (
            <div className={styles.percent} key={index}>
              <div className={styles.text}>{el}%</div>
            </div>
          ))}
          {isPercentsOpen ? (
            percents.slice(3).map((el, index) => (
              <div className={styles.percent} key={index}>
                <div className={styles.text}>{el}%</div>
              </div>
            ))
          ) : (
            <div className={styles.percent} onClick={() => setIsPercentsOpen(true)}>
              <div className={styles.text}>...</div>
            </div>
          )}
        </div>
        <div className={styles.subtitle}>
          <div className={styles.text}>{t('Transaction Speed (GWEI)')}</div>
          <div className={styles.info} title="">
            <img src={info} alt="info" />
          </div>
        </div>
        <div className={styles.speeds}>
          <div
            className={`${styles.speed} ${speed == 2 && styles.active}`}
            onClick={() => {
              setSpeed(2);
            }}
          >
            {t('Default')}
          </div>
          <div
            className={`${styles.speed} ${speed == 3 && styles.active}`}
            onClick={() => {
              setSpeed(3);
            }}
          >
            {t('Standart')} (3)
          </div>
          <div
            className={`${styles.speed} ${speed == 4 && styles.active}`}
            onClick={() => {
              setSpeed(4);
            }}
          >
            {t('Fast')} (4)
          </div>
          <div
            className={`${styles.speed} ${speed == 5 && styles.active}`}
            onClick={() => {
              setSpeed(5);
            }}
          >
            {t('Instant')} (5)
          </div>
        </div>
      </div>
    </div>
  );
}
