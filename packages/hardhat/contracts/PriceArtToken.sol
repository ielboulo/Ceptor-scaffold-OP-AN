//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract PriceArtToken  {
    AggregatorV3Interface public priceFeed;
    constructor(address _priceFeed) {
    // Avalanche Fuji AVAX/USD price feed 0x5498BB86BC934c8D34FDA08E81D444153d0D06aD
        priceFeed = AggregatorV3Interface(_priceFeed);
        }
    
    // Returns the latest AVAX/USD price
    function getLatestPrice() public view returns (uint256) {
        (, int256 price,,,) = priceFeed.latestRoundData();
        return uint256(price);
    }

    // Add price calculate : TOTO IEL 
}