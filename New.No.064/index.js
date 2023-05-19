const net = require("net");

const reqParser = require("./lib/req");
const resParser = require("./lib/res");

global.isJson = true;
global.board = ["asdf", "qwer", "1234"]; // 게시판 목록이다.

const server = net.createServer((client) => {
  // TCP 서버를 만든다.
  client.on("data", (data) => {
    // 연결된 client가 요청을 보낸다.
    // 연결이 생성됐을 때 그 연결된 클라이언트에서 요청이 들어오는 것을 처리한다.
    const req = reqParser(data.toString());
    const res = resParser(client, req);
    console.log(req.path);

    // 라우터 구현
    // req, 요청으로 들어온 정보를 가져와서 path와 method에 따라 라우터를 구분하여 응답을 보낸다.
    if (req.method === "GET" && req.path === "/") {
      // app.get('/',(req,res)=>{})
      // GET 형식으로 / 라우터로 요청이 왔을 때 public 폴더의 index.html 파일로 응답한다.
      res.sendFile("index.html");
    } else if (req.method === "GET" && req.path === "/index.css") {
      res.sendFile("index.css");
      // app.get('/index.css',(req,res)=>{})
      // css 파일을 보내도록 설정
    } else if (req.method === "GET" && req.path === "/index.js") {
      res.sendFile("index.js");
      // app.get('/index.js',(req,res)=>{})
      // js 파일을 보내도록 설정
    } else if (req.method === "GET" && req.path === "/board") {
      res.sendFile("board.html");
      // app.get('/board',(req,res)=>{})
    } else if (req.method === "GET" && req.path === "/board/list") {
      res.send(JSON.stringify(global.board));
      // JSON.stringify => json으로 변환한다.
      // string + -ify => string, 문자열로 -ify, ~화 한다. => 문자열로 변환한다.
      // localhost:4193/board/list => ["asdf", "qwer", "1234"] 을 출력
      // localhost:4193/board => li append 파일이 문자열 형식으로 바꿔서 출력한다.
    } else if (req.method === "POST" && req.path === "/board/add") {
      global.board.unshift(req.body.value);
      res.send(JSON.stringify(global.board));
    } else {
      res.send("404");
      // app.get, app.post, app.route('/').get().post()
      // app.get('/*',(req,res)=>{})
      // 들어온 요청의 형식과 라우터가 정해진 형식과 라우터가 아닐 시 404를 응답한다.
      // 경로를 설정하고, 정해진 경로를 통해 파일을 확인하고 적용시킨다.
    }

    // res.send("Hi Block 7 with res send");
    // res.sendFile("index.html");
  });

  client.on("close", () => {
    // 요청한 파일을 보내고 연결을 끊었단 의미
    // 연결된 클라이언트가 연결을 끊었다. >> Buffer > 'Connection: Close'를 통해
    console.log("요청에 대한 응답 완료");
  });
});

server.on("close", () => {
  // 연결 자체가 끊겼을 때
  console.log("연결이 끊겼다.");
});

server.on("connection", () => {
  // 클라이언트와 연결이 생성됐을 때, handshaking 이뤄짐
  console.log("연결이 생겼다.");
});

server.listen(4193, "127.0.0.1", () => {
  // 서버를 연다, 요청받을 준비를 해둔다.
  console.log("4193 서버를 열었다.");
});
// 파일마다 연결을 할 때마다 '연결이 생겼다' 라고 반응하는 것.
// 처음 연결이 생겼다 두번 생기는 이유는 favicon이 반응을 제대로 안했기 때문에 다시 연결 시도를 하고 있어서이다.

// client가 준비가 됐어 요청을 보낼게 => 서버-> 브라우저에게 요청을 보내도 돼, 보내줘도 돼
// 서버를 주고 받는 과정 (핸드셰이킹)
