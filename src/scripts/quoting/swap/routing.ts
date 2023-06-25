import { fromReadableAmount } from '../libs/conversion';
import defaultProvider from '../../rpc/defaultProvider';
import {
  BestTradeOptions,
  CurrencyAmount,
  Fetcher,
  Route,
  Token,
  Trade,
  TradeOptions,
  TradeType,
} from '@pancakeswap/sdk';
import { Asset } from '../../../components/Wallet/Authorised/Main/helpers/checkSavedAssets';
import {
  AlphaRouter,
  SwapOptionsSwapRouter02,
  SwapRoute,
  SwapType,
} from 'pancakeswap-bsc-smart-order-router';
import { ChainId, Percent } from '@uniswap/sdk-core';
import { CurrencyAmount as CCurrencyAmount } from '@uniswap/sdk-core';
import { TWallet } from '../../getWallet';
import { V3_SWAP_ROUTER_ADDRESS } from '../libs/constants';
import sendTransaction from './transact';

export enum TransactionState {
  Failed = 'Failed',
  New = 'New',
  Rejected = 'Rejected',
  Sending = 'Sending',
  Sent = 'Sent',
}

export type RouteConfig = {
  in: Asset;
  amount: number;
  out: Asset;
  recipient: string;
  exactOutput: boolean;
  slippageBips: number;
};

export async function generateRoute(cfg: RouteConfig) {
  const tokenIn = new Token(ChainId.BNB, cfg.in.address, cfg.in.decimals, cfg.in.symbol);
  const tokenOut = new Token(ChainId.BNB, cfg.out.address, cfg.out.decimals, cfg.out.symbol);

  const router = new AlphaRouter({
    chainId: 56,
    provider: defaultProvider,
  });

  const options: SwapOptionsSwapRouter02 = {
    recipient: cfg.recipient,
    slippageTolerance: new Percent(5, 100),
    deadline: Math.floor(Date.now() / 1000 + 1800),
    type: SwapType.SWAP_ROUTER_02,
  };

  const route = await router.route(
    CCurrencyAmount.fromRawAmount(
      cfg.exactOutput ? tokenOut : tokenIn,
      fromReadableAmount(
        cfg.amount,
        cfg.exactOutput ? tokenOut.decimals : tokenIn.decimals
      ).toString()
    ),
    tokenOut,
    TradeType.EXACT_INPUT,
    options
  );

  console.log(route?.quoteGasAdjusted.toFixed());

  return route;
}

export async function executeRoute(route: SwapRoute, wallet: TWallet): Promise<TransactionState> {
  const res = await sendTransaction(
    {
      data: route.methodParameters?.calldata,
      to: V3_SWAP_ROUTER_ADDRESS,
      value: route?.methodParameters?.value,
      from: wallet.addr,
    },
    wallet
  );

  return res;
}

// export async function getTokenTransferApproval(
//   token: Token,
//   walletInfo: TWallet,
//   amount: number
// ): Promise<TransactionState> {
//   try {
//     const tokenContract = getTokenContract(token.address);

//     const transaction = await tokenContract.populateTransaction.approve(
//       V3_SWAP_ROUTER_ADDRESS,
//       fromReadableAmount(amount, token.decimals).toString()
//     );

//     return sendTransaction(
//       {
//         ...transaction,
//         from: walletInfo.addr,
//       },
//       walletInfo
//     );
//   } catch (e) {
//     console.error(e);
//     return TransactionState.Failed;
//   }
// }
