const net = require("net");
// net은 Node.js에서 제공하는 TCP 서버를 열 수 있는 모듈이다.

// express, express-session, morgan, cookie-parser, dotenv << npm에 올라와있는 라이브러리이다.
//  -> net과의 차이점 : 차이는 딱히 없으나, Node.js 자체 설치 여부일 뿐이다.
// net과 비슷한 모듈 : path

// Buffer란?
// Node.js에서 사용하는 바이너리 데이터를 저장하는 객체
//   - binary data << 이진 데이터 << 컴퓨터가 저장, 처리 등등 계산을 할 때 사용한다.
// RAM 등에 저장되는 데이터를 저장된 그대로 보여준다. (보여줄 때는 16진수로 바꿔서 보여준다.)
//   - 101000101011001101010001(원래 Buffer의 형태) => A2B351(보여주는 Buffer의 형태)
// 한번 생성하면 크기를 변경할 수 없다.
//   - 배열의 경우 push 몇개까지 될까? << 모른다. < 정하지 않는다.
//   - 버퍼는 처음 정한 크기를 넘겨 저장할 수 없다.
// 생성 방법
// 1. 데이터를 받아서 버퍼로 변환한다.
const tempBuffer1 = Buffer.from("buffer test 'from'");
{
  /* <Buffer 
  62 75 66 66 65 72 20 
  74 65 73 74 20 
  27 66 72 6f 6d 27> */
}
console.log(tempBuffer1.toString(), tempBuffer1);
const tempBuffer2 = Buffer.from("가 각 갂 갃 간 갇 갈 한글 테스트");
// 20 > 띄어쓰기
{
  /* <Buffer 
    ea b0 80 20 
    ea b0 81 20
    ea b0 82 20
    ea b0 83 20
    ea b0 84 20
    ea b0 87 20 
    ea b0 88 20 
    ed 95 9c ea b8 80 20 
    ed 85 8c ec 8a a4 ed 8a b8> */
}
// URL Encode << URL에서 사용하는 포멧
// %ea%b0%80 << URL에 한글로 사용하여 뜨는 경우
console.log(tempBuffer2.toString(), tempBuffer2);

const tempBufferArr1 = Buffer.from([0, 1, 2, 300]);
// Buffer.from([0,1,2]) => <Buffer 00 01 02>
// 300은 44가 찍힌다 => 이유는 255까지만 저장 가능하기 때문에 넘어갈 경우 256을 빼서 남은 값을 저장한다. << 256으로 나눈 나머지 값만 저장한다.
// FF => 1111 1111 << 8bit == 1byte => 256개만 가질 수 있는 것
// Buffer 1개당 1byte를 갖는다.
console.log(tempBufferArr1);

const tempBufferArr2 = Buffer.from(["가", "나", "다"]);
// Buffer.from(["가", "나", "다"]) => <Buffer 00 00 00>
console.log(tempBufferArr2);
// toString 해도 아무것도 찍히지 않음
// 한글 등등은 넣을 수 없다.
// 배열을 버퍼로 변환 시 아이템 하나하나가 버퍼 한칸한칸으로 변환된다.
// 버퍼는 16진수로 최대 FF(255)까지만 나타낼 수 있다.

// 2. 버퍼의 길이를 정해 버퍼를 만든다.
const tempBuffer3 = Buffer.alloc(5); // => 저장 가능한 길이를 지정해주는 것
// => <Buffer 00 00 00 00 00>
tempBuffer3[3] = 255;
// => <Buffer 00 00 00 ff 00> / 배열 4번째가 ff 라는 뜻
console.log(tempBuffer3);

console.log(tempBuffer3.length); // 버퍼의 길이
tempBuffer3.write("abcdefghjklmnopqrstuvwxyz"); // 남은 알파벳은 버린다.
console.log(tempBuffer3.toString());

const tempBuffer4 = Buffer.from([0x62, 0x63, 0x64, 0x65, 0x66]); // >> console 내용 : bcdef
// 16진수는 '0x'XX로 바로 작성 가능하다. => 0x11 = 17 (16 + 1)
// 8진수는 앞에 0을 하나 더 작성한다. => 015 => 13 (8 + 5)
// const tempBuffer4 = Buffer.from([99, 100, 101, 102, 103, 104, 105]); >> console 내용 : cdefghi
console.log(tempBuffer4.toString(), 0x62);
// ASCII CODE에서 가져온 해당 알파벳이 출력된다.
// ==========================================
// Java에서 Buffer를 사용하면 파일을 더 빨리 받아온다 => 컴퓨터가 계산, 저장하는 2진수를 그대로 가져오기 때문에 빠른 것

