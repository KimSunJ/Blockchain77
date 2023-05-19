const keythereum = require("keythereum");
// const path = require("path");

const address = "0x81c225faa727fc064f2e7ec62caeada716d6adc4";
// keystore / 1번째 계정의 address + 0x
// address가 16진수라는 것을 알려주기 위해 0x를 붙여준다. (ex_ metamask account 0xB9B...ff49f 처럼)

const keyObj = keythereum.importFromFile(address, __dirname);

const privateKey = keythereum.recover("1234", keyObj);

console.log("privateKey : ", privateKey.toString("hex"));
// 개인키 2e7ebd6e8f34103e498bd90c1785e7fd1981c9888d83d6911b77ffd285379bc7
// ganache metamask에 개인키로 0x를 붙여 계정 가져오기 하면 계정 주소(0x81C225fAa727FC064f2E7eC62CAEAda716D6Adc4)가 address와 같다.
