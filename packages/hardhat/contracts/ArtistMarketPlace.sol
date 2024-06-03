//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { IVRFCoordinatorV2Plus } from "@chainlink/contracts/src/v0.8/vrf/dev/interfaces/IVRFCoordinatorV2Plus.sol";
import { VRFConsumerBaseV2Plus } from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import { VRFV2PlusClient } from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";

//75868828114239004182696661166274810031260136627899410775239615499108111680872

contract ArtistMarketPlace is ReentrancyGuard, VRFConsumerBaseV2Plus {
	event RequestSent(uint256 requestId, uint32 numWords);
	event RequestFulfilled(uint256 requestId, uint256[] randomWords);

	error ErrorNoCommisionToWithdraw();
	error ErrorArtWorkNotFound();
	error ErrorAmountNotSufficientToBuyArtwork(
		uint256 suppliedAmount,
		uint256 costPrice
	);
	error ErrorIncompleteArtWorkDetails();
	error ErrorArtistNotFound(address artistWallet);
	error ErrorArtworkNotInTheSuppliedIndex();
	error ErrorUserNotFound(address userWallet);
	error ErrorNotEnoughFundsSentToContract(uint256 amount);
	error ErrorRevertIncompleteCommisionDetails();
	error ErrorUserAlreadyExsits(address wallet);
	error ErrorCommisionFlowNotFound();
	error ErrorNotTheArtistGiveProgress(address sender);
	error ErrorArtCommisionAlreadyDecided();
	error ErrorTheCommisionFlowHasNotBeenAccepted();
	error ErrorClientAlreadyCommentonTask();

	enum ArtType {
		AIGenerated,
		HandDrawn
	}

	enum ContractStatus {
		NotDecided,
		Accepted,
		Declined,
		Revoked
	}

	enum TaskStatus {
		OnGoing,
		Finished
	}

	enum UserType {
		Artist,
		Client
	}

	enum ClientApproval {
		NotGivenYet,
		Approved,
		Decline
	}

	struct RequestStatus {
		bool fulfilled; // whether the request has been successfully fulfilled
		bool exists; // whether a requestId exists
		uint256[] randomWords;
	}

	//wallet name style,  number of arts , number of featured times

	struct ArtWork {
		string url;
		ArtType artType;
		uint256 cost;
		uint256 likes;
		address creator;
		address owner;
	}

	struct ArtWorkResult {
		string url;
		ArtType artType;
		uint256 cost;
		uint256 likes;
		address creator;
		address owner;
		uint index;
	}

	struct Artist {
		address wallet;
		string email;
		string name;
		ArtType style;
		uint256 numberoFArts;
		uint256 numberFeaturedTimes;
		uint256[] artworks;
		uint256[] commisions;
	}

	struct ArtistResult {
		address wallet;
		string email;
		string name;
		ArtType style;
		uint256 numberoFArts;
		uint256 numberFeaturedTimes;
		uint256[] artworks;
		uint256[] commisions;
		uint256 artistIndex;
	}

	struct Client {
		address wallet;
		string email;
		uint256[] favoriteArts;
		uint256[] commisions;
	}

	struct User {
		UserType userType;
		address wallet;
		uint256 clientID;
		uint256 artistID;
	}

	struct TaskProgress {
		string progressUrl;
		TaskStatus taskStatus;
		ClientApproval clientApproval;
	}

	struct ArtCommision {
		address client;
		address artist;
		string description;
		uint256 budget;
		ContractStatus contractStatus;
		uint256[] taskProgress;
	}

	mapping(address => User) public s_users;
	mapping(uint256 => RequestStatus) public s_requests;
	//artist address matched to artist commision held by the contract
	mapping(address => uint256) public s_artistCommision;
	//mapping of address to Artist array index
	//mapping(address => uint) public s_artistIndex;
	//artwork
	ArtWork[] public s_artworks;
	Artist[] public s_artist;
	Client[] public s_client;
	ArtCommision[] public s_artCommision;
	TaskProgress[] public s_taskProgress;

	//VRF Sepolia Chain
	IVRFCoordinatorV2Plus COORDINATOR;
	address vrfCoordinator = 0x5C210eF41CD1a72de73bF76eC39637bB0d3d7BEE;
	//0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B;
	bytes32 keyHash =
		0xc799bd1e3bd4d1a41cd4968997a4e03dfd2a3c7c04b695881138580163f42887;

	//0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae;
	uint32 callbackGasLimit = 2500000;
	uint16 requestConfirmations = 3;
	uint32 numWords = 1;

	// State Variables
	address private s_linkAddress;

	// Your subscription ID.
	uint256 public s_subscriptionId;
	uint256[] public requestIds;
	uint256 public lastRequestId;
	uint256[] public lastRandomWords;

	uint256 public featuredArtistIndex = 0;

	modifier checkArtWorkDetails(ArtWork memory artwork) {
		if (
			bytes(artwork.url).length != 0 &&
			artwork.cost > 0 &&
			artwork.creator != address(0) &&
			artwork.owner != address(0)
		) {
			_;
		} else {
			revert ErrorIncompleteArtWorkDetails();
		}
	}

	modifier checkArtCommisionFlow(ArtCommision memory artCommision) {
		uint256 clientID = s_users[artCommision.client].clientID;
		uint256 artistID = s_users[artCommision.client].artistID;
		if (s_client[clientID].wallet == address(0)) {
			revert ErrorUserNotFound(artCommision.client);
		}
		if (s_artist[artistID].wallet == address(0)) {
			revert ErrorUserNotFound(artCommision.artist);
		}
		if (artCommision.budget < msg.value) {
			revert ErrorNotEnoughFundsSentToContract(msg.value);
		}
		if (bytes(artCommision.description).length == 0) {
			revert ErrorRevertIncompleteCommisionDetails();
		}
		_;
	}

	constructor(uint256 subscriptionId) VRFConsumerBaseV2Plus(vrfCoordinator) {
		COORDINATOR = IVRFCoordinatorV2Plus(vrfCoordinator);
		s_subscriptionId = subscriptionId;
		//create Text artist data here
		//_createTestArtist();
	}

	function getRandomWords() external returns (uint256 requestId) {
		requestId = COORDINATOR.requestRandomWords(
			VRFV2PlusClient.RandomWordsRequest({
				keyHash: keyHash,
				subId: s_subscriptionId,
				requestConfirmations: requestConfirmations,
				callbackGasLimit: callbackGasLimit,
				numWords: numWords,
				extraArgs: VRFV2PlusClient._argsToBytes(
					VRFV2PlusClient.ExtraArgsV1({ nativePayment: false })
				)
			})
		);
		s_requests[requestId] = RequestStatus({
			randomWords: new uint256[](0),
			exists: true,
			fulfilled: false
		});
		requestIds.push(requestId);
		lastRequestId = requestId;
		emit RequestSent(requestId, numWords);
		return requestId;
	}

	function fulfillRandomWords(
		uint256 _requestId,
		uint256[] calldata _randomWords
	) internal override {
		require(s_requests[_requestId].exists, "request not found");
		s_requests[_requestId].fulfilled = true;
		s_requests[_requestId].randomWords = _randomWords;
		lastRandomWords = _randomWords;
		featuredArtistIndex = lastRandomWords[0] % s_artist.length;
		//increment the number of times artist was featured
		if (s_artist[featuredArtistIndex].wallet != address(0)) {
			s_artist[featuredArtistIndex].numberFeaturedTimes++;
		}
		emit RequestFulfilled(_requestId, _randomWords);
	}

	function displayArtistOfTheDay()
		public
		view
		returns (ArtistResult memory artR)
	{
		if (s_artist.length == 0) {
			return artR;
		}
		Artist memory a = s_artist[featuredArtistIndex];
		ArtistResult memory artResult = ArtistResult({
			wallet: a.wallet,
			email: a.email,
			name: a.name,
			style: a.style,
			numberoFArts: a.numberoFArts,
			numberFeaturedTimes: a.numberFeaturedTimes,
			artworks: a.artworks,
			commisions: a.commisions,
			artistIndex: featuredArtistIndex
		});
		return artResult;
	}

	function withdrawCommision() public payable nonReentrant {
		uint256 commision = s_artistCommision[msg.sender];
		if (commision > 0) {
			//withdraw the commision from the contract
			s_artistCommision[msg.sender] = 0;
			(bool success, ) = payable(msg.sender).call{ value: commision }("");
			require(success, "commision withdrawal failed");
		} else {
			revert ErrorNoCommisionToWithdraw();
		}
	}

	function buyArtWork(uint256 artWorkIndex) public payable {
		if (artWorkIndex > s_artworks.length || s_artworks.length == 0) {
			revert ErrorArtworkNotInTheSuppliedIndex();
		}
		ArtWork memory artwork = s_artworks[artWorkIndex];
		if (artwork.creator == address(0)) {
			revert ErrorArtWorkNotFound();
		}
		if (msg.value < artwork.cost) {
			revert ErrorAmountNotSufficientToBuyArtwork(
				msg.value,
				artwork.cost
			);
		}
		//create a client if it does not exist
		if (s_users[msg.sender].wallet == address(0)) {
			uint256[] memory empty;
			//create a new Client
			Client memory _client = Client({
				wallet: msg.sender,
				email: "",
				favoriteArts: empty,
				commisions: empty
			});
			createClientUser(_client);
		}
		//buy the art
		s_artworks[artWorkIndex].owner = msg.sender;
		s_artistCommision[artwork.creator] += msg.value;
	}

	function saveArtWorkDetails(
		ArtWork memory artwork
	) public checkArtWorkDetails(artwork) {
		//save the artwork in the artwork storage
		s_artworks.push(artwork);
		uint256 index = s_artworks.length;

		//update the artist works array with the artwork index

		uint256 artistIndexInArray = s_users[artwork.creator].artistID;
		Artist storage artist = s_artist[artistIndexInArray];
		if (artist.wallet != artwork.creator) {
			revert ErrorArtistNotFound(artwork.creator);
		}
		//we good save the index in the artist work array
		uint256 artworkIndex = index - 1;
		artist.artworks.push(artworkIndex);
		artist.numberoFArts++;
	}

	function getArtist(
		uint256 index
	) public view returns (Artist memory artist) {
		if (s_artist.length == 0) {
			return artist;
		}
		return s_artist[index];
	}

	function getClient(
		uint256 index
	) public view returns (Client memory client) {
		return s_client[index];
	}

	function createArtistUser(Artist memory newArtist) public {
		//check if the address is not in the user
		if (s_users[newArtist.wallet].wallet != address(0)) {
			revert ErrorUserAlreadyExsits(newArtist.wallet);
		}
		//create and push the artist into the Artist array and save the index in the user mapping
		uint256 index = s_artist.length;
		index = index == 0 ? index : index + 1;
		s_artist.push(newArtist);
		//create a User
		User memory _newUser = User({
			wallet: newArtist.wallet,
			userType: UserType.Artist,
			artistID: index,
			clientID: 0
		});
		s_users[newArtist.wallet] = _newUser;
	}

	function createClientUser(Client memory newClient) public {
		//check if the address is not in the user
		if (s_users[newClient.wallet].wallet != address(0)) {
			revert ErrorUserAlreadyExsits(newClient.wallet);
		}
		uint256 index = s_client.length;
		index = index == 0 ? index : index + 1;
		s_client.push(newClient);
		//create a User
		User memory _newUser = User({
			wallet: newClient.wallet,
			userType: UserType.Client,
			artistID: 0,
			clientID: index
		});
		s_users[newClient.wallet] = _newUser;
	}

	function startNewArtCommision(
		ArtCommision memory artCommision
	) public payable checkArtCommisionFlow(artCommision) {
		//save the commison in the array
		s_artCommision.push(artCommision);
		uint256 savedIndex = s_artCommision.length - 1;
		//save the index in the commision array of both the client and artist
		uint256 artistIndex = s_users[artCommision.artist].artistID;
		uint256 clientIndex = s_users[artCommision.client].clientID;
		Artist storage _artist = s_artist[artistIndex];
		_artist.commisions.push(savedIndex);
		Client storage _client = s_client[clientIndex];
		_client.commisions.push(savedIndex);
	}

	function acceptDeclineArtCommision(
		uint256 artCommisionID,
		ContractStatus contractStatus
	) public {
		//get the artComission
		ArtCommision memory artCommision = s_artCommision[artCommisionID];
		if (
			artCommision.artist == msg.sender &&
			artCommision.contractStatus == ContractStatus.NotDecided
		) {
			s_artCommision[artCommisionID].contractStatus = contractStatus;
		} else {
			//revert already
			revert ErrorArtCommisionAlreadyDecided();
		}
	}

	function saveNewTaskProgress(
		uint256 commisionIndex,
		TaskProgress memory taskProgress
	) public {
		ArtCommision memory artCommision = s_artCommision[commisionIndex];
		if (
			artCommision.contractStatus == ContractStatus.NotDecided ||
			artCommision.contractStatus == ContractStatus.Declined
		) {
			revert ErrorTheCommisionFlowHasNotBeenAccepted();
		}
		if (artCommision.artist == address(0)) {
			revert ErrorCommisionFlowNotFound();
		}
		if (artCommision.artist != msg.sender) {
			revert ErrorNotTheArtistGiveProgress(msg.sender);
		}

		uint256 index = s_taskProgress.length;
		index = index == 0 ? index : index + 1;
		s_taskProgress.push(taskProgress);
		//save the task progress
		s_artCommision[commisionIndex].taskProgress.push(index);
	}

	function updateProgressReport(
		uint256 artCommisionID,
		ClientApproval _clientApproval
	) public {
		//get the progress report
		ArtCommision memory artCommision = s_artCommision[artCommisionID];
		//get the last comission without a client input
		uint256 progressID = artCommision.taskProgress[
			artCommision.taskProgress.length - 1
		];
		TaskProgress storage taskProgress = s_taskProgress[progressID];
		//check if the client has not commented;
		if (taskProgress.clientApproval == ClientApproval.NotGivenYet) {
			//save the client response
			// 	NotGivenYet,
			// Approved,
			// Decline
			if (
				_clientApproval == ClientApproval.Approved &&
				taskProgress.taskStatus == TaskStatus.Finished
			) {
				//transfer the commision to the artist
				//add the art to the artist collection and the client as the owner
				//save the taskProgress update sent
				_saveArtworkCommisionFinalized(artCommisionID, progressID);
			} else if (taskProgress.taskStatus == TaskStatus.OnGoing) {
				taskProgress.clientApproval = _clientApproval;
			}
			//if progress == finish and client response == approved
			//save the comission in the commision array under the artist
		} else {
			//error already commented
			revert ErrorClientAlreadyCommentonTask();
		}
	}

	function _saveArtworkCommisionFinalized(
		uint256 artCommisionID,
		uint256 taskProgressID
	) private {
		//create new art work
		TaskProgress storage taskProgress = s_taskProgress[taskProgressID];

		ArtCommision memory artCommision = s_artCommision[artCommisionID];
		User memory artistUser = s_users[artCommision.artist];
		Artist storage artist = s_artist[artistUser.artistID];

		ArtWork memory artwork = ArtWork({
			url: taskProgress.progressUrl,
			artType: artist.style,
			cost: artCommision.budget,
			likes: 0,
			creator: artCommision.artist,
			owner: artCommision.client
		});

		//save the artwork in the artwork Array
		s_artworks.push(artwork);
		//transfer the money to the commisions array
		s_artistCommision[artCommision.artist] += artCommision.budget;
		//finally save the taskProgress
		taskProgress.clientApproval = ClientApproval.Approved;
	}

	function getArtistCommisions(
		uint256 index
	) public view returns (ArtCommision[] memory commissionsArt) {
		if (s_artist.length == 0) {
			return commissionsArt;
		}
		Artist memory artist = s_artist[index];
		ArtCommision[] memory commissions = new ArtCommision[](
			artist.commisions.length
		);
		if (artist.wallet != address(0)) {
			uint i = 0;
			for (i; i < artist.commisions.length; i++) {
				commissions[i] = s_artCommision[artist.commisions[i]];
			}
		}
		return commissions;
	}

	function getArtistArtWorks(
		uint index
	) public view returns (ArtWorkResult[] memory arts) {
		if (s_artist.length == 0 && s_artworks.length == 0) {
			return arts;
		}

		Artist memory artist = s_artist[index];
		//loop through the artworks
		ArtWorkResult[] memory artWork = new ArtWorkResult[](artist.artworks.length);
		uint i = 0;
		for (i; i < artist.artworks.length; i++) {
			console.log("value iof ", i);
			ArtWork memory art = s_artworks[artist.artworks[i]];
			ArtWorkResult memory artResult = ArtWorkResult({
				url: art.url,
		        artType: art.artType,
		    	cost: art.cost,
				likes: art.likes,
				creator: art.creator,
		 		owner: art.owner,
				index: artist.artworks[i]
			});

			artWork[i] = artResult;
		}

		return artWork;
	}

	receive() external payable {}
}
