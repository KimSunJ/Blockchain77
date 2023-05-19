// 설치 명령어 ==========================
// npm i merkle (머클트리를 편하게 쓸 수 있게 도와주는 라이브러리 설치)
const merkle = require("merkle");
// ===================================
const data = ["15131", "sldkfjsdf", "길동이야", "123123"];
// 머클 트리
// 인자값 : 암호화 방법
// sync(data) 함수로 트리를 만들어 준다. sync 동기화 매소드(복호화를 동기화한다.)
const merkleTree = merkle("sha256").sync(data);
//root(): 생성한 머클트리의 root 값을 가져오는 함수
const root = merkleTree.root();

// SHA256(문자열).toString().toUpperCase()
// 머클 트리에서 sha256 알고리즘을 사용하는데 문자열로 변환과 대문자로 변환을 둘다 해주고 값을 반환해준다.

console.log(root);
console.log(root.length);
// C2C5D2D66009FB98CEA84B4BED42C7BAF5B81FD0E1C389401465BD19FC478AFC merkle루트의 값
// SHA256(문자열).toString() > 상태에서 대문자처리까지 된 값이 root
