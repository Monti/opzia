pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../Token/ERC20.sol";

/**
@title A mock margin exchange for local testing purposes 
@author Yoni Svechinsky
*/
contract MockMarginExchange is Ownable{
    using SafeMath for uint;

    ERC20 token1;
    ERC20 token2;
    uint32 rate; // 1 * token1 = rate * token2;

    constructor(address _token1, address _token2) public{
        token1 = ERC20(_token1);
        token2 = ERC20(_token2);
        rate = 100;
    }

    /// @dev Returns the min return on conversion of token
	function getReturn(ERC20 _fromToken, ERC20 _toToken, uint amount) public view returns(uint){
		if (_fromToken == token1 && _toToken == token2){
            return amount.mul(10**token2.decimals()).div(10**token1.decimals()).mul(rate);
        }

        if (_fromToken == token2 && _toToken == token1){
            return amount.mul(10**token1.decimals()).div(10**token2.decimals()).div(rate);
        }

        revert("conversion impossible");
	}

    
     /**
    @dev Trades from src to dest returning sending at most maxDestAmount to recepient and returnin the rest to the sender
    @param src Address of source erc20 token
    @param srcAmount Amount of src tokens
    @param dest Destination token address
    @param maxDestAmount Maximum amount of dest tokens to convert to
    @param recepient Address to send dest tokens to
    @param minRate Min rate for exchange
    @return A tuple of the converted amount and remainder;
    @return Worst rate converted amount 
     */
    function tradeExactly(ERC20 src, uint srcAmount, ERC20 dest, uint maxDestAmount, address recepient, uint minRate) external returns(uint convertedAmount, uint remainder){
        require((src == token1 && dest == token2) || (src == token2 && dest == token1), "Tokens not traded here");
        src.transferFrom(msg.sender, this, srcAmount);
        uint tokenAmountNedded = getReturn(dest, src, maxDestAmount);
        if (tokenAmountNedded > srcAmount){
            dest.transfer(recepient, getReturn(src, dest, srcAmount));
        }
        else{
            dest.transfer(recepient, getReturn(src, dest, tokenAmountNedded));
            src.transfer(msg.sender, srcAmount - tokenAmountNedded);
        }

    }

}