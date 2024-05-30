//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract PriceArtToken  {
    
    AggregatorV3Interface public priceFeed;
    uint256 public artTokenPrice; // Token price in USD with 2 decimal places

    constructor(address _priceFeed, uint256 _artTokenPrice) {
    // Avalanche Fuji AVAX/USD price feed 0x5498BB86BC934c8D34FDA08E81D444153d0D06aD
        priceFeed = AggregatorV3Interface(_priceFeed);
        artTokenPrice = _artTokenPrice; // Initialize token price in USD (e.g., 5x10**2 = 500 means $5.00)
        }
    
    // Returns the latest AVAX/USD price
    function getLatestPrice() public view returns (uint256) {
        (, int256 price,,,) = priceFeed.latestRoundData();
        return uint256(price);
    }
    // Returns the number of decimals used by the price feed
    function getPriceFeedDecimals() public view returns (uint8) {
        return priceFeed.decimals();
    }

    //if avax ==> how many tokens one can buy 
    function tokenAmount(uint256 amountAvax) public view returns (uint256) {
        uint256 avaxUsd = getLatestPrice(); // AVAX/USD price with 8 decimal places
        uint8 decimals = getPriceFeedDecimals();
        uint256 amountUsd = amountAvax * avaxUsd / 10**decimals; // Convert AVAX to USD (AVAX has 18 decimal places, AVAX/USD has 8)
        uint256 amountToken = amountUsd * 10**2 / artTokenPrice; // Convert USD to tokens (artTokenPrice has 2 decimal places)
        return amountToken;
    }

    // Convert price from Art Tokens to USD
    function tokensToUsd(uint256 tokenAmount) public view returns (uint256) {
        uint256 amountUsd = tokenAmount * artTokenPrice / 10**2; // Convert tokens to USD (artTokenPrice has 2 decimal places)
        return amountUsd;
    }

    // Converts price from USD to Art tokens
    function usdToTokens(uint256 amountUsd) public view returns (uint256) {
        uint256 amountToken = amountUsd * 10**2 / artTokenPrice; // Convert USD to tokens (artTokenPrice has 2 decimal places)
        return amountToken;
    }

    // Convert price from Art Token into Avax :
    function tokensToAvax(uint256 tokenAmount) public view returns (uint256) {
        uint256 amountUsd = tokensToUsd(tokenAmount); // Convert tokens to USD
        uint256 avaxUsd = getLatestPrice(); // Get the latest AVAX/USD price
        uint8 decimals = getPriceFeedDecimals();
        uint256 amountAvax = amountUsd * 10**decimals / avaxUsd; // Convert USD to AVAX (AVAX/USD has 8 decimal places)
        return amountAvax;
    }

}