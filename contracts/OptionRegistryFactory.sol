pragma solidity ^0.4.24;


import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./OptionRegistry.sol";

contract OptionRegistryFactory{
    mapping(address => address) public tokenToRegistry;

    constructor() public{

    }

    function addFactory(address tokenAddress) public{
        address registry = new OptionRegistry(tokenAddress);
        tokenToRegistry[tokenAddress] = registry;
    }
}