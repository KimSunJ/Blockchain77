const request = axios.create({
  method: "POST",
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json",
  },
});

const walletListElem = document.getElementById("wallet-list");
const accountElem = document.getElementById("account");
const balanceElem = document.getElementById("balance");
const selectElem = document.getElementById("select-account");

let isCreating = false;
// 비밀번호가 들어가지 않아도 생성이 되는 것을 방지
let interval;
let accounts = [];

async function mineStop() {
  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "miner_stop",
      params: [],
    },
  });
  clearInterval(interval);
  // clearInterval만 하면 값이 초기화 되지 않는다.
  interval = undefined;
}

async function getBalance(_account) {
  const {
    data: { result },
  } = await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: [_account, "latest"],
    },
  });
  balanceElem.innerHTML =
    parseInt(parseInt(result, 16) / Math.pow(10, 15)) / 1000;
  // 뒤의
  // (parseInt(result, 16) / Math.pow(10, 18)) ETH 10의 18승이기 때문
  // parseInt(result, 16) >> 16진수를 10진수로 나눴다.
}

async function getWallet(_account) {
  if (interval !== undefined) mineStop();
  // 다른 계정을 눌렀을 경우 interval을 멈춘다.
  accountElem.innerHTML = _account;
  await getBalance(_account);
  selectElem.innerHTML = "";

  accounts.forEach((item) => {
    if (item !== _account)
      selectElem.innerHTML += `<option value="${item}">${item}</option>`;
  });
}

async function getAccounts() {
  const {
    data: { result },
  } = await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "eth_accounts",
    },
  });
  // console.log(result); >> 지갑 리스트 가져옴
  walletListElem.innerHTML = "";
  // 지갑리스트를 html 출력
  result.forEach((item) => {
    walletListElem.innerHTML += `<li onclick="getWallet('${item}')">${item}</li>`;
  });
  accounts = result;
}
getAccounts();
mineStop();

document.forms["new-wallet"].onsubmit = async function (e) {
  e.preventDefault(); // 기존에 실행하던 방식은 하지 말고
  if (e.target["new-pw"].value.length < 5 || isCreating) return;
  // 비밀번호 예외처리
  // isCreating true면 return
  isCreating = true;
  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "personal_newAccount",
      params: [e.target["new-pw"].value],
    },
  });
  await getAccounts();
  e.target["new-pw"].value = "";
  isCreating = false;
  // 비밀번호가 들어가지 않아도 생성이 되는 것을 방지
};

document.getElementById("start").onclick = async function () {
  if (accountElem.innerHTML === "") return;
  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "miner_setEtherbase",
      params: [accountElem.innerHTML],
    },
  });
  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "miner_start",
      params: [],
    },
  });
  interval = setInterval(() => {
    getBalance(accountElem.innerHTML);
  }, 2000);
};

document.getElementById("stop").onclick = mineStop;
// onclick = mineStop(); >> mineStop 함수의 return 값이 적용된다.
// onclick = mineStop; >> mineStop 함수를 실행시킨다.

document.forms["transaction"].onsubmit = async function (e) {
  e.preventDefault();
  let to = selectElem.value;
  if (e.target["transaction-account"].value)
    to = e.target["transaction-account"].value;
  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "personal_unlockAccount",
      params: [accountElem.innerHTML, e.target["tran-pw"].value],
    },
  });
  const data = await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "eth_sendTransaction",
      params: [
        {
          from: accountElem.innerHTML,
          to,
          value:
            "0x" + (e.target["ether"].value * Math.pow(10, 18)).toString(16),
        },
      ],
    },
  });
  console.log(data);
};
// metamask-account 출력
document.forms["check"].onsubmit = async function (e) {
  e.preventDefault();
  getWallet(e.target["metamask-account"].value);
};
