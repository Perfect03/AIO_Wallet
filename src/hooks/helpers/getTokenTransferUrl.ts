import defaultProvider from '../../scripts/rpc/defaultProvider';

export default async function getTokenTransferUrl(userAddress: string, tokenAddress: string) {
  const currentBlock = await defaultProvider.getBlockNumber();

  return (
    process.env.REACT_APP_BSCSCAN_ENDPOINT +
    'module=logs' +
    '&action=getLogs' +
    `&address=${tokenAddress}` +
    `&startblock=${0}` +
    '&topic0=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' +
    `&topic1=0x000000000000000000000000${userAddress.slice(2)}` +
    '&topic1_2_opr=or' +
    `&topic2=0x000000000000000000000000${userAddress.slice(2)}` +
    `&endblock=${currentBlock}` +
    `&apiKey=${process.env.REACT_APP_BSC_API_KEY}`
  );
}
