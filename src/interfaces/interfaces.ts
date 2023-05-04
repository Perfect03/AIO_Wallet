export interface IWallet {
  balance: number;
  walletID: string;
  btc: number;
}

export interface ILatestsQuotes {
  status: {
    timestamp: string | Date;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: string | null;
  };
  data: [];
}