const server = net.createServer((client) => {
  // TCP 서버를 생성한다.
  // 컴퓨터가 데이터를 처리할 때 2진수로 처리한다.
  // 2진수를 저장하려면, Buffer를 사용한다 => data를 받으면 그 데이터(정보)는 Buffer이다.
  client.on("data", (data) => {
    console.log(data.toString()); // 한번은 HTTP와 연결하고, 한번은 favicon과 연결한다.
    // GET / HTTP/1.1 << 어떤 메서드를 사용해서 어떤 라우터(주소)로 어떤 프로토콜로 보냈는지에 대한 정보이다. -> 쿼리스트링(GET /?name=asdfasdf HTTP/1.1)도 포함된다.
    // Host: localhost:4193 << 요청한 주소(어떤 주소로 요청했는가?)
    // Connection: keep-alive << 통신 연결에 대한 설정, keep-alive : 연결을 유지해라 / http 통신 자체가 일정 시간 연결을 끊는다.
    // Cache-Control: max-age=0 << 캐시 제어 설정, max-age = 0 : 바로 삭제된다.
    // sec-ch-ua: "Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109" << 간략한 브라우저의 버전 정보
    // sec-ch-ua-mobile: ?0 << 간략한 브라우저의 버전 정보
    // sec-ch-ua-platform: "macOS" << OS 정보
    // Upgrade-Insecure-Requests: 1 << 암호화되고 인증된 응답에 대한 클라이언트의 기본 설정
    // User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 << 브라우저의 각종 버전 정보
    // Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9 << 브라우저에서 요청한 정보 타입, 앞에서부터 우선순위
    // Sec-Fetch-Site: none << CORS 설정 : 해당 정보를 요청한 주소가 서버의 주소가 맞는가?, 서버의 데이터를 조금이라도 안전하게 지키기 위해서 확인한다.
    // Sec-Fetch-Mode: navigate << CORS 설정
    // Sec-Fetch-User: ?1 << CORS 설정
    // Sec-Fetch-Dest: document << CORS 설정
    // Accept-Encoding: gzip, deflate, br << 브라우저가 이해할 수 있는 인코딩, 읽을 수 있는 인코딩
    // Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7 << 브라우저가 이해할 수 있는 언어

    // [방법 1]
    // client.write(`HTTP/1.1 200 OK
    //Connection: Close
    //Content-Typ: image/avif,image/webp,image/apng,*/*;q=0.8; charset=UTF-8
    //Content-Length: 10

    //Hi Block 7`);

    // [방법 2]
    // client.write(
    //   `HTTP/1.1 200 OK\nConnection: Close\nContent-Typ: image/avif,image/webp,image/apng,*/*;q=0.8; charset=UTF-8\nContent-Length: 10\n\nHi Block 7`
    // );
    // 띄어쓰기가 아예 없어야 함(원래는)
    // 줄바꿈, 띄어쓰기 등등 모든 규칙을 잘 지켜야한다.
    // \n\r or \n
    // 프로토콜 HTTP상태코드 메시지
    // Connection: Close << 연결 끊어라
    // Content-Type: 어떤 데이터로 응답할것인가, 어떤 정보를 보낼지 포멧(확장자 등등)을 설정, charset은 언어 포멧 설정
    // Content-Length: 데이터의 길이
    // << 줄바꿈 한번 있어야 함
    // 보낼 데이터
  });
});
server.on("close", () => {
  // Socket 했을 때와 마찬가지로 통신에 대한 이벤트를 추가한다.
  console.log("연결이 끊겼다.");
});
server.on("connection", () => {
  // >> localhost:4193 => console.log() 실행
  console.log("연결이 생겼다.");
});

server.listen(4193, "127.0.0.1", () => {
  // listen << 서버가 들을 준비를 한다.
  //   - 즉, 요청을 받을 수 있도록 대기한다.
  // 매개변수로는 (port, ip, 서버 열고 실행할 함수)
  // 127.0.0.1 => 예약된 IP 주소이다.
  console.log("서버를 열었다.");
});
