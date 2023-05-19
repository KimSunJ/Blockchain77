const solc = require("solc");
// 'npx solc --bin --abi ./contracts/Test.sol' 위의 방법으로 가져오기
const fs = require("fs");
const path = require("path");

// const contractPath = path.join(__dirname, "contracts", "Test.sol");

// 비동기 형식
// { encoding: "utf-8" } : buffer 형식으로 가져온 것을 utf-8 형식으로 띄워줘라는 의미
// fs.readFile(contractPath, { encoding: "utf-8" }, (err, data) =>
//   console.log("data", data)
// );
// 동기 형식
// fs와 같은 것들은 sync를 붙여주는 방법이 있다.
// const temp = fs.readFileSync(contractPath, "utf-8");
// console.log("temp", temp);

// const data = JSON.stringify({
//   language: "Solidity",
//   sources: {
//     "Test.sol": {
//       content: fs.readFileSync(contractPath, "utf-8"),
//     },
//   },
//   settings: {
//     outputSelection: {
//       "*": {
//         "*": ["*"],
//       },
//     },
//   },
// });

// const compiled = solc.compile(data); >> JSON 형태로 출력
// const compiled = JSON.parse(solc.compile(data));
// console.log(compiled);
// fs.writeFileSync(path.join(__dirname, "Test.json"), JSON.stringify(compiled));
// console.log(compiled.contracts["Test.sol"]);

// const {
//   abi,
//   evm: { bytecode },
// } = compiled.contracts["Test.sol"].Test;
// 위의 구문은 구조할당
// const abi = compiled.contracts["Test.sol"].Test.abi;

// console.log("abi",abi); / test_sol_Test.abi 파일 내용이 나온다.
// console.log(bytecode);
// console.log("bin", bytecode.object); / test_sol_Test.bin 파일 내용이 나온다.

// fs.writeFileSync(
//   path.join(__dirname, "bytecode.json"),
//   JSON.stringify(bytecode)
// );
// const bin = compiled.contracts["Test.sol"].Test.evm.bytecode.object;

class Compiler {
  /**
   *
   * @param {string} _filename 파일 이름
   */
  static compile(_filename) {
    const contractPath = path.join(__dirname, "contracts", _filename);
    const data = JSON.stringify({
      language: "Solidity",
      sources: {
        [_filename]: {
          content: fs.readFileSync(contractPath, "utf-8"),
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    });
    // console.log("data", data);
    const compiled = solc.compile(data);
    return Compiler.writeOutput(JSON.parse(compiled));
  }
  /**
   *
   * @param {*} _compiled 컴파일된 솔리디티 객체
   */
  static writeOutput(_compiled) {
    const result = {};

    for (const contractFileName in _compiled.contracts) {
      console.log(contractFileName);
      const [contractName] = contractFileName.split(".");
      console.log(contractName);
      // abi를 뽑아내기 위한 과정
      // 구조분해할당
      const contract = _compiled.contracts[contractFileName][contractName];
      //  const contract = _compiled.contracts["Test.sol"].Test;
      //  객체에서 키에 대한 값을 가져오는데 키를 변수로 입력할 경우 대괄호([])를 사용한다.
      const abi = contract.abi;
      const bytecode = contract.evm.bytecode.object;
      const tempObj = { abi, bytecode };
      const buildPath = path.join(__dirname, "build", `${contractName}.json`);
      fs.writeFileSync(buildPath, JSON.stringify(tempObj)); // sync 자체가 async await 처럼 기다렸다가 실행해준다.
      // fs.writeFileSync(
      //   path.join(__dirname, "build", `${contractName}.abi`),
      //   JSON.stringify(abi)
      // );
      // fs.writeFileSync(
      //   path.join(__dirname, "build", `${contractName}.bin`),
      //   JSON.stringify(bytecode)
      // );

      result[contractName] = tempObj;
    }
    return result;
  }
}

module.exports = Compiler;
