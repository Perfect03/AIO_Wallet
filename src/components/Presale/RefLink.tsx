import { useEffect, useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import copy from '../../assets/copy.svg';
import metamaskProvider from '../../scripts/rpc/metamaskProvider';
import { AppState } from '../../store';

export default function RefLink(props: {
  styles: {
    readonly [key: string]: string;
  };
}) {
  const [refLink, setRefLink] = useState('');
  const isWalletConnected = useSelector(
    (state: { assets: AppState }) => state.assets.isWaleltConnected
  );

  const { t } = useTranslation();

  useEffect(() => {
    if (isWalletConnected)
      (async () => {
        const link = window.location;

        const address = await metamaskProvider.send('eth_accounts', []);

        setRefLink(link.origin + link.pathname + `?ref=${address[0]}`);
      })();
  }, []);

  function handleCopyClick() {
    navigator.clipboard
      .writeText(refLink)
      .then(() => {
        toast['success'](t('Copy referral link'));
      })
      .catch(() => {
        toast['error'](t('Copy referral link error'));
      });
  }

  return (
    <>
      <span className={props.styles.yourLink}>{t('Your Referral Link')}</span>
      <div className={props.styles.link}>
        <input
          className={props.styles.linkText}
          type="text"
          disabled
          value={refLink}
          onChange={(event) => {
            event.preventDefault();
          }}
        ></input>
        <button className={props.styles.copy} onClick={handleCopyClick}>
          <img src={copy} alt="" />
        </button>
      </div>
    </>
  );
}
