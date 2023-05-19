function shuffle(count, arr) {
  // 매개변수 순서가 같아야 함
  if (!arr?.length || typeof arr != "object") {
    alert("배!열!만!");
    return "이상한 거 넣지 말고 배열만 넣으라고!";
  }
  for (let i = 0; i < 100; i++) {
    const first = parseInt(Math.random() * arr.length);
    const second = parseInt(Math.random() * arr.length);
    const temp = arr[first];
    arr[first] = arr[second];
    arr[second] = temp;
  }
  return arr;
}
