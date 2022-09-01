let a;
a = console.log(Math.random() * 99 + 1);

let b;
b = prompt("1에서 100중 하나를 고르시오");

do {
  console.log(a < b ? "high" : "low");
}

