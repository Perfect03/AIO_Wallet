import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo__header.svg';
import styles from './Footer.module.scss';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <div className={styles.container}>
        <img src={logo} alt="AIO" />
        <ul>
          <li>
            <a href="#section1">{t('Main')}</a>
          </li>
          <li>
            <a href="#section2">{t('Our advantages')}</a>
          </li>
          <li>
            <a href="#section3">{t('Neurals')}</a>
          </li>
          <li>
            <a href="#section4">{t('Roadmap')}</a>
          </li>
          <li>
            <a href="#section5">{t('Tokenomics')}</a>
          </li>
          <li>
            <a href="#section5">{t('Distribution')}</a>
          </li>
        </ul>
        <button className={styles.button}>AIO-Wallet</button>
      </div>
    </footer>
  );
};

export default Footer;
