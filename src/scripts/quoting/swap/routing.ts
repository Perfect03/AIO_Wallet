import { fromReadableAmount } from '../libs/conversion';
import defaultProvider from '../../rpc/defaultProvider';
import { Asset } from '../../../components/Wallet/Authorised/Main/helpers/checkSavedAssets';
import {
  AlphaRouter,
  nativeOnChain,
  SwapOptionsSwapRouter02,
  SwapRoute,
  SwapType,
} from 'pancakeswap-bsc-smart-order-router';
import { ChainId, Currency, Percent, Token } from '@uniswap/sdk-core';
import { CurrencyAmount } from '@uniswap/sdk-core';
import { TWallet } from '../../getWallet';
import sendTransaction from './transact';
import getTokenContract from '../token-lists/getTokenContract';
import { BigNumber, Wallet } from 'ethers';

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

export async function generateRoute(cfg: RouteConfig, wallet: TWallet) {
  if (cfg.in && cfg.out && cfg.amount) {
    let tokenIn, tokenOut: Currency;

    if (!+cfg.in.address) {
      tokenIn = nativeOnChain(56);
      tokenOut = new Token(ChainId.BNB, cfg.out.address, cfg.out.decimals, cfg.out.symbol);
    } else if (!+cfg.out.address) {
      tokenIn = new Token(ChainId.BNB, cfg.in.address, cfg.in.decimals, cfg.in.symbol);
      tokenOut = nativeOnChain(56);
    } else {
      tokenIn = new Token(ChainId.BNB, cfg.in.address, cfg.in.decimals, cfg.in.symbol);
      tokenOut = new Token(ChainId.BNB, cfg.out.address, cfg.out.decimals, cfg.out.symbol);
    }

    const router = new AlphaRouter({
      chainId: 56,
      provider: defaultProvider,
    });

    const options: SwapOptionsSwapRouter02 = {
      recipient: cfg.recipient,
      slippageTolerance: new Percent(cfg.slippageBips, 10000),
      deadline: Math.floor(Date.now() / 1000 + 1800),
      type: SwapType.SWAP_ROUTER_02,
    };

    console.log(options);

    try {
      console.log('asd');
      const route = await router.route(
        CurrencyAmount.fromRawAmount(
          cfg.exactOutput ? tokenOut : tokenIn,
          fromReadableAmount(
            cfg.amount,
            cfg.exactOutput ? tokenOut.decimals : tokenIn.decimals
          ).toString()
        ),
        cfg.exactOutput ? tokenIn : tokenOut,
        +cfg.exactOutput,
        options
      );

      return route;
    } catch (err) {
      console.log(err);
      return null;
    }
  } else return null;
}

export async function executeRoute(route: SwapRoute, wallet: TWallet, slippage: number) {
  if (!route.route[0].tokenPath[0].isNative)
    await getTokenTransferApproval(
      route.route[0].tokenPath[0],
      wallet,
      route.trade.maximumAmountIn(new Percent(slippage, 10000))
    );

  await sendTransaction(
    {
      from: wallet.addr,
      data: route.methodParameters?.calldata,
      to: route.methodParameters?.to,
      value: route.methodParameters?.value,
    },
    wallet
  );
}

export async function getTokenTransferApproval(
  token: Token,
  walletInfo: TWallet,
  amount: CurrencyAmount<Currency>
) {
  try {
    const tokenContract = getTokenContract(token.address);

    const signer = new Wallet(walletInfo.pk, defaultProvider);

    console.log(
      amount.multiply(BigNumber.from(10).pow(amount.currency.decimals).toString()).toExact()
    );

    const transaction = await tokenContract
      .connect(signer)
      .approve(
        '0x13f4EA83D0bd40E75C8222255bc855a974568Dd4',
        amount.multiply(BigNumber.from(10).pow(amount.currency.decimals).toString()).toExact()
      );

    await transaction.wait();
  } catch (e) {
    console.error(e);
    throw 'Approval failure';
  }
}
