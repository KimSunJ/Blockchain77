// npm run start:dev
import { useCallback, useState } from "react";
import Web3 from "web3";

export const useWeb3 = (): {
  web3: Web3 | undefined;
  // web3?: Web3;
  account: string;
  chainId: string | null;
  logIn: () => void;
  // logIn: () => undefined; 와 같다.
} => {
  const [web3, setWeb3] = useState<Web3 | undefined>();
  const [account, setAccount] = useState<string>("");
  const [chainId, setChainId] = useState<string | null>("");

  const logIn = useCallback(async () => {
    // '처음(마운트시에만)에만 정의해라' 라는 의미
    // [] (조건에 따라서) 함수를 정의하겠다는 의미
    try {
      if (window.ethereum) {
        const _web3 = new Web3((window as any).ethereum);
        // Web3가 받을 수 있는 것이 여러가지라서
        setWeb3(_web3);
        // window as any >> window 타입을 모르기 때문에 any를 붙임

        const [_account] = (await window.ethereum.request({
          method: "eth_requestAccounts",
        })) as Array<string>;
        // type을 중복으로 써주면서 타입을 확실히 해두기
        if (_account) {
          setAccount(_account);
        }
        window.ethereum.on("accountsChanged", async () => {
          if (window.ethereum) {
            const [_account] = (await window.ethereum.request({
              method: "eth_requestAccounts",
            })) as Array<string>;
            setAccount(_account);
          }
        });
        setChainId(window.ethereum.networkVersion);
      } else {
        console.log("MetaMask is not exist");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { web3, account, chainId, logIn };
};
