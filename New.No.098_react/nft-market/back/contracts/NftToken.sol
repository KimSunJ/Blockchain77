// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

// ERC721URIStorage : openzeppelin의 ERC721 확장 버전인 ERC721URIStorage 상속
// ERC721 == NFT
contract NftToken is ERC721Enumerable, ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenId; // counting해주는 라이브러리

  constructor(
    string memory _name,
    string memory _symbol
  ) ERC721(_name, _symbol) {}

  function _beforeTokenTransfer(
    // token보내기 전에 실행하는 함수
    address from,
    address to,
    uint256 firstTokenId,
    uint256 batchSize
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    // ERC721URIStorage를 타고 ERC721를 가져온 것
    super._burn(tokenId);
  }

  function supportsInterface(
    bytes4 interfaceId
  ) public view override(ERC721, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function tokenURI(
    uint256 tokenId
  ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function _baseURI() internal pure override returns (string memory) {
    return "https://gateway.pinata.cloud/ipfs/";
  }

  function safeMint(string memory uri) public {
    // tokenId를 가져와서 민팅을 하고 있다.
    uint256 tokenId = _tokenId.current();
    _tokenId.increment();
    _safeMint(msg.sender, tokenId);
    // 상속받은 함수
    // upgrade한 민팅
    _setTokenURI(tokenId, uri);
    // CID를 적을 곳
  }
}
