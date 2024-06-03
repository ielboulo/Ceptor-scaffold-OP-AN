//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
//contract ArtistMarketPlace is ReentrancyGuard, VRFConsumerBaseV2Plus {

interface IArtistMarketPlace {
    function buyArtWorkCCIP(address _owner, uint256 _amountArtToken, uint256 artWorkIndex) external; 

}

