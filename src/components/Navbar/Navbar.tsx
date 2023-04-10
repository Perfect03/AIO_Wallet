import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Navbar.module.scss';

interface IProps {
    status: boolean,
    setStatus: React.Dispatch<React.SetStateAction<boolean>>
  }

const Navbar = ({status, setStatus}: IProps) => {
  const [burger_class, setBurgerClass] = useState('unclicked');
  const [menu_class, setMenuClass] = useState('hidden');
  const [isMenuClicked, setMenuCllicked] = useState(false);

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass('clicked');
      setMenuClass('visible');
    } else {
      setBurgerClass('unclicked');
      setMenuClass('hidden');
    }
    console.log(3);
    setMenuCllicked(isMenuClicked);
  };
  const { t } = useTranslation();
  
  return (
    <div className={`${styles.menu} ${status ? styles.active : ''}`}>
        <div className={styles.menuContent} onClick={e => e.stopPropagation()}>
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
        </div>
    </div>
  );
};

export default Navbar;
