/// <reference types="react-scripts" />

import { ExternalProvider } from '@ethersproject/providers';

declare global {
  interface Window {
    ethereum?: ExternalProvider & { selectedAddress: string };
  }

  interface URLSearchParams {
    ref: string;
  }
}
