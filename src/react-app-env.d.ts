/// <reference types="react-scripts" />

import { ExternalProvider } from '@ethersproject/providers';

declare global {
  interface Window {
    ethereum?: ExternalProvider & { selectedAddress: string };
    request?: (param: { method: string; params: Array }) => void;
  }

  interface URLSearchParams {
    ref: string;
  }
}
