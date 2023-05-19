const http = require("http");
const fs = require("fs").promises;

// const app = express();와 같은 의미
// app.use((req, res)=>{})
// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/html; charaset=uft-8" });
//     res.write("<h1>Hello</h1>");
//     res.end("<p>End</p>");
//   })
//   .listen(8080, () => {
//     console.log("8080번 포트를 접속해봐");
//   });

http
  .createServer(async (req, res) => {
    try {
      if (req.method === "GET") {
        if (req.url === "/") {
          const data = await fs.readFile("./web/index.html");
          return res.end(data);
        }
      } else if (req.method === "POST") {
        if (req.url === "/api/user") {
          const data = await fs.readFile("./web/index.html");
          return res.end(data);
        }
      } else if (req.method === "OPTIONS") {
      } else if (req.method === "PUT") {
      } else if (req.method === "DELETE") {
        if (req.url === "/") {
          // req.method === "GET"일때와 다른 내용이 들어갈 수 있다.
        }
      }
    } catch (err) {
      console.log(err);
    }
  })
  .listen(8080, () => {
    console.log("8080 포트엽니다");
  });
// 얘를 기반으로 만들어진게 express이다
