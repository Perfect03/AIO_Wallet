import { changeWallet } from '../../../store';
import HeaderWallet from './Header/HeaderWallet';
import { useDispatch } from 'react-redux';
import MainSwap from './WalletInfo/Swap/MainSwap';

const Swap = () => {
  const dispatch = useDispatch();
  dispatch(changeWallet('swap'));
  return (
    <>
      <HeaderWallet />
      <MainSwap />
    </>
  );
};

export default Swap;
