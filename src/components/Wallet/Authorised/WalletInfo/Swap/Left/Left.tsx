import styles from './Left.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import more from '../../../../../../assets/more.svg';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useEffect, useState } from 'react';
import AddCustomModal from '../../../Main/Modals/AddCustomModal';
import { AppState, setSwapFromAsset, setSwapToAsset, store } from '../../../../../../store';
import ReverseIcon from './ReverseIcon';
import { executeRoute, generateRoute } from '../../../../../../scripts/quoting/swap/routing';
import { TWallet } from '../../../../../../scripts/getWallet';
import useLocalStorage from '../../../../../../hooks/useLocalStorage';
import { SwapRoute } from 'pancakeswap-bsc-smart-order-router';
import getTokenBalance from '../../../../../../scripts/quoting/getTokenBalance';
import getNativeBalance from '../../../../../../scripts/quoting/getNativeBalance';
import { toast } from 'react-toastify';
import { fromReadableAmount } from '../../../../../../scripts/quoting/libs/conversion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Left() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [swap, setSwap] = useState('swap');
  const [trade, setTrade] = useState<SwapRoute | null>(null);
  const [amountIn, setAmountIn] = useState('');
  const [amountOut, setAmountOut] = useState('');
  const [quote, setQuote] = useState<string | undefined>();
  const [exactOutput, setExactOutput] = useState(false);
  const [tokenInBalance, setTokenInBalance] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const [loading, setLoading] = useState(false);
  const [validSwap, setValidSwap] = useState(true);

  const assetIn = useSelector((state: { assets: AppState }) => state.assets.swapFromAsset);
  const assetOut = useSelector((state: { assets: AppState }) => state.assets.swapToAsset);
  const slippage = useSelector((state: { assets: AppState }) => state.assets.swapSlippage);
  const recipient = useSelector((state: { assets: AppState }) => state.assets.swapRecipient);

  const dispatch = useDispatch();

  const walletData = useLocalStorage<TWallet>('wallet', {
    pk: '',
    addr: '',
  })[0];

  const { t } = useTranslation();

  const percents = [25, 50, 75, 100];

  useEffect(() => {
    const listner = async () => {
      if (
        assetIn.address !== store.getState().assets.swapFromAsset.address ||
        assetOut.address !== store.getState().assets.swapToAsset.address
      ) {
        clearTimeout(timer!);
        try {
          setQuote(undefined);
          setTrade(null);
          setLoading(true);
          if (+store.getState().assets.swapFromAsset.address) {
            const newTokenBalance = await getTokenBalance(
              store.getState().assets.swapFromAsset,
              walletData.addr
            );
            setTokenInBalance(newTokenBalance);
          } else setTokenInBalance(await getNativeBalance(walletData.addr));

          const newTrade = await generateRoute(
            {
              in: store.getState().assets.swapFromAsset,
              amount: exactOutput ? +amountOut! : +amountIn!,
              out: store.getState().assets.swapToAsset,
              exactOutput: exactOutput,
              recipient,
              slippageBips: slippage,
            },
            walletData
          );

          if (
            newTrade?.trade.inputAmount.greaterThan(
              fromReadableAmount(tokenInBalance, assetIn.decimals).toString()
            )
          )
            throw 'not valid trade';

          setValidSwap(true);

          if (exactOutput) setAmountIn(newTrade!.quoteGasAdjusted.toFixed(6)!);
          else setAmountOut(newTrade!.quoteGasAdjusted.toFixed(6)!);

          setQuote(
            newTrade?.trade.outputAmount
              .divide(+(exactOutput ? amountOut : amountIn)! * 10 ** assetOut.decimals)
              .multiply(10 ** assetIn.decimals)
              .toFixed(6)
          );
          setTrade(newTrade);
        } catch (err) {
          setValidSwap(false);
          console.error(err);
        }

        setLoading(false);
      }
    };

    const unsubscribe = store.subscribe(listner);

    return () => {
      unsubscribe();
      clearTimeout(timer!);
    };
  }, []);

  async function handleAmountInChange(e: string) {
    clearTimeout(timer!);

    setAmountIn(e);

    const listener = async () => {
      setLoading(true);
      setExactOutput(false);
      setQuote(undefined);
      setTrade(null);

      try {
        const newTrade = await generateRoute(
          {
            in: assetIn,
            amount: +e,
            out: assetOut,
            exactOutput: false,
            recipient,
            slippageBips: slippage,
          },
          walletData
        );

        if (
          newTrade?.trade.inputAmount.greaterThan(
            fromReadableAmount(tokenInBalance, assetIn.decimals).toString()
          )
        )
          throw 'not valid trade';

        setValidSwap(true);

        if (!newTrade?.quoteGasAdjusted.toFixed(6).startsWith('-')) {
          setAmountOut(newTrade!.quoteGasAdjusted.toFixed(6)!);
          setQuote(
            newTrade?.trade.outputAmount
              .divide(+e * 10 ** assetIn.decimals)
              .multiply(10 ** assetIn.decimals)
              .toFixed(6)
          );
          setTrade(newTrade);
        } else {
          setAmountOut('Not valid swap');
          setQuote(undefined);
        }
      } catch (err) {
        console.log(err);
        setValidSwap(false);
      }

      setLoading(false);
    };

    const newTimer = setTimeout(listener, 700);

    setTimer(newTimer);
  }

  async function handleAmountOutChange(e: ChangeEvent<HTMLInputElement>) {
    clearTimeout(timer!);
    setAmountOut(e.target.value);
    const listener = async () => {
      setLoading(true);
      setExactOutput(true);
      setTrade(null);
      setQuote(undefined);

      try {
        const newTrade = await generateRoute(
          {
            in: assetIn,
            amount: +e.target.value,
            out: assetOut,
            exactOutput: true,
            recipient,
            slippageBips: slippage,
          },
          walletData
        );

        if (
          newTrade?.trade.inputAmount.greaterThan(
            fromReadableAmount(tokenInBalance, assetIn.decimals).toString()
          )
        )
          throw 'not valid trade';

        setValidSwap(true);

        setAmountIn(newTrade!.quoteGasAdjusted.toFixed(6)!);

        if (!newTrade?.quoteGasAdjusted.toFixed(6).startsWith('-')) {
          setQuote(
            newTrade?.trade.inputAmount
              .divide(+e.target.value * 10 ** assetOut.decimals)
              .multiply(10 ** assetIn.decimals)
              .toFixed(6)
          );
          setTrade(newTrade);
        } else {
          setAmountIn('Not valid swap');
          setQuote(undefined);
        }
      } catch {
        setValidSwap(false);
      }

      setLoading(false);
    };

    const newTimer = setTimeout(listener, 700);

    setTimer(newTimer);
  }

  async function handleSwapClick() {
    if (trade) {
      try {
        toast['info']('Transaction sent');
        await executeRoute(trade, walletData, slippage);
        toast['success']('Transaction confirmed');
      } catch {
        toast['error']('Transaction canceled');
      }
    }
  }

  return (
    <>
      <div className={styles.left}>
        <h1 className={styles.title}>{t('Swap')}</h1>
        <div className={styles.assets}>
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
              <div className={styles.balance}>
                {loading ? (
                  <Skeleton width={70} baseColor="#272332" highlightColor="#353535" />
                ) : (
                  <>
                    {t('Balance')}: {tokenInBalance}
                  </>
                )}
              </div>
            </div>
            <input
              className={styles.sum}
              value={amountIn}
              onChange={async (e) => await handleAmountInChange(e.target.value)}
            />
            <div className={styles.percents}>
              {percents.map((el) => (
                <div
                  className={`${styles.percent} ${styles.inActive}`}
                  key={el}
                  onClick={async () => {
                    const value = tokenInBalance
                      ? `${((tokenInBalance * el) / 100).toFixed(assetIn.decimals)}`
                      : '0';
                    setAmountIn(value);
                    await handleAmountInChange(value);
                  }}
                >
                  <div className={styles.text}>{el < 100 ? `${el}%` : 'Max'}</div>
                </div>
              ))}
            </div>
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
            <input
              className={styles.sum}
              value={amountOut}
              onChange={async (e) => await handleAmountOutChange(e)}
            />
          </div>
        </div>
        <div className={styles.rates}>
          <span className={styles.price}>
            {loading ? (
              <Skeleton width={175} baseColor="#272332" highlightColor="#353535" />
            ) : (
              quote &&
              `1 ${exactOutput ? assetOut.symbol : assetIn.symbol} = ${quote?.slice(0, 10)} ${
                !exactOutput ? assetOut.symbol : assetIn.symbol
              }`
            )}
          </span>
          <span className={styles.price}>
            {loading ? (
              <Skeleton width={110} baseColor="#272332" highlightColor="#353535" />
            ) : (
              trade && `Gas: ~${trade?.estimatedGasUsedUSD.toFixed(4)}$`.slice(0, 15)
            )}
          </span>
        </div>
        <button
          disabled={!validSwap}
          className={`${styles.go} ${!validSwap && styles.disabled}`}
          onClick={async () => await handleSwapClick()}
        >
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
