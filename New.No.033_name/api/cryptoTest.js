const crypto = require("crypto-js");

// 단방향 - Hashing ==============================
console.log(crypto.SHA256("slkdjf").toString());
// .toString() >> DB에 저장시 사용
// 842633b92752b2265700860fe6d84dcecb36e98b46f077d00d79120b288c651d로 변환시켜준다 toString()

console.log(crypto.SHA256("1").toString());
// 6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b >> 해싱 결과값
// 왜 가장 보편화되어 있을까? 길이가 중간지점이기도 하고, 중복이 적당하게 나오기도 해서 많이 사용한다.

console.log(crypto.MD5("sdfsdfsdfsd").toString());
// bd9abe38537ecd5f65f15352263acea1 >> 해싱마다 길이가 정해져 있다.
// 중복이 많다.

console.log(crypto.SHA1("sdfsdfsdfsd").toString());
// 2e5e9a955d9785c340087b703d0bccf9c6ec2a77

console.log(crypto.SHA512("sdfsdfsdfsd").toString());
// 0b8295571dd76189198fcf534d011b69312602508bdb57bc231a0f4a88e0153164f28e4e8445bf73d5dd9e84c40987e74d6a2ef0d69b15a33a28534b94b5d27c

console.log(crypto.RIPEMD160("sdfsdfsdfsd").toString());
// 69d1ff5d0ef8b1e773200822f8440eb48d52536d

// 양방향 ===============================================
const tempAES = crypto.AES.encrypt(
  "대칭키: decrypt=encrypt key값이 같아야 나오는 data",
  "key"
).toString();
// DB에 넣어 보안을 챙김
console.log(tempAES);
console.log(crypto.AES.decrypt(tempAES, "key").toString(crypto.enc.Utf8));
// 대칭키 암호화여서 key가 같아야 함. / 비대칭 키일땐 key가 다르고 openSsl을 사용해야 한다.
