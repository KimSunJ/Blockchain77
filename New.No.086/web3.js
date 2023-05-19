const Web3 = require("web3");

let instance;

class Client {
  constructor(_url) {
    if (instance) return instance;
    // instance 있으면 실행해주기 때문에 메모리를 절약해준다. instance : 복사된 인스턴스 (단 하나만의 클래스를)
    this.web3 = new Web3(_url);
    instance = this;
  }
}

module.exports = Client;
