const TestClass = require("./class");

describe("Class Test", () => {
  it("private test", () => {
    const test = new TestClass(5);
    expect(typeof test).toBe("object");

    expect(test.value).toBe(50);

    test.value = 100;
    expect(test.value).toBe(100);
    expect(test.privateValue).toBe(5);
    // expect(test.#privateValue).toBe(5)
    // #privateValue >> 접근 불가능 오류 뜸
    // test["#privateValue"] = 10;
    // test.value == test["value"]
    // const temp = "#privateValue";
    // test[temp] = 10; // test.#privateValue
    // expect(test.privateValue).toBe(5);
    //get으로 보낸 애들은 일반적인 키 밸류 (함수가 아닌 변수처럼 가져올 수 있다)
    // expect(test["#privateValue"]).toBe(10);
    // test["#privateValue"] !== test.#privateValue
    // test.#privateValue 으로는 사용할 수 없다.

    test.privateValue = 200; // set 사용 (매서드처럼 사용할 경우 사용) / 알아서 호출한다.
    expect(test.privateValue).toBe(200);
  });
  it("static test", () => {
    const test = new TestClass(5);

    expect(test.add()).toBe(55);
    expect(TestClass.add(1, 2)).toBe(3);
  });
});
