const heapArr = [];

function swap(idx1, idx2) {
  const temp = heapArr[idx1];
  heapArr[idx1] = heapArr[idx2];
  heapArr[idx2] = temp;
}

function heapInsert(item) {
  heapArr.push(item);
  let nowIdx = heapArr.length - 1;
  while (true) {
    if (nowIdx < 1) return heapArr.length;
    const parentIdx = parseInt((nowIdx - 1) / 2);
    if (heapArr[parentIdx] > heapArr[nowIdx]) {
      // if (heapArr[parentIdx] * -1 > heapArr[nowIdx] * -1) {
      swap(parentIdx, nowIdx);
      nowIdx = parentIdx;
    } else {
      break;
    }
  }
  return heapArr.length;
}

function heapRemove() {
  const temp = heapArr.shift();
  // 앞에 것을 뺀다
  heapArr.unshift(heapArr.pop());
  // 뒤의 것을 뺀 뒤 넣는다.
  let nowIdx = 0;
  while (true) {
    const leftChild = nowIdx * 2 + 1,
      rightChild = nowIdx * 2 + 2;
    if (
      heapArr[nowIdx] > heapArr[leftChild] ||
      heapArr[nowIdx] > heapArr[rightChild]
    ) {
      if (heapArr[leftChild] > heapArr[rightChild]) {
        swap(nowIdx, leftChild);
        nowIdx = leftChild;
      } else {
        swap(nowIdx, leftChild);
        nowIdx = leftChild;
      }
    } else {
      break;
    }
  }
  return temp;
}

// * -1 곱하면 큰 애는 작아지기 때문에 트리상의 내림차순 배열이 된다.
// 최소인 값이 맨 위에 있을 뿐이고, 트리상에서의 정렬일 뿐이다.
heapInsert(10);
heapInsert(20);
heapInsert(28);
heapInsert(18);
heapInsert(727);
heapInsert(9);
heapInsert(8);
heapInsert(3);
heapInsert(5);
heapInsert(1);
heapInsert(7);
heapInsert(8);
heapInsert(2);
heapInsert(6);
console.log(heapArr);
console.log(heapRemove());
console.log(heapArr);
