import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ArtistMarketPlace } from "../typechain-types";

describe("ArtistMarketPlace", function () {
  const subscriptionId = 1; // Replace with your actual subscription ID

  async function deployTokenFixture() {
    // Get the Signers here.
    const [owner, addr1, addr2, client, client2] = await ethers.getSigners();
    const artistMarketPlace = (await ethers.deployContract("ArtistMarketPlace", [subscriptionId])) as ArtistMarketPlace;
    await artistMarketPlace.waitForDeployment();
    //create two users
    const ArtistOne = {
      wallet: await addr1.getAddress(),
      name: "Julian Maschevelle",
      style: 0,
      numberoFArts: BigInt(0),
      numberFeaturedTimes: BigInt(0),
      artworks: [],
      commisions: [] as bigint[],
    } as unknown as ArtistMarketPlace.ArtistStruct;

    const ArtistTwo = {
      wallet: await addr2.getAddress(),
      name: "Adah Catherine",
      style: 1,
      numberoFArts: BigInt(0),
      numberFeaturedTimes: BigInt(0),
      artworks: [] as bigint[],
      commisions: [] as bigint[],
    } as unknown as ArtistMarketPlace.ArtistStruct;

    const ClientOne = {
      wallet: await client2.getAddress(),
      favoriteArts: [] as bigint[],
      commisions: [] as bigint[],
    } as unknown as ArtistMarketPlace.ClientStruct;

    await artistMarketPlace.createArtistUser(ArtistOne);
    await artistMarketPlace.createArtistUser(ArtistTwo);
    await artistMarketPlace.createClientUser(ClientOne);

    return { artistMarketPlace, owner, addr1, addr2, client, client2 };
  }

  describe("Deployment", function () {
    it("Should create test artists on deployment", async function () {
      const { artistMarketPlace } = await loadFixture(deployTokenFixture);
      const artist = await artistMarketPlace.s_artist(0);
      expect(artist.name).to.be.equal("Julian Maschevelle");
      expect((await artistMarketPlace.s_users(artist.wallet)).wallet).to.be.equal(artist.wallet);
    });
  });

  describe("ArtWorks", function () {
    it("Should allow saving artwork details", async function () {
      const { artistMarketPlace, addr1 } = await loadFixture(deployTokenFixture);
      const artwork = {
        url: "http://example.com/artwork1",
        artType: BigInt(0), // AIGenerated
        cost: ethers.parseEther("1"),
        likes: BigInt(0),
        creator: await addr1.getAddress(),
        owner: await addr1.getAddress(),
      };

      await artistMarketPlace.saveArtWorkDetails(artwork);
      const savedArtwork = await artistMarketPlace.s_artworks(0);
      const artistUser = await artistMarketPlace.s_users(await addr1.getAddress());
      const artist = await artistMarketPlace.getArtist(artistUser.artistID);
      expect(savedArtwork.url).to.equal(artwork.url);
      expect(savedArtwork.cost.toString()).to.equal(artwork.cost.toString());
      expect(savedArtwork.creator).to.equal(artwork.creator);
      expect(+artist.numberoFArts.toString()).to.be.equal(1);
      expect(artist.artworks.length).to.be.equal(1);
    });

    it("Should revert if artwork details are incomplete", async function () {
      const { artistMarketPlace, owner } = await loadFixture(deployTokenFixture);
      const incompleteArtwork = {
        url: "",
        artType: 0,
        cost: ethers.parseEther("1"),
        likes: 0,
        creator: owner.address,
        owner: owner.address,
      };
      await expect(artistMarketPlace.saveArtWorkDetails(incompleteArtwork)).to.be.revertedWithCustomError(
        artistMarketPlace,
        "ErrorIncompleteArtWorkDetails()",
      );
    });

    it("Should allow buying artwork", async function () {
      const { artistMarketPlace, addr1, client } = await loadFixture(deployTokenFixture);
      const artwork = {
        url: "http://example.com/artwork1",
        artType: 0, // AIGenerated
        cost: ethers.parseEther("1"),
        likes: 0,
        creator: await addr1.getAddress(),
        owner: addr1.address,
      };

      await artistMarketPlace.saveArtWorkDetails(artwork);
      await artistMarketPlace.connect(client).buyArtWork(0, { value: artwork.cost });
      const updatedArtwork = await artistMarketPlace.s_artworks(0);
      expect(updatedArtwork.owner).to.equal(client.address);
      const commission = await artistMarketPlace.s_artistCommision(addr1.getAddress());
      expect(+commission.toString()).to.equal(+artwork.cost.toString());
    });

    it("Should create client if it does not exist", async function () {
      const { artistMarketPlace, addr1, client } = await loadFixture(deployTokenFixture);
      const artwork = {
        url: "http://example.com/artwork1",
        artType: 0, // AIGenerated
        cost: ethers.parseEther("1"),
        likes: 0,
        creator: await addr1.getAddress(),
        owner: addr1.address,
      };

      await artistMarketPlace.saveArtWorkDetails(artwork);
      await artistMarketPlace.connect(client).buyArtWork(0, { value: artwork.cost });
      const createdClient = await artistMarketPlace.getClient(1);
      expect(createdClient.wallet).to.be.equal(await client.getAddress());
    });

    it("Should revert if insufficient amount is sent for buying artwork", async function () {
      const { artistMarketPlace, addr1, client } = await loadFixture(deployTokenFixture);
      const artwork = {
        url: "http://example.com/artwork1",
        artType: 0, // AIGenerated
        cost: ethers.parseEther("1"),
        likes: 0,
        creator: addr1.getAddress(),
        owner: addr1.address,
      };

      await artistMarketPlace.saveArtWorkDetails(artwork);
      await expect(
        artistMarketPlace.connect(client).buyArtWork(0, { value: ethers.parseEther("0.5") }),
      ).to.be.revertedWithCustomError(artistMarketPlace, "ErrorAmountNotSufficientToBuyArtwork");
    });

    it("Should revert if artwork does not exist when buying", async function () {
      const { artistMarketPlace, client } = await loadFixture(deployTokenFixture);
      await expect(
        artistMarketPlace.connect(client).buyArtWork(0, { value: ethers.parseEther("1") }),
      ).to.be.revertedWithCustomError(artistMarketPlace, "ErrorArtworkNotInTheSuppliedIndex");
    });

    it("Should allow withdrawing commission", async function () {
      const { artistMarketPlace, addr1, client } = await loadFixture(deployTokenFixture);
      const artwork = {
        url: "http://example.com/artwork1",
        artType: 0, // AIGenerated
        cost: ethers.parseEther("1"),
        likes: 0,
        creator: addr1.getAddress(),
        owner: addr1.getAddress(),
      };

      await artistMarketPlace.saveArtWorkDetails(artwork);
      await artistMarketPlace.connect(client).buyArtWork(0, { value: artwork.cost });
      const initialBalance = await ethers.provider.getBalance(addr1.getAddress());
      await artistMarketPlace.connect(addr1).withdrawCommision();
      const finalBalance = await ethers.provider.getBalance(addr1.getAddress());
      expect(finalBalance).to.be.gt(initialBalance);
    });

    it("Should revert if no commission to withdraw", async function () {
      const { artistMarketPlace, addr1 } = await loadFixture(deployTokenFixture);
      await expect(artistMarketPlace.connect(addr1).withdrawCommision()).to.be.revertedWithCustomError(
        artistMarketPlace,
        "ErrorNoCommisionToWithdraw",
      );
    });
  });

  describe("Commision Flow", function () {
    it("Should allow client request for an artwork", async function () {
      const { artistMarketPlace, addr1, client2 } = await loadFixture(deployTokenFixture);
      const commisionFlow = {
        client: await client2.getAddress(),
        artist: await addr1.getAddress(),
        description: "url pointing to IPFS",
        budget: ethers.parseEther("2"),
        contractStatus: 0,
        taskProgress: [] as bigint[],
      };

      await artistMarketPlace.connect(client2).startNewArtCommision(commisionFlow);
      const clientUser = await artistMarketPlace.s_users(client2.getAddress());
      const artistUser = await artistMarketPlace.s_users(addr1.getAddress());
      const client = await artistMarketPlace.getClient(clientUser.clientID);
      const artist = await artistMarketPlace.getArtist(artistUser.artistID);
      expect(client.commisions.length).to.be.equal(1);
      expect(artist.commisions.length).to.be.equal(1);
    });

    it("Should update progress report", async function () {
      const { artistMarketPlace, addr1, client2 } = await loadFixture(deployTokenFixture);
      const commisionFlow = {
        client: await client2.getAddress(),
        artist: await addr1.getAddress(),
        description: "url pointing to IPFS",
        budget: ethers.parseEther("2"),
        contractStatus: 0,
        taskProgress: [] as bigint[],
      };

      // OnGoing, 0
      // Finished, 1
      // Abandoned 2

      //NotGivenYet
      //Approved,
      //Decline
      const taskProgress = {
        progressUrl: "url-of-the-progress-drawing",
        taskStatus: 1,
        clientApproval: 0,
      };

      await artistMarketPlace.connect(client2).startNewArtCommision(commisionFlow);
      await artistMarketPlace.connect(addr1).acceptDeclineArtCommision(0, 1);
      await artistMarketPlace.connect(addr1).saveNewTaskProgress(0, taskProgress);
      const commision = await artistMarketPlace.s_artCommision(0);
      console.log("comission ", commision);
      //expect(commision.taskProgress).to.be.equal(1)
    });
  });

  describe("updateProgressReport", function () {
    it("Should allow the artist to update the progress report for their commission", async function () {
      const { artistMarketPlace, addr1, client2 } = await loadFixture(deployTokenFixture);
      const commisionFlow = {
        client: await client2.getAddress(),
        artist: await addr1.getAddress(),
        description: "url pointing to IPFS",
        budget: ethers.parseEther("2"),
        contractStatus: 0,
        taskProgress: [] as bigint[],
      };
      const taskProgressData = {
        progressUrl: "http://example.com/progress",
        taskStatus: 0,
        clientApproval: 0,
      };

      await artistMarketPlace.connect(client2).startNewArtCommision(commisionFlow);
      await artistMarketPlace.connect(addr1).acceptDeclineArtCommision(0, 1);
      await artistMarketPlace.connect(addr1).saveNewTaskProgress(0, taskProgressData);
      await artistMarketPlace.connect(addr1).updateProgressReport(0, 1);
      const progress = await artistMarketPlace.s_taskProgress(0);
      expect(progress.clientApproval).to.equal(1); // Approved
    });
    it("Should update the artist commision after the client accepts the project", async function () {
      const { artistMarketPlace, addr1, client2 } = await loadFixture(deployTokenFixture);
      const commisionFlow = {
        client: await client2.getAddress(),
        artist: await addr1.getAddress(),
        description: "url pointing to IPFS",
        budget: ethers.parseEther("2"),
        contractStatus: 0,
        taskProgress: [] as bigint[],
      };
      const taskProgressData = {
        progressUrl: "http://example.com/progress",
        taskStatus: 1,
        clientApproval: 0,
      };

      await artistMarketPlace.connect(client2).startNewArtCommision(commisionFlow);
      await artistMarketPlace.connect(addr1).acceptDeclineArtCommision(0, 1);
      await artistMarketPlace.connect(addr1).saveNewTaskProgress(0, taskProgressData);
      const commisionBefore = await artistMarketPlace.s_artistCommision(addr1.getAddress());
      await artistMarketPlace.connect(addr1).updateProgressReport(0, 1);
      const commisionAfter = await artistMarketPlace.s_artistCommision(addr1.getAddress());
      expect(+commisionAfter.toString()).to.be.gt(+commisionBefore.toString());
    });

    it("should revert if client already commented", async function () {
      const { artistMarketPlace, addr1, client2 } = await loadFixture(deployTokenFixture);
      const commisionFlow = {
        client: await client2.getAddress(),
        artist: await addr1.getAddress(),
        description: "url pointing to IPFS",
        budget: ethers.parseEther("2"),
        contractStatus: 0,
        taskProgress: [] as bigint[],
      };
      const taskProgressData = {
        progressUrl: "http://example.com/progress",
        taskStatus: 0,
        clientApproval: 0,
      };

      await artistMarketPlace.connect(client2).startNewArtCommision(commisionFlow);
      await artistMarketPlace.connect(addr1).acceptDeclineArtCommision(0, 1);
      await artistMarketPlace.connect(addr1).saveNewTaskProgress(0, taskProgressData);
      await artistMarketPlace.connect(addr1).updateProgressReport(0, 1);
      await expect(artistMarketPlace.connect(addr1).updateProgressReport(0, 1)).to.be.revertedWithCustomError(
        artistMarketPlace,
        "ErrorClientAlreadyCommentonTask",
      );
    });

    // it("should add the artwork to the array and commision if approved by the Client", async function () {
    //   const { artistMarketPlace, addr1, client2 } = await loadFixture(deployTokenFixture);
    //   const commisionFlow = {
    //     client: await client2.getAddress(),
    //     artist: await addr1.getAddress(),
    //     description: "url pointing to IPFS",
    //     budget: ethers.parseEther("2"),
    //     contractStatus: 0,
    //     taskProgress: [] as bigint[],
    //   };
    //   const taskProgressData = {
    //     progressUrl: "http://example.com/progress",
    //     taskStatus: 1,
    //     clientApproval: 0,
    //   };

    // //   const clientBeforeUser = await artistMarketPlace.s_users(client2.getAddress());
    // //   const artistBeforeUser = await artistMarketPlace.s_users(addr1.getAddress());
    // //   const clientBefore = await artistMarketPlace.getClient(clientBeforeUser.clientID);
    // //   const artistBefore = await artistMarketPlace.getArtist(artistBeforeUser.artistID);
    // //   //expect(clientBefore.commisions.length).to.be.equal(1);
    // //   expect(artistBefore.commisions.length).to.be.equal(1);
    //   await artistMarketPlace.connect(client2).startNewArtCommision(commisionFlow);
    //   await artistMarketPlace.connect(addr1).acceptDeclineArtCommision(0, 1);
    //   await artistMarketPlace.connect(addr1).saveNewTaskProgress(0, taskProgressData);
    //   await artistMarketPlace.connect(addr1).updateProgressReport(0, 1);
    //   const clientUser = await artistMarketPlace.s_users(client2.getAddress());
    //   const artistUser = await artistMarketPlace.s_users(addr1.getAddress());
    //   const client = await artistMarketPlace.getClient(clientUser.clientID);
    //   const artist = await artistMarketPlace.getArtist(artistUser.artistID);

    //   console.log("clien", client, artist)

    //   expect(client.commisions.length).to.be.equal(1);
    //   expect(artist.commisions.length).to.be.equal(1);
    // });
  });
});
