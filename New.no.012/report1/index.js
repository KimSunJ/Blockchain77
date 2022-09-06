let sn = parseInt(prompt(`홀수 찍기`));
// console.log(sn);

for (let i = 0; i <= (sn - 1) / 2; ++i) {
  const com = 2 * i + 1;
  console.log(com);
}

sn = [];

let sn2 = parseInt(prompt(`짝수 찍기`));

for (let j = 0; j <= sn2 / 2; ++j) {
  const com2 = 2 * j;
  console.log(com2);
}
