# yarn build란?

- 우리가 작성한 jsx, css, js, html 파일 등등을 하나로 합쳐서 Front에서 인식할 수 있는 파일로 생성해준다.
- Front에서 인식할 수 있는 파일
  - html, css, js, png, ...(jsx에선 인식 안됨)
- webpack, babel 라이브러리를 사용하게 된다.
  - webpack이란 Javascript 모듈 번들러
    - 파일을 하나로 묶어주는 기능을 한다.
    - 난독화(코드 읽기 힘들게 바꾼다), 코드 압축 등을 진행한다.
  - babel이란, Javascript 컴파일러(개발자가 작성하는 프로그래밍 언어(C++, C#, Java 등등)를 컴퓨터가 읽고 실행할 수 있는 언어(기계어, 1F23B4)로 바꿔주는 작업)이다.(babel 공식홈페이지)
    - 기존에 ES6 등 최신 Javascript 문법을 지원하지 않는 브라우저를 위해 ES5 이하의 문법으로 수정해준다.
    - Ex) import => require()
- 하나로 완성된 build 폴더 내의 파일들을 Front의 파일로 배포하게 된다.
- React로 개발된 프로젝트는 yarn build (npm build)명령어를 실행해서 build 폴더에 생성되는 파일로 웹 페이지를 배포한다.
  - AWS EC2 인스턴스에 build 폴더 내에 있는 파일, 폴더를 모두 올려서 웹페이지를 출력할 수 있다.

# Putty 입력 순서

1. sudo apt-get update

2. sudo apt-get upgrade -y(질문에서 y 바로 넘어감)

   - which services should be restarted?
     - 여러 프로그램들을 업데이트 했다.
     - 해당 프로그램들이 컴퓨터의 재시작 시 시작할 때 어떤 프로그램으로 확인을 할 것인가 설정한다.
     - 그냥 ok 눌러서 넘어가도 무관하다.(Enter로 skip 가능)
     - 최신 Linux에 추가된 기능이다.

3. sudo apt-get install -y apache2 nodejs npm mysql-server

4. sudo service apache2 status => 아파치 상태 확인

5. cd /var/www => sudo chmod 777 html -R

   - html과 html 하위 폴더들에게 777 모든 권한을 준다는 의미
   - chmod는 권한 설정 프로그램이다.
   - 777은 모든 사용자, 모든 그룹에 대해서 모든 권한을 준다.
   - -R은 하위 모든 폴더/파일에 같은 권한을 적용한다.

6. (server 여는 법) sudo mkdir server => sudo chmod 777 server -R

   - mkdir은 폴더 생성

7. cd server => npm install => npm start

8. sudo /usr/bin/mysql -u root -p - mysql 서버에 접속한다. - 초기 패스워드는 없다.

9. ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
   => '1234' 비밀번호는 mysql 비밀번호 (config 파일의 비밀번호가 같아야 함)
   => ;를 붙이지 않으면 문장이 끝나지 않는다. - "mysql>" : mysql에 접속한 상태 << 이 상태로 출력될 때 사용한다 - root 계정의 비밀번호를 1234로 수정한다. - 'root'@'localhost'
   -'localhost'는 현재 위치를 뜻하며 'localhost' => EC2 인스턴스 내의 mysql server를 뜻한다. - exit; => sudo /usr/bin/mysql -u root -p => 설정한 비번 입력해서 mysql에 정상적으로 접속되는지 확인하자

10. DB 생성

    - "mysql>" 이 상태로 수정한다.
    - show databases; << 현재 DB를 확인한다.
    - create database tesla character set utf8mb4 collate utf8mb4_general_ci; -> EC2에서 생성되는 databases

11. apache의 설정을 수정한다.

    - cd /etc/apache2/sites-available (0)
      - apache에 대한 설정이 있는 폴더이다.
      - 기본적으로 000-default.conf 파일로 설정한다.
    - sudo vi 000-default.conf (0)
      - vi << 윈도우로 생각하면 메모장과 같은 역할 (커서로만 이동 가능)
      - <VirtualHost \*:80> => 80 port로 요청이 들어오면 아래의 설정으로 응답한다.
      - <VirtualHost \*:80>로 닫는다.
      - '#'은 주석이다.
      - 'DocumentRoot'는 Root 폴더를 설정한다.
        - 현재는 "/var/www/html"로 설정되어 있다.
    - "i"를 입력하면 수정 모드로 변경된다.
      - 입력 시에는 무조건 수정보드에서 입력해야된다.
      - 수정 모드를 종료하려면 esc를 입력한다.
    - vi를 종료하고 싶을 때는 수정 모드가 아닌 상태로, 즉 아래에 "--INSERT"가 없는 상태로 ":"을 입력 후에 "q", "w", "!" 등을 입력한다.
      - "q": 종료
      - "w": 저장
      - "!": 강제
      - "wq": 강제로 저장 후에 종료해라. << "!"를 써서 강제하는 이유는 sudo를 사용했어도 저장 시에 권한이 인정되지 않을수도 있다.

    ```
        ProxyPreserveHost On
        ProxyRequests Off
        <Proxy *>
            Order deny,allow
            Allow from all
        </Proxy>
        <Location /api>
            ProxyPass http://localhost:8080/api
            ProxyPassReverse http://localhost:8080/api
        </Location>
    ```

    = 8080 port 연 곳과 proxy 설정하여 연결하고자 하는 작업
    수정 작업 후 esc > :wq!

    - ProxyPreserveHost : HTTP 요청에 대해서 Header의 Host 부분을 고정한다. << 요청을 보낸 주소를 수정하지 않는다. 클라이언트(브라우저)에서 접속한 주소를 수정하지 않고 Proxy 요청을 보낸다. 즉, node.js에 요청을 보낼 때 브라우저의 주소를 전달한다. (http://ec2-54-241-116-45.us-west-1.compute.amazonaws.com/ 주소를 보낸다는 의미)
    - ProxyRequests : On 설정의 경우 > Proxy, Off 설정의 경우 > Reverse Proxy를 설정한다.
    - Proxy : Proxy에 대한 보안 설정
      - Order : 어떤 설정을 할 것인가? deny(거절), allow(허락)
      - Allow : 접속 가능한 주소를 설정한다.
        - from All << 모든 주소에서 접근 가능
        - ex) Allow from 192.168.1.2
        - from "주소" << 해당 주소에서만 접근 가능
      - Deny : 접속 불가능한 주소를 설정한다.
    - Location : 접속한 라우터에 대한 설정 (라우터 구분)
    - ProxyPass : 요청할 주소 설정
    - ProxyPassReverse : 응답받을 주소 설정
      (ProxyPass & ProxyPassReverse 셋뚜셋뚜)

12. sudo a2enmod proxy proxy_http

    - apache의 proxy 모듈을 활성화한다.
    - apache에서 proxy를 사용하기 위해서 확장 프로그램을 활성화한다.

13. sudo service apache2 restart
    - apache2의 설정을 수정했으니 재시작한다.

====== 라우터 들어간 상태에서 새로고침을 하면 터짐 ======

14. React 프로젝트 배포 시 메인 홈페이지 이외의 라우터에서 새로고침 시 404가 출력되는 이슈 해결 방법

    - 원인: apache2에서 폴더를 먼저 찾아 연결하기 때문에 index.html(React 프로젝트)에 연결되지 않아 생기는 문제이다.
    - 해결 방법 : apache2(ubuntu 상에서)의 rewrite 모듈을 사용하여 수정한다.
    - 순서

      1. 000-default.conf 파일을 수정하자.
         - 아래의 내용 입력
         ```
             <Directory "/var/www/html">
                 AllowOverride All
             </Directory>
         ```
         - Directory : 해당 폴더/파일에 대한 설정
           - 보통
         - AllowOverride : 접근 방식에 대한 보안 설정
           - All은 새로운 접근 방식을 설정할 것이다.(덮어쓰기 가능)
      2. ".htaccess" 파일을 생성한다.

         - 해당 파일 위치 : React의 public 폴더 || React의 build 폴더 || 서버의 /var/www/html 폴더
         - 추천은 React의 public 폴더 << 해당 폴더는 yarn build 시 그대로 build 폴더에 복사된다. 단, index.html 파일은 수정된다.
           - src 폴더 내의 모든 폴더/파일은 난독화 되어 저장된다.
         - 내용은 아래와 같이 입력한다.

         ```
             Options -MultiViews
             RewriteEngine On
             RewriteCond %{REQUEST_FILENAME} !-f
             RewriteRule ^ index.html [QSA,L]
         ```

         - Options : 이름 그대로 옵션을 설정한다.
           - MultiViews : 서버의 하위 라우터가 없을 경우 비슷한 파일을 찾아서 응답한다.
         - RewriteEngine : rewrite 모듈을 사용할 것인지 설정한다.
           - On
         - RewriteCond : rewrite 모듈 적용에 대한 조건을 설정한다.
           - REQUEST_FILENAME : 서버 설정 상의 Root 폴더(/var/www/html)
           - -f : 파일이 있는지 확인한다. << 없으면 모듈을 적용한다.
         - RewriteRule : 모듈 적용 규칙
           - ^ index.html : 정규표현식으로 적혀있으면 라우터를 index.html로 수정한다.
             - ex) 125.154.3.5/어쩌구저쩌구 => 125.154.3.5/index.html
           - QSA : queryString을 붙이는 설정
           - L : 이후 다른 설정을 무시한다.

      3. sudo a2enmod rewrite
         - rewrite 모듈을 활성화한다.

15. PM2를 사용해서 Node.js의 Express 서버를 백그라운드에서 실행시키자.
    - PM2는 Node.js 프로세스를 관리하는 라이브러리이다.
    - 간단하게 설명하면 백그라운드에서 실행시켜두고 멈추고 등등 할 수 있다.
    - 순서
      1. sudo npm i -g pm2 (global로 설치)
      2. sudo pm2 start npm -- start << 경로는 서버의 경로에서 (npm은 서버에서 start하기 때문이다.)
      3. sudo pm2 list << 실행중인 Node.js 프로그램을 확인한다.
      4. sudo pm2 stop npm << npm을 멈춘다. (백그라운드만 실행)
         / sudo pm2 start npm >> 재시작
         -> ES6 문법을 사용하게 되면 이렇게 시작을 해야한다.

- ubuntu에서는 apache2이지만 linux에서는 httpd라고 한다.
  - 프로그램 설정이 살짝 다르다 단, 둘 다 apache이다.

ppk -> pem 변경
확장자 PuTTY Gen에서 변경
