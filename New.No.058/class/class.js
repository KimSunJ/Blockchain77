class ParentTestClass {
  #privateValue;

  constructor(value) {
    this.#privateValue = value;
    this.value = value * 10;
  }
  get privateValue() {
    // 보통, private 키를 가져올 때 사용한다.
    // 외부에서 함부로 가져올 수 없이, 매서드를 통해서 보낼 수 있도록 하기 위해 get을 사용 (안전한 데이터)
    return this.#privateValue;
  }
  //==================== set 사용 =========================
  set privateValue(value) {
    // set에는 매개변수가 필요하다
    this.#privateValue = value;
    // value는 매개변수로 입력받은 것이고, this는 class 내에서 사용되는 것이다.
    // set은 외부에서 값을 변화하려고 할때 사용 (privateValue값을 변경하고자 함)
  }
  //==================== static 사용 =========================
  add() {
    // class.test.js에서 test.add() / 10번째 줄에서 사용
    return this.#privateValue + this.value;
  }

  static add(a, b) {
    // class.test.js에서 TestClass.add(1,2) / 11번째 줄에서 사용
    return a + b;
  }
}

class TestClass extends ParentTestClass {
  // get set을 그대로 상속받아 모든 것을 가져옴
  constructor(value) {
    super(value);
    // console.log(this.#privateValue)
  }
}

module.exports = TestClass;
