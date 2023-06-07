import defaultProvider from '../../scripts/rpc/defaultProvider';

export default async function getTransferURL(userAddress: string) {
  const currentBlock = await defaultProvider.getBlockNumber();

  return (
    process.env.REACT_APP_BSCSCAN_ENDPOINT +
    'module=account' +
    '&action=txlist' +
    `&address=${userAddress}` +
    `&startblock=${0}` +
    `&endblock=${currentBlock}` +
    `&apiKey=${process.env.REACT_APP_BSC_API_KEY}`
  );
}
