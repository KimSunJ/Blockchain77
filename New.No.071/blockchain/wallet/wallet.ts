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
    console.log("2-3 / 4-4 지갑 생성 시작");
    // 2-3, 4-6
    this.privateKey = _privateKey || this.getPrivateKey();
    this.publicKey = this.getPublicKey();
    this.address = this.getAddress();
    // privateKey를 만들고 그 기준으로 publicKey를 만들고 address를 만들었다.
    this.balance = 0;

    console.log(
      "2-6/4-7 지갑 주소 이름으로 파일 생성하고, 그 내용으로 개인키 저장"
    );
    // 2-4, 4-7
    const fileName = path.join(addressDir, this.address);
    // wallet 주소로 파일을 만들고 있음
    fs.writeFileSync(fileName, this.privateKey);
  }

  public getAddress(): string {
    console.log("2-5/4-6 공개키로 지갑 주소 생성");
    return this.publicKey.slice(26);
  }
  public getPrivateKey(): string {
    console.log("2-3-1 개인키가 없으면 생성하자");
    return lib.WordArray.random(32).toString().toUpperCase();
  }
  public getPublicKey(): string {
    console.log("2-4/4-5 개인키로 공개키 생성");
    return ecc
      .keyFromPrivate(this.privateKey) // 중요한 부분
      .getPublic() // 공개키 가져오는 메서드
      .encode("hex", true)
      .toUpperCase();
  }

  static getList(): Array<string> {
    console.log("3-3 walletData 폴더의 파일 목록을 가져온다.");
    const files: Array<string> = fs.readdirSync(addressDir);
    // Array<string> === string[]
    return files;
  }

  static getWalletPrivateKey(_address) {
    console.log(
      "4-3/5-5 지갑 주소 파일명으로 파일을 불러와서 그 내의 개인키를 가져온다."
    );
    const filePath = path.join(addressDir, _address); // 파일 가져오기
    const fileContent = fs.readFileSync(filePath);
    return fileContent.toString();
  }

  static createSign(_data) {
    console.log("5-4 서명 생성 시작");
    const hash = SHA256(_data.sender.publicKey + _data.received + _data.amount)
      .toString()
      .toUpperCase();
    const privateKey = Wallet.getWalletPrivateKey(_data.sender.address);
    const keyPair = ecc.keyFromPrivate(privateKey);
    console.log("5-6 서명 반환(return)");
    return keyPair.sign(hash, "hex");
  }

  // { sender: { publicKey, address }, received, amount };
}

export default Wallet;
