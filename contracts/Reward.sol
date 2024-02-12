// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Reward is ERC721URIStorage, Ownable {
  uint256 private _tokenIds;

  constructor() ERC721("RewardToken", "RTN") {}

  // Minting a new NFT.
  function mintReward(address to, string memory tokenURI) public onlyOwner returns (uint256) {
    _tokenIds++;
    _mint(to, _tokenIds);
    _setTokenURI(_tokenIds, tokenURI);

    return _tokenIds;
  }

  // Burning an NFT by ID.
  function burn(uint256 tokenId) public {
    require(_isApprovedOrOwner(_msgSender(), tokenId), "Caller is not authorized.");
    _burn(tokenId);
  }

  // Transferring an NFT.
  function transferReward(address from, address to, uint256 tokenId) public {
    require(_isApprovedOrOwner(_msgSender(), tokenId), "Caller is not authorized.");
    safeTransferFrom(from, to, tokenId);
  }
}
