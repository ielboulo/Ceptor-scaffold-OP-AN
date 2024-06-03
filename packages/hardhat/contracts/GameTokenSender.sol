// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// Deploy this contract on Fuji

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";

/**
 * This is a simulator for the sender .. it was deployed on Polygon amoy to test if CCIP works as expected .

 */
contract GameTokenSender {

    // Custom errors to provide more descriptive revert messages.
    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees); // Used to make sure contract has enough balance to cover the fees.
    error NothingToWithdraw(); // Used when trying to withdraw but there's nothing to withdraw.

    IRouterClient public router;
    LinkTokenInterface public linkToken;
    uint64 public destinationChainSelector;
    address public owner;
    address public gameTokenReceiverAddr; // The address of GameTokenReceiver 
    uint256 public gamesTokenPriceInCents = 2; // for testing 1 token = 0.02 usd, in the chainlink 8 decimal place return format


    event MessageSent(bytes32 messageId);

    constructor(address _gameTokenReceiverAddr) {
        owner = msg.sender;
            
        // from AMOY (Polygon)
        address routerAddressAmoy = 0x9C32fCB86BF0f4a1A8921a9Fe46de3198bb884B2;
        router = IRouterClient(routerAddressAmoy);
        linkToken = LinkTokenInterface(0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904); // in AMOY
        linkToken.approve(routerAddressAmoy, type(uint256).max);

        // to Fuji 
        destinationChainSelector = 14767482510784806043;
        gameTokenReceiverAddr = _gameTokenReceiverAddr;  
    }

    function calculateArtTokenAmount(uint256 gameTokenAmount) public view returns (uint256) {
        uint256 gameTokenPriceInUSD = gamesTokenPriceInCents * 10 ** 16; // converting cents to USD in 18 decimals
        uint256 artTokenPrice = 500; // 5 USD in 2 decimals
        uint256 artTokenPriceInUSD = artTokenPrice * 10 ** 16; // converting artTokenPrice (which has 2 decimal places) to 18 decimals
        uint256 artTokenAmount = (gameTokenAmount * gameTokenPriceInUSD) / artTokenPriceInUSD;
        return artTokenAmount;
    }

    function caluclateGTfromUsd(uint amountUSD) public view returns (uint256) {
        return amountUSD / gamesTokenPriceInCents; 
    }

    function buyArtWorkOnFuji(uint256 _artworkIndex, uint256 _priceInGameTokens) external {

        // check price of artwork 
        // convert it into GameToken price 
        // convert Game Token ==> Art Token Amount
        // burn Game Token in Polygon
        // mint Equivalent Art Token in Fuji
        // send artWorkIndex user wants to buy 
        // Finally, send amout of artToken to mint + artworkIndex to buy 
        // buyArtWorkCCIP(address _owner,uint256 nbArtToken2Mint,uint256 artWorkIndex)
        // buyArtWorkCCIP(address,uint256,uint256)

        // test mint only :     function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {

        uint256 amountArtToken2Mint = calculateArtTokenAmount(_priceInGameTokens); 

        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(gameTokenReceiverAddr),
            //data: abi.encodeWithSignature("mint(address,uint256)", msg.sender, 10),
            data: abi.encodeWithSignature("buyArtWorkCCIP(address,uint256,uint256)", msg.sender, amountArtToken2Mint, _artworkIndex),

            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(
                Client.EVMExtraArgsV1({gasLimit: 980_000})
            ),
            feeToken: address(linkToken)
        });        

        // Get the fee required to send the message
        uint256 fees = router.getFee(destinationChainSelector, message);

        if (fees > linkToken.balanceOf(address(this)))
            revert NotEnoughBalance(linkToken.balanceOf(address(this)), fees);

        bytes32 messageId;
        // Send the message through the router and store the returned message ID
        messageId = router.ccipSend(destinationChainSelector, message);
        emit MessageSent(messageId);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function linkBalance (address account) public view returns (uint256) {
        return linkToken.balanceOf(account);
    }

    function withdrawLINK(
        address beneficiary
    ) public onlyOwner {
        uint256 amount = linkToken.balanceOf(address(this));
        if (amount == 0) revert NothingToWithdraw();
        linkToken.transfer(beneficiary, amount);
    }
}

