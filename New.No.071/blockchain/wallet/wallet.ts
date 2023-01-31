import { SHA256, lib } from "crypto-js";
import elliptic from "elliptic";
// 데이터(지갑 계정)을 저장하기 위해서
import fs from "fs";
import path from "path";

// 지갑 계정을 저장할 위치
const addressDir: string = path.join(__dirname, "../walletData");

const ecc: elliptic.ec = new elliptic.ec("secp256k1");

class Wallet implements IWallet {
  // implements 참고하여 비교하는 것 / 규칙
  public address: string;
  public publicKey: string;
  public privateKey: string;
  public balance: number;

  constructor(_privateKey: string = "") {
    this.privateKey = _privateKey || this.getPrivateKey();
    this.publicKey = this.getPublicKey();
    this.address = this.getAddress();
    // privateKey를 만들고 그 기준으로 publicKey를 만들고 address를 만들었다.
    this.balance = 0;

    const fileName = path.join(addressDir, this.address);
    // wallet 주소로 파일을 만들고 있음
    fs.writeFileSync(fileName, this.privateKey);
  }

  public getAddress(): string {
    return this.publicKey.slice(26);
  }
  public getPrivateKey(): string {
    return lib.WordArray.random(32).toString().toUpperCase();
  }
  public getPublicKey(): string {
    return ecc
      .keyFromPrivate(this.privateKey) // 중요한 부분
      .getPublic() // 공개키 가져오는 메서드
      .encode("hex", true)
      .toUpperCase();
  }

  static getList(): Array<string> {
    const files: Array<string> = fs.readdirSync(addressDir);
    // Array<string> === string[]
    return files;
  }

  static getWalletPrivateKey(_address) {
    const filePath = path.join(addressDir, _address); // 파일 가져오기
    const fileContent = fs.readFileSync(filePath);
    return fileContent.toString();
  }

  static createSign(_data) {
    const hash = SHA256(_data.sender.publicKey + _data.received + _data.amount)
      .toString()
      .toUpperCase();
    const privateKey = Wallet.getWalletPrivateKey(_data.sender.address);
    const keyPair = ecc.keyFromPrivate(privateKey);
    return keyPair.sign(hash, "hex");
  }

  // { sender: { publicKey, address }, received, amount };
}

export default Wallet;
