pragma solidity ^0.4.24;

/**
@title Exchange interface that must be implemented by any exchange used. Either directly or through a intermediary contract
@author Yoni Svechinsky
 */
interface IExchange{

    /**
    @dev Returns worst case amount for conversion
    @param src Address of source erc20 token
    @param srcAmount Amount of src tokens
    @param dest Destination token address
    @return Worst rate converted amount 
     */
    function getReturn(address src, uint srcAmount, address dest) external view
        returns (uint wrostCaseRetrun);


    function getTokenToEthInput(address src, uint srcAmount) external view returns(uint);

    function getTokenToEthOutput(address src, uint destAmount) external view returns(uint);

    function getEthToTokenInput(address dest, uint srcAmount) external view returns(uint);

    function getEthToTokenOutput(address dest, uint destAmount) external view returns(uint);


     /**
    @dev Trades from src to dest returning sending at most maxDestAmount to recepient and returnin the rest to the sender
    @param src Address of source erc20 token
    @param srcAmount Amount of src tokens
    @param dest Destination token address
    @param maxDestAmount Maximum amount of dest tokens to convert to
    @param recepient Address to send dest tokens to
    @return A tuple of the converted amount and remainder
     */
    function tradeExactly(address src, uint srcAmount, address dest, uint maxDestAmount, address recepient, uint minRate) external returns(uint convertedAmount, uint remainder);
}