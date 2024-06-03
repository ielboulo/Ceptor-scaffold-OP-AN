// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// Deploy this contract on Sepolia

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import "./interface/IArtToken.sol";
import "./interface/IArtistMarketPlace.sol";


/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */
contract GameTokenReceiver is CCIPReceiver {
    IArtToken public artTokenAddr;
    IArtistMarketPlace artistMarketPlace;

    event MintCallSuccessfull();

    // https://docs.chain.link/ccip/supported-networks
    address routerSepolia = 0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59;
    address routerFujiAvax = 0xF694E193200268f9a4868e4Aa017A0118C9a8177;

    //constructor(address _artistMarketPlaceAddress) CCIPReceiver(routerFujiAvax) {
   //     artistMarketPlace = IArtistMarketPlace(_artistMarketPlaceAddress);
   // }

    constructor(address _artTokenAddr, address _artistMarketPlaceAddress) CCIPReceiver(routerFujiAvax) {
        artTokenAddr = IArtToken(_artTokenAddr);
        artistMarketPlace = IArtistMarketPlace(_artistMarketPlaceAddress);

    }
    event ArtWorkBuySuccessCCIP(address  _owner , uint256 _artWorkIndex);

    function buyArtWorkCCIP(address _owner,uint256 nbArtToken2Mint,uint256 artWorkIndex) internal {

        artTokenAddr.mint(_owner, nbArtToken2Mint);
        //artistMarketPlace.buyArtworkWithArtToken(_owner, artWorkIndex);
        emit ArtWorkBuySuccessCCIP( _owner, artWorkIndex);
    }


    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        //(bool success, ) = address(artTokenAddr).call(message.data); // mint() // buyArtwork(artIndex)
        
        (bool success, ) = address(artistMarketPlace).call(message.data); // mint() // buyArtwork(artIndex)

        require(success);
        emit MintCallSuccessfull();
    }
// 0x279F062b3f91D3b1ec993f9E761D11e1e48555C5
   function testMint() external {
        // Mint from Sepolia
        //artTokenAddr.mint(msg.sender, 12);
        artistMarketPlace.buyArtWorkCCIP( msg.sender,  500,  100); 

    }

    function testMessage() external {
        // Mint from Sepolia
        bytes memory message;
        message = abi.encodeWithSignature("mint(address,uint256)", msg.sender, 11);
        (bool success, ) = address(artTokenAddr).call(message);
        require(success);
        emit MintCallSuccessfull();
    }

   /* function updateNFT(address nftAddress) external {
        nft = InftMinter(nftAddress);
    } */
}

