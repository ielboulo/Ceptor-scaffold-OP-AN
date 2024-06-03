// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract NFTFloorPrice is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    uint256 public floorPrice;
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor(address _oracle, bytes32 _jobId, uint256 _fee, address _link) {
        oracle = _oracle;
        jobId = _jobId;
        fee = _fee;
        _setChainlinkToken(_link);
    }

    function requestFloorPrice() public returns (bytes32 requestId) {
       Chainlink.Request memory request = _buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request.add("get", "https://api.opensea.io/api/v1/collection/boredapeyachtclub/stats");
        request.add("path", "stats.floor_price");
        return _sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, uint256 _floorPrice) public recordChainlinkFulfillment(_requestId) {
        floorPrice = _floorPrice;
    }
}
