/// <reference types="react-scripts" />

import { MetaMaskInpageProvider } from "@metamask/providers";
// type 지정해준 곳
// pinata type
// useWeb3.ts => window.ethereum을 인식한다.
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
