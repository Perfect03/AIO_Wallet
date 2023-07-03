import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WalletTransaction } from './hooks/useLoadTransactions';
import { Asset } from './components/Wallet/Authorised/Main/helpers/checkSavedAssets';
import { TWallet } from './scripts/getWallet';
import coin from './assets/coin.svg';
import brn from './assets/partners/BRN Icon.png';

// Define the shape of our state
export interface AppState {
  assets: Asset[];
  load: boolean;
  wallet: walletPart;
  transactions: WalletTransaction[];
  userAddress: string;
  swapFromAsset: Asset;
  swapToAsset: Asset;
  swapSlippage: number;
  swapRecipient: string;
}

export type walletPart = 'assets' | 'transactions' | 'swap';

// Define our initial state
const initialState: AppState = {
  assets: [
    {
      name: 'AIO Token',
      symbol: 'AIO',
      address: process.env.REACT_APP_NEW_TOKEN_ADDRESS as string,
      chainId: 56,
      decimals: 9,
      logoURI: coin,
    },
    {
      name: 'BNB Token',
      symbol: 'BNB',
      address: '',
      chainId: 56,
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_BNB.png',
    },
    {
      name: 'BRN Metaverse',
      symbol: 'BRN',
      address: '0x926ecC7687fCFB296E97a2b4501F41A6f5F8C214',
      chainId: 56,
      decimals: 18,
      logoURI: brn,
    },
  ],
  load: false,
  wallet: (localStorage.getItem('AIO-Wallet') as walletPart) || 'assets',
  transactions: [],
  userAddress: '',
  swapFromAsset: {
    name: 'WBNB Token',
    symbol: 'WBNB',
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    chainId: 56,
    decimals: 18,
    logoURI:
      'https://tokens.pancakeswap.finance/images/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c.png',
  },
  swapToAsset: {
    name: 'Binance Pegged BUSD',
    symbol: 'BUSD',
    address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    chainId: 56,
    decimals: 18,
    logoURI:
      'https://tokens.pancakeswap.finance/images/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56.png',
  },
  swapSlippage: 50,
  swapRecipient: (JSON.parse(localStorage.getItem('wallet')!) as TWallet).addr,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadAssets: (state, action: PayloadAction<Asset[]>) => {
      state.assets = initialState.assets.concat(action.payload);
    },
    updateAssetBalance: (state, action: PayloadAction<{ address: string; balance: number }>) => {
      const { address, balance } = action.payload;
      const assetIndex = state.assets.findIndex((asset) => asset.address === address);
      if (assetIndex !== -1) {
        state.assets[assetIndex].balance = balance;
      }
    },
    addAsset: (state, action: PayloadAction<Asset>) => {
      state.assets.push(action.payload);
    },
    deleteAsset: (state, action: PayloadAction<string>) => {
      state.assets = state.assets.filter((a) => a.address !== action.payload);
    },
    isLoadingReducer(state, action: PayloadAction<boolean>) {
      state.load = action.payload;
    },
    changeWallet: (state, action: PayloadAction<walletPart>) => {
      state.wallet = action.payload;
    },
    setTransactions: (state, action: PayloadAction<WalletTransaction[]>) => {
      state.transactions = action.payload;
    },
    setUserAddress: (state, action: PayloadAction<string>) => {
      state.userAddress = action.payload;
    },
    setSwapFromAsset: (state, action: PayloadAction<Asset>) => {
      state.swapFromAsset = action.payload;
    },
    setSwapToAsset: (state, action: PayloadAction<Asset>) => {
      state.swapToAsset = action.payload;
    },
    setSlippage: (state, action: PayloadAction<number>) => {
      state.swapSlippage = action.payload;
    },
    setRecipient: (state, action: PayloadAction<string>) => {
      state.swapRecipient = action.payload;
    },
  },
});

export const {
  loadAssets,
  updateAssetBalance,
  addAsset,
  deleteAsset,
  isLoadingReducer,
  changeWallet,
  setTransactions,
  setUserAddress,
  setSwapFromAsset,
  setSwapToAsset,
  setSlippage,
  setRecipient,
} = appSlice.actions;

// Create the store
export const store = configureStore({
  reducer: {
    assets: appSlice.reducer,
  },
});
