// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Test {
  int public num;
  string public text;
  int[] public numArr;
  string[] public textArr;
  address public owner;

  mapping(string => uint) public balance;

  constructor(string memory _text, int _num) {
    num = _num;
    // text = "testing"; 매개변수로 _text를 전달했기 때문에 필요 없어진 구문
    text = _text;
    // string storage testTest;
    // testTest = text;
    owner = msg.sender;
  }
}
