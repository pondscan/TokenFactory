// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenTemplate is ERC20 {
    constructor(string memory name, string memory symbol, uint256 initialSupply, address creator) ERC20(name, symbol) {
        _mint(creator, initialSupply);
    }
}

contract TokenFactory {
    mapping(address => address[]) public userTokens;

    event TokenCreated(address tokenAddress, string tokenName, string tokenSymbol);

    function createToken(string memory name, string memory symbol, uint256 initialSupply) public {
        TokenTemplate newToken = new TokenTemplate(name, symbol, initialSupply, msg.sender);
        userTokens[msg.sender].push(address(newToken));
        emit TokenCreated(address(newToken), name, symbol);
    }

    function getUserTokens(address user) public view returns (address[] memory) {
        return userTokens[user];
    }
}
