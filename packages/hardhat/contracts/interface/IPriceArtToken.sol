//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IPriceArtToken {

    function tokenAmount(uint256 amountAvax) external view returns (uint256); //if avax ==> how many tokens one can buy 
    function tokensToUsd(uint256 _tokenAmount) external view returns (uint256); // Convert price from Art Tokens to USD
    function usdToTokens(uint256 amountUsd) external view returns (uint256); // Converts price from USD to Art tokens
    function tokensToAvax(uint256 _tokenAmount) external view returns (uint256); // Convert price from Art Token into Avax :



}

