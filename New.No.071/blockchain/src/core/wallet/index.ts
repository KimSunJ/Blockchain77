import { SHA256 } from "crypto-js";
import elliptic from "elliptic";

const ecc = new elliptic.ec("secp256k1");

type TSignature = elliptic.ec.Signature;

class Wallet {
  public publicKey: string;
  public address: string;
  public balance: number;
  public signature: TSignature;

  constructor(_sender: string, _signature: TSignature) {
    this.publicKey = _sender;
    this.address = Wallet.getAddress(this.publicKey);
    // getAddress => wallet.ts에서 만든 것과 다른 서버에서 만든 Wallet이다.
    this.balance = 0;
    this.signature = _signature;
  }

  static getAddress(_publicKey: string): string {
    return _publicKey.slice(26);
  }

  static verify(_receivedTx: {
    sender: string;
    received: string;
    amount: number;
    signature: TSignature;
  }): TResult<undefined, string> {
    const { sender, received, amount, signature } = _receivedTx;
    // Tx : transaction 의 약자
    const hash = SHA256(sender + received + amount) // publicKey == sender
      .toString()
      .toUpperCase();
    const keyPair = ecc.keyFromPublic(sender, "hex");
    const isValid = keyPair.verify(hash, signature);
    if (!isValid) return { isError: true, msg: "서명 오류" };
    return { isError: false, value: undefined };
  }
  // {
  //   sender: '032374A62657A8159574673C1717B735159F3445BC1E9E617B323CBD0FB58BD965',
  //   received: '17B735159F3445BC1E9E617B323CBD0FB58BD965',
  //   amount: '5',
  //   signature: {
  //     r: 'ea1daa82957014ee229fcb1fb45029a54e244034caac114a272c31905d26c32',
  //     s: '4f8bf16306286039d1c74999cdeff728fbd60a3e0e6481c7d2fb7593c2155393',
  //     recoveryParam: 0
  //   }
  // } >> 그대로 받아서 보내겠단 것이다.
}

export default Wallet;
