import styles from './YourAssets.module.scss';
import useResize from '../../../../hooks/use-resize';
import search from '../../../../assets/search.svg';
import deposit from '../../../../assets/deposit.svg';
import refresh from '../../../../assets/refresh.svg';
import withdraw from '../../../../assets/withdraw.svg';
import bitcoin from '../../../../assets/bitcoin.svg';
import bitcoin_small from '../../../../assets/bitcoin_small.svg';
import back from '../../../../assets/back.svg';
import more from '../../../../assets/more.svg';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Context, ContextType } from '../../../../languageContext';
import { toast } from 'react-toastify';
import { IWallet } from '../../../../interfaces/interfaces';
import Modal from 'react-modal';
import QRCode from 'react-qr-code';

interface IMainWallet {
  user: IWallet;
}

const YourAssets = ({ user }: IMainWallet) => {
  const [assetsModalIsOpen, setAssetsModalIsOpen] = React.useState(false);
  const [assetsWindow, setAssetsWindow] = React.useState('assets');
  const width = useResize();

  const assets = [
    { icon: bitcoin, title: 'BTC', info: 'bitcoin' },
    { icon: bitcoin, title: 'BTC', info: 'bitcoin' },
    { icon: bitcoin, title: 'BTC', info: 'bitcoin' },
    { icon: bitcoin, title: 'BTC', info: 'bitcoin' },
    { icon: bitcoin, title: 'BTC', info: 'bitcoin' },
    { icon: bitcoin, title: 'BTC', info: 'bitcoin' },
    { icon: bitcoin, title: 'BTC', info: 'bitcoin' },
    { icon: bitcoin, title: 'BTC', info: 'bitcoin' },
    { icon: bitcoin, title: 'BTC', info: 'bitcoin' },
    { icon: bitcoin, title: 'BTC', info: 'bitcoin' },
    { icon: bitcoin, title: 'BTC', info: 'bitcoin' },
  ];

  const transactions = [
    {
      type: 'withdraw',
      date: 'May 20',
      client: '0x2344543rfref34543v5ersefsdfe23',
      usd: 248.543,
      btc: 0.35432534,
    },
    {
      type: 'deposit',
      date: 'June 21',
      client: '0xfce324c32654tgrewt54525342re3',
      usd: 288.543,
      btc: 0.4324324,
    },
    {
      type: 'withdraw',
      date: 'July 22',
      client: '0xw5234refr2cse123eqwdqw',
      usd: 288.543,
      btc: 0.9758674,
    },
    {
      type: 'deposit',
      date: 'August 23',
      client: '0xfcsdf2c4432rwet4354',
      usd: 111.543,
      btc: 0.3213211114,
    },
    {
      type: 'withdraw',
      date: 'September 24',
      client: 'oxer24325435gfdgf354dds',
      usd: 555.543,
      btc: 0.98888888,
    },
  ];

  const assetsModalStyles = {
    overlay: {
      backgroundColor: 'rgba(15, 12, 23, 0.82)',
      zIndex: 31,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      background: 'rgba(29, 25, 37, 0.92)',
      backdropFilter: 'blur(11px)',
      borderRadius: '6px',
      padding: '24px',
      border: 0,
    },
  };
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.yourAssets}>
        <h1 className={styles.title}>
          {assetsWindow == 'assets' ? t('Your assets') : t('Transactions')}
        </h1>
        <div className={styles.describe}>
          {assetsWindow == 'assets'
            ? t('Here you can safely store, send and receive assets')
            : t('Select coin for transaction type')}
        </div>
        {assetsWindow == 'assets' ? (
          <div className={styles.assets}>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 6)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 4)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 4)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 4)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 4)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 4)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 4)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 4)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 4)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 4)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 4)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 4)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 4)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 4)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 4)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 4)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 4)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 4)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
            <div className={styles.asset}>
              <div className={styles.coin}>
                <img src={bitcoin} alt="" />
              </div>
              <div className={styles.coinAbout}>
                <div className={styles.firstLine}>
                  <div className={styles.currency}>Bitcoin</div>
                  <div className={styles.sum}>
                    <button>
                      <img src={refresh} alt="" />
                    </button>
                    {`${user.balance}`.slice(0, 4)}
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <span className={styles.address}>Show address</span>
                  <span className={styles.usd}>{`${user.balance}`.slice(0, 6)} USD</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.transactions}>
            {transactions.map((el, index) => (
              <div
                className={styles.transaction}
                key={index}
                title={
                  width < 540 ? `${el.type == 'deposit' ? t('From') : t('To')}: ${el.client}` : ''
                }
              >
                <div className={styles.left}>
                  <div className={styles.icon}>
                    <img src={el.type == 'withdraw' ? withdraw : deposit} alt="" />
                  </div>
                  <div className={styles.about}>
                    <div className={styles.type}>{el.type}</div>
                    <div className={styles.info}>
                      <span className={styles.date}>{el.date}</span>
                      <div className={styles.ellipse}></div>
                      <span className={styles.client} title={width > 539 ? el.client : ''}>
                        {el.type == 'deposit' ? t('From') : t('To')}: {el.client.slice(0, 4)}…
                        {el.client.slice(-2)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.sums}>
                  <div className={styles.btc}>{`${el.btc}`.slice(0, 6)} BTC</div>
                  <div className={styles.usd}>{`${el.usd}`.slice(0, 6)} USD</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {assetsWindow == 'assets' ? (
          <button className={styles.addToken} onClick={() => setAssetsModalIsOpen(true)}>
            {t('Add custom tokens')}
          </button>
        ) : (
          ''
        )}
      </div>
      <Modal
        isOpen={assetsModalIsOpen}
        onRequestClose={() => setAssetsModalIsOpen(false)}
        style={assetsModalStyles}
        className={styles.modal}
      >
        <button className={styles.modalBack} onClick={() => setAssetsModalIsOpen(false)}>
          <img src={back} alt="" />
        </button>
        <form name="assets" method="post" action="">
          <h1 className={styles.modalTitle}>{t('Select assets')}</h1>
          <div className={styles.searchWrapper}>
            <input
              className={styles.search}
              name="searchAssets"
              placeholder={`${t('Search')}`}
            ></input>
          </div>
          <div className={styles.modalAssets}>
            {assets.map((el, index) => (
              <div
                className={styles.modalAsset}
                key={index}
                onClick={() => {
                  setAssetsWindow('transactions');
                  setAssetsModalIsOpen(false);
                }}
              >
                <div className={styles.logo}>
                  <img src={el.icon} alt="" />
                </div>
                <div className={styles.asset}>
                  <span className={styles.assetTitle}>{el.title}</span>
                  <span className={styles.assetName}>{el.info}</span>
                </div>
              </div>
            ))}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default YourAssets;
