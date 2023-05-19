// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EthSwap {
  ERC20 public token;
  // 토큰을 주고 받는 것
  uint public rate = 100;

  constructor(ERC20 _token) {
    // 입력한 토큰을 넣고
    token = _token;
  }

  function getToken() public view returns (address) {
    return address(token);
    // 만들어서 올려놓은 토큰
  }

  function getSwapBalance() public view returns (uint) {
    return token.balanceOf(msg.sender);
  }

  function getThisAddress() public view returns (address) {
    return address(this);
  }

  function getMsgSender() public view returns (address) {
    return msg.sender;
  }

  function getTokenOwner() public view returns (address) {
    return token._owner();
  }

  function buyToken() public payable {
    uint256 tokenAmount = msg.value * rate;
    require(token.balanceOf(address(this)) >= tokenAmount, "error[1]");
    token.transfer(msg.sender, tokenAmount);
  }

  function sellToken(uint256 _amount) public payable {
    require(token.balanceOf(msg.sender) >= _amount, "error[1]");
    uint256 etherAmount = _amount / rate;

    require(address(this).balance >= etherAmount);
    token.transferFrom(msg.sender, address(this), _amount);
    payable(msg.sender).transfer(etherAmount);
  }
}
