import Transaction from "@core/transaction/Transaction";
import UnspentTxOut from "@core/transaction/UnspentTxOut";
import { SHA256 } from "crypto-js";
import elliptic from "elliptic";

const ecc = new elliptic.ec("secp256k1");

type TSignature = elliptic.ec.Signature;

class Wallet {
  public publicKey: string;
  public address: string;
  public balance: number;
  public signature: TSignature;

  constructor(
    _sender: string,
    _signature: TSignature,
    _utxos: Array<IUnspentTxOut>
  ) {
    this.publicKey = _sender;
    this.address = Wallet.getAddress(this.publicKey);
    // getAddress => wallet.ts에서 만든 것과 다른 서버에서 만든 Wallet이다.
    this.balance = Wallet.getBalance(this.address, _utxos);
    this.signature = _signature;
  }

  static getAddress(_publicKey: string): string {
    return _publicKey.slice(26);
  }

  static getBalance(_address: string, _utxos: Array<IUnspentTxOut>) {
    // 잔액 계산
    return _utxos
      .filter((item) => item.address === _address)
      .reduce((prev, curr) => prev + curr.amount, 0);

    // 속도가 아래 구문이 빠르다.
    // let temp = 0;
    // for (let i = 0; i < _utxos.length; ++i) {
    //   if (_utxos[i].address === _address) temp += _utxos[i].amount;
    // }
    // return temp;
  }

  static verify(_receivedTx: {
    sender: string;
    received: string;
    amount: number;
    signature: TSignature;
  }): TResult<undefined, string> {
    console.log("5-11 서명 확인");
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
  static sendTransaction(
    _receivedTx: {
      sender: string;
      received: string;
      amount: number;
      signature: TSignature;
    },
    _utxos: Array<IUnspentTxOut>
  ) {
    const isValid = Wallet.verify(_receivedTx);
    if (isValid.isError === true) return isValid;

    const wallet = new this(_receivedTx.sender, _receivedTx.signature, _utxos);
    // 임시 지갑(wallet) 새로 생성
    if (wallet.balance < _receivedTx.amount) {
      // _receivedTx.amount: 보낼 돈 wallet.balance: 가진 돈
      return { isError: true, msg: "잔액 부족" };
    }

    const myUTXO = UnspentTxOut.getMyUTXO(wallet.address, _utxos);
    const tx = Transaction.createTx(_receivedTx, myUTXO);
    return { isError: false, value: tx };
  }
}

export default Wallet;
