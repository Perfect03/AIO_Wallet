import {
  AlphaRouter,
  ChainId,
  SwapOptionsSwapRouter02,
  SwapRoute,
  SwapType,
} from '@uniswap/smart-order-router';
import { TradeType, CurrencyAmount, Percent, Token } from '@uniswap/sdk-core';
import { fromReadableAmount } from '../libs/conversion';
import { BigNumber } from 'ethers';
import defaultProvider from '../../rpc/defaultProvider';
import { TWallet } from '../../getWallet';
import sendTransaction from './transact';
import { V3_SWAP_ROUTER_ADDRESS } from '../libs/constants';
import getTokenContract from '../token-lists/getTokenContract';

export enum TransactionState {
  Failed = 'Failed',
  New = 'New',
  Rejected = 'Rejected',
  Sending = 'Sending',
  Sent = 'Sent',
}

export type RouteConfig = {
  tokens: {
    in: Token;
    amountIn: number;
    out: Token;
    poolFee: number;
  };
  recipient: string;
  maxFeePerGas: BigNumber;
  maxPriorityFeePerGas: BigNumber;
  slippageBips: number;
};

export async function generateRoute(cfg: RouteConfig): Promise<SwapRoute | null> {
  const router = new AlphaRouter({
    chainId: ChainId.BSC,
    provider: defaultProvider,
  });

  const options: SwapOptionsSwapRouter02 = {
    recipient: cfg.recipient,
    slippageTolerance: new Percent(cfg.slippageBips, 10_000),
    deadline: Math.floor(Date.now() / 1000 + 1800),
    type: SwapType.SWAP_ROUTER_02,
  };

  const route = await router.route(
    CurrencyAmount.fromRawAmount(
      cfg.tokens.in,
      fromReadableAmount(cfg.tokens.amountIn, cfg.tokens.in.decimals).toString()
    ),
    cfg.tokens.out,
    TradeType.EXACT_INPUT,
    options
  );

  return route;
}

export async function executeRoute(
  route: SwapRoute,
  cfg: RouteConfig,
  walletInfo: TWallet
): Promise<TransactionState> {
  const tokenApproval = await getTokenTransferApproval(
    cfg.tokens.in,
    walletInfo,
    cfg.tokens.amountIn
  );

  // Fail if transfer approvals do not go through
  if (tokenApproval !== TransactionState.Sent) {
    return TransactionState.Failed;
  }

  const res = await sendTransaction(
    {
      data: route.methodParameters?.calldata,
      to: V3_SWAP_ROUTER_ADDRESS,
      value: route?.methodParameters?.value,
      from: walletInfo.addr,
      maxFeePerGas: cfg.maxFeePerGas,
      maxPriorityFeePerGas: cfg.maxPriorityFeePerGas,
    },
    walletInfo
  );

  return res;
}

export async function getTokenTransferApproval(
  token: Token,
  walletInfo: TWallet,
  amount: number
): Promise<TransactionState> {
  try {
    const tokenContract = getTokenContract(token.address);

    const transaction = await tokenContract.populateTransaction.approve(
      V3_SWAP_ROUTER_ADDRESS,
      fromReadableAmount(amount, token.decimals).toString()
    );

    return sendTransaction(
      {
        ...transaction,
        from: walletInfo.addr,
      },
      walletInfo
    );
  } catch (e) {
    console.error(e);
    return TransactionState.Failed;
  }
}
