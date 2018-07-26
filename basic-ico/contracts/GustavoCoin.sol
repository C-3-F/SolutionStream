pragma solidity ^0.4.19;

import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract GustavoCoin is MintableToken {
    string public name = "BASIC COIN";
    string public symbol = "BAS";
    uint8 public decimals = 18;
}