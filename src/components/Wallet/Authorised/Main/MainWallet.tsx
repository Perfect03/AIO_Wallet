import styles from './MainWallet.module.scss';
import copyForModal from '../../../../assets/copyForModal.svg';
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
import YourAssets from '../YourAssets/YourAssets';
import { IWallet } from '../../../../interfaces/interfaces';
import Modal from 'react-modal';
import QRCode from 'react-qr-code';

interface IMainWallet {
  user: IWallet;
}

const MainWallet = ({ user }: IMainWallet) => {
  const [depositModalIsOpen, setDepositModalIsOpen] = React.useState(false);
  const [withdrawModalIsOpen, setWithdrawModalIsOpen] = React.useState(false);
  const [assetsWindow, setAssetsWindow] = React.useState('assets');

  const depositModalStyles = {
    overlay: {
      backgroundColor: 'rgba(15, 12, 23, 0.82)',
      zIndex: 31,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      width: '423px',
      background: 'rgba(29, 25, 37, 0.92)',
      backdropFilter: 'blur(11px)',
      borderRadius: '6px',
      padding: '24px',
      border: 0,
      maxHeight: '531px',
    },
  };

  const withdrawModalStyles = {
    overlay: {
      backgroundColor: 'rgba(15, 12, 23, 0.82)',
      zIndex: 31,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      width: '423px',
      background: 'rgba(29, 25, 37, 0.92)',
      backdropFilter: 'blur(11px)',
      borderRadius: '6px',
      padding: '24px',
      border: 0,
      maxHeight: '100vh', // потом нужно исправлять для каждой отдельной вариации окна
    },
  };

  const assets = [
    { currency: 'BTC', image: bitcoin_small },
    { currency: 'BTC', image: bitcoin_small },
    { currency: 'BTC', image: bitcoin_small },
    { currency: 'BTC', image: bitcoin_small },
  ];
  const [isDepositMenuOpen, setIsDepositMenuOpen] = useState(false);
  const address = 'TRcHB2CZe3vYVbXhDgUnQNr1WzZRHz9avN';

  function handleCopyClick() {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast['info'](t('Copy address'));
      })
      .catch((err) => {
        toast['error'](t('Copy address error'));
      });
  }

  const { t } = useTranslation();

  return (
    <>
      <main className={styles.mainWalletAuthorised}>
        <div className={styles.container}>
          <div className={styles.yourBalance}>
            <h1 className={styles.title}>{t('Your balance')}</h1>
            <div className={styles.usd}>{`${user.balance}`.slice(0, 8)} USD</div>
            <div className={styles.btc}>{`${user.btc}`.slice(0, 10)} BTC</div>
            <div className={styles.buttons}>
              <button className={styles.deposit} onClick={() => setDepositModalIsOpen(true)}>
                <img src={deposit} alt="" />
                <span>{t('Deposit')}</span>
              </button>
              <button className={styles.withdraw} onClick={() => setWithdrawModalIsOpen(true)}>
                <img src={withdraw} alt="" />
                <span>{t('Withdraw')}</span>
              </button>
            </div>
          </div>
          <YourAssets user={user}></YourAssets>
        </div>
        <Modal
          isOpen={depositModalIsOpen}
          onRequestClose={() => setDepositModalIsOpen(false)}
          style={depositModalStyles}
          className={styles.modal}
        >
          <button className={styles.modalBack} onClick={() => setDepositModalIsOpen(false)}>
            <img src={back} alt="" />
          </button>
          <h1 className={styles.modalTitle}>{t('Deposit')}</h1>
          <h2 className={styles.modalSubTitle}>{t('Only BEP-20 assets can be deposited')}</h2>
          <div className={styles.field}>
            <div className={styles.fieldTitle}>{t('Select assets')}</div>
            <ul>
              <li
                className={styles.modalAsset}
                onClick={() => {
                  setIsDepositMenuOpen(!isDepositMenuOpen);
                }}
              >
                <div className={styles.asset}>
                  <img className={styles.modalAssetImage} src={assets[0].image} alt="" />
                  {`${assets[0].currency}`}
                </div>
                <img className={styles.assetMore} src={more} alt="" />
              </li>
              {isDepositMenuOpen &&
                assets.slice(1).map((el, index) => (
                  <li className={styles.modalAsset} key={index}>
                    <div className={styles.asset}>
                      <img className={styles.modalAssetImage} src={el.image} alt="" />
                      {`${el.currency}`}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.field}>
            <div className={styles.fieldTitle}>{t('Network')}</div>
            <div className={styles.network}>
              <div className={styles.networkTitle}>BSC</div>
              <div className={styles.networkSubTitle}>(BEP20)</div>
            </div>
          </div>
          <div className={styles.field}>
            <div className={styles.fieldTitle}>{t('Address')}</div>
            <div className={styles.addressDeposit}>
              <input className={styles.addressText} />
              <button className={styles.addressCopy} onClick={handleCopyClick}>
                <img src={copyForModal} alt="" />
              </button>
            </div>
          </div>
          <div className={styles.qrBorder}>
            <div className={styles.qr}>
              <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={address}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={withdrawModalIsOpen}
          onRequestClose={() => setWithdrawModalIsOpen(false)}
          style={withdrawModalStyles}
          className={styles.modal}
        >
          <form name="withdraw" method="post" action="">
            <button className={styles.modalBack} onClick={() => setWithdrawModalIsOpen(false)}>
              <img src={back} alt="" />
            </button>
            <h1 className={styles.modalTitle}>{t('Withdraw')}</h1>
            <h2 className={styles.modalSubTitle}>{t('Only BEP-20 assets can be withdrawn')}</h2>
            <div className={styles.field}>
              <div className={styles.fieldTitle}>{t('Select assets')}</div>
              <ul>
                <li
                  className={styles.modalAsset}
                  onClick={() => {
                    setIsDepositMenuOpen(!isDepositMenuOpen);
                  }}
                >
                  <div className={styles.asset}>
                    <img className={styles.modalAssetImage} src={assets[0].image} alt="" />
                    {`${assets[0].currency}`}
                  </div>
                  <img className={styles.assetMore} src={more} alt="" />
                </li>
                {isDepositMenuOpen &&
                  assets.slice(1).map((el, index) => (
                    <li className={styles.modalAsset} key={index}>
                      <div className={styles.asset}>
                        <img className={styles.modalAssetImage} src={el.image} alt="" />
                        {`${el.currency}`}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldTitle}>{t('Address')}</div>
              <input className={styles.addressWithdraw} />
            </div>
            <div className={styles.field}>
              <div className={styles.fieldTitle}>{t('Network')}</div>
              <div className={styles.network}>
                <div className={styles.networkTitle}>BSC</div>
                <div className={styles.networkSubTitle}>(BEP20)</div>
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldTitles}>
                <div className={styles.fieldTitle}>{t('Withdrawal amount')}</div>
                <div className={styles.fieldSubTitle}>All</div>
              </div>
              <input
                className={styles.withdrawAiAmount}
                name="withdrawai"
                placeholder={`${t('Minimum amount')}: 0.34124331 BTC`}
              ></input>
            </div>
            <div className={styles.modalInfo}>
              <div className={styles.infoTitle}>{t('Balance')} BTC</div>
              <div className={styles.info}>0.34124331 BTC</div>
            </div>
            <div className={styles.modalInfo} style={{ display: 'none' }}>
              <div className={styles.infoTitle}>{t('Minimum amount')}</div>
              <div className={styles.info}>0.34124331 BTC</div>
            </div>
            <div className={styles.modalInfo}>
              <div className={styles.infoTitle}>{t('Network comission')}</div>
              <div className={styles.info}>0.0000043 ~ 0.0002 BTC</div>
            </div>
            <div className={styles.sum}>0.34124331 BTC</div>
            <button className={styles.submit} type="submit">
              {t('to withdraw')}
            </button>
          </form>
        </Modal>
      </main>
    </>
  );
};

export default MainWallet;
