import { ethers } from 'ethers';
import { computePoolAddress } from '@uniswap/v3-sdk';
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { POOL_FACTORY_CONTRACT_ADDRESS, QUOTER_CONTRACT_ADDRESS } from '../libs/constants';
import defaultProvider from '../../rpc/defaultProvider';
import { toReadableAmount, fromReadableAmount } from '../libs/conversion';
import { Token } from '@uniswap/sdk-core';

export type Config = {
  amountIn: number;
  in: Token;
  out: Token;
};

export async function quote(params: Config): Promise<string> {
  const quoterContract = new ethers.Contract(QUOTER_CONTRACT_ADDRESS, Quoter.abi, defaultProvider);
  console.log(params);
  const poolConstants = await getPoolConstants(params);

  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    poolConstants.token0,
    poolConstants.token1,
    poolConstants.fee,
    fromReadableAmount(params.amountIn, params.in.decimals).toString(),
    0
  );

  return toReadableAmount(quotedAmountOut, params.out.decimals);
}

async function getPoolConstants(params: Config): Promise<{
  token0: string;
  token1: string;
  fee: number;
}> {
  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: params.in,
    tokenB: params.out,
    fee: 500,
  });
  console.log(currentPoolAddress);

  console.log(params);

  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3PoolABI.abi,
    defaultProvider
  );

  console.log(poolContract);
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);

  return {
    token0,
    token1,
    fee,
  };
}
