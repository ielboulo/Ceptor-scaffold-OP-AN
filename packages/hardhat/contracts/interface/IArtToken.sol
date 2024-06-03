//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IArtToken {
    function mint(address to, uint256 amount) external;
    function decimals() external view returns (uint8);
    function grantMinterRole(address account) external;
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);


}

