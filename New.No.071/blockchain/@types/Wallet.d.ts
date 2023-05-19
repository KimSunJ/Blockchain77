declare interface IWallet {
  address: string;
  publicKey: string;
  privateKey: string;
  balance: number; // 잔액 (돈)

  getPrivateKey(): string;
  getPublicKey(): string;
  getAddress(): string;
}
