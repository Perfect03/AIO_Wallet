import { useEffect, useState } from 'react';
import getPresaleContract from '../scripts/quoting/presale/getPresaleContract';
import metamaskProvider from '../scripts/rpc/metamaskProvider';

export default function useFetchVestingData(): [number, number] {
  const [lockedAmt, setLockedAmt] = useState(0);
  const [claimableAmt, setClaimableAmt] = useState(0);

  useEffect(() => {
    (async () => {
      const contract = getPresaleContract();
      const account = (await metamaskProvider.send('eth_accounts', []))[0];

      const newClaimableAmt = await contract['claimableAmount(address)'](account);
      setClaimableAmt(newClaimableAmt.div(1e9).toNumber());

      const newLockedAmt = await contract['userVesting(address)'](account);
      setLockedAmt(newLockedAmt[0].div(1e9).toNumber());

      const listener = async (user: string) => {
        if (user.toLowerCase() == account.toLowerCase()) {
          const newLockedAmt = await contract['userVesting(address)'](account);
          setLockedAmt(newLockedAmt[0].div(1e9).toNumber());
        }
      };
      contract.on('Purchase', listener);

      return () => contract.off('Purchase', listener);
    })();
  });

  return [lockedAmt, claimableAmt];
}
