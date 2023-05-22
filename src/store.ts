import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WalletTransaction } from './hooks/useLoadTransactions';
import { Asset } from './components/Wallet/Authorised/Main/helpers/checkSavedAssets';

// Define the shape of our state
export interface AppState {
  assets: Asset[];
  load: boolean;
  wallet: walletPart;
  transactions: WalletTransaction[];
  isWaleltConnected: boolean;
}

export type walletPart = 'assets' | 'transactions';

// Define our initial state
const initialState: AppState = {
  assets: [
    {
      name: 'BNB Token',
      symbol: 'BNB',
      address: '',
      chainId: 56,
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_BNB.png',
    },
  ],
  load: false,
  wallet: 'assets',
  transactions: [],
  isWaleltConnected: true,
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
    setIsWalletConnected: (state, action: PayloadAction<boolean>) => {
      state.isWaleltConnected = action.payload;
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
  setIsWalletConnected,
} = appSlice.actions;

// Create the store
export const store = configureStore({
  reducer: {
    assets: appSlice.reducer,
  },
});
