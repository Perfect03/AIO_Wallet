import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Link, animateScroll as scroll } from 'react-scroll';
import styles from './Navbar.module.scss';

interface IProps {
  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ status, setStatus }: IProps) => {
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
    setMenuCllicked(isMenuClicked);
  };
  const { t } = useTranslation();

  return (
    <div className={`${styles.menu} ${status ? styles.active : ''}`}>
      <div className={styles.menuContent} onClick={(e) => e.stopPropagation()}>
        <ul>
          <li>
            <Link
              to="section1"
              smooth={true}
              onClick={() => {
                setStatus(false);
              }}
            >
              {t('Main')}
            </Link>
          </li>
          <li>
            <Link
              to="section2"
              smooth={true}
              offset={-1}
              onClick={() => {
                setStatus(false);
              }}
            >
              {t('Our advantages')}
            </Link>
          </li>
          <li>
            <Link
              to="section3"
              smooth={true}
              offset={-85}
              onClick={() => {
                setStatus(false);
              }}
            >
              {t('Neurals')}
            </Link>
          </li>
          <li>
            <Link
              to="section4"
              smooth={true}
              offset={-85}
              onClick={() => {
                setStatus(false);
              }}
            >
              {t('Roadmap')}
            </Link>
          </li>
          <li>
            <Link
              to="section5"
              smooth={true}
              offset={-85}
              onClick={() => {
                setStatus(false);
              }}
            >
              {t('Tokenomics')}
            </Link>
          </li>
          <li>
            <Link
              to="section5"
              smooth={true}
              offset={-85}
              onClick={() => {
                setStatus(false);
              }}
            >
              {t('Distribution')}
            </Link>
          </li>
          <li>
            <Link
              to="section6"
              smooth={true}
              offset={-85}
              onClick={() => {
                setStatus(false);
              }}
            >
              {t('Partners')}
            </Link>
          </li>
        </ul>
        <NavLink className={styles.button} to="AIO-Wallet">
          AIO-Wallet
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
