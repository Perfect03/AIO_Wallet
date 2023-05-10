import { AppState } from '../store';
import HeaderWallet from './Header/HeaderWallet';
import MainWallet from './Main/MainWallet';

const Wallet = () => {
  return (
    <>
      <HeaderWallet />
      <MainWallet />
    </>
  );
};

export default Wallet;
