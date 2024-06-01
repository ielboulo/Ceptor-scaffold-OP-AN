import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";
import { ethers } from "hardhat";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("ArtistMarketPlace", {
    from: deployer,
    // Contract constructor arguments
    args: [2777],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const artistMarketPlace = await hre.ethers.getContract<Contract>("ArtistMarketPlace", deployer);
  // console.log("👋 Initial greeting:", await yourContract.greeting());
  console.log("👋👋👋ArtistMarketPlace deployed, its address = ", artistMarketPlace.target);
  //create two artworks
  const artOne = {
    url: "7Wb3wQJNtUu4PD_r1SxRID2R7oG-0KMH7ayGkGdF3Qc",
    artType: BigInt(1), // Hand Drawn
    cost: ethers.parseEther("2"),
    likes: BigInt(0),
    creator: "0x7542e7009260C0e13bE5C025a09043b9e3fF0886",
    owner: "0x7542e7009260C0e13bE5C025a09043b9e3fF0886",
  };

  const artTwo = {
    url: "7Wb3wQJNtUu4PD_r1SxRID2R7oG-0KMH7ayGkGdF3Qc",
    artType: BigInt(0), // AIGenerated
    cost: ethers.parseEther("1"),
    likes: BigInt(0),
    creator: "0x7542e7009260C0e13bE5C025a09043b9e3fF0886",
    owner: "0x7542e7009260C0e13bE5C025a09043b9e3fF0886",
  };

  const ArtistOne = {
    wallet: "0x7542e7009260C0e13bE5C025a09043b9e3fF0886",
    name: "Julian Maschevelle",
    style: 0,
    email: "jamiebones2000@yahoo.uk",
    numberoFArts: BigInt(0),
    numberFeaturedTimes: BigInt(0),
    artworks: [],
    commisions: [] as bigint[],
  };
  console.log("creating new artist data");
  await artistMarketPlace.createArtistUser(ArtistOne);
  console.log("finished creating artist data");
  console.log("creating artwork");
  await artistMarketPlace.saveArtWorkDetails(artOne);
  await artistMarketPlace.saveArtWorkDetails(artTwo);
  console.log("finished creating artwork");
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["ArtistMarketPlace"];
