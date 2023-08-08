// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "base64-sol/base64.sol";
import "./lib/TraitLibrary.sol"; // Import the Trait Library contract

contract NFT is ERC721Enumerable, ChainlinkClient {
    using Counters for Counters.Counter;
    Counters.Counter private tokenIdCounter;


    // Trait Library contract
    TraitLibrary private traitLibrary;


    // Enum to represent the different paths 
    enum Path { None, Knight, Warlock, Advisor }


    // Struct to store Noob NFT traits
    struct NoobNFT {
        uint8 path; // 1 for Knight, 2 for Warlock, 3 for Advisor
        uint256[] traitIds; // Array to store trait IDs associated with the Noob NFT
    }

    mapping(uint256 => NoobNFT) private noobId; // Mapping to store NFT data by token ID]
    mapping(address => uint256) private noobByOwner; // Mapping to store Noob token ID by owner address

    // Event for new Noob NFT minted
    event NoobNFTMinted(uint256 tokenId, address owner, uint8 path);




     // Chainlink variables
    bytes32 private jobId;
    uint256 private fee;


    constructor () ERC721("NoobNFT", "NOOB") {

        // Initialize Trait Library contract
        traitLibrary = new TraitLibrary();

        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        setChainlinkOracle(0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD);
        jobId = "ca98366cc7314957b8c012c72f05aeeb";
        fee = (1 * LINK_DIVISIBILITY) / 10;

        tokenIdCounter.increment();
    }





    // Function to mint a Noob NFT
    function mintNoob() external {
        require(noobByOwner[msg.sender] == 0, "Address already owns a Noob token");


        // Mint Noob NFT
        uint256 tokenId = tokenIdCounter.current();
        noobId[tokenId] = NoobNFT(Path.None); // Set path to Path.None initially
        noobByOwner[msg.sender] = tokenId;
        tokenIdCounter.increment();
    }


    // implement fuction to upgrade Noob 


    
    // Function to add a trait to the Noob NFT
    function addTrait(uint256 _tokenId, uint256 _traitId) external {
        require(noobId[_tokenId].path != uint8(Path.None), "Noob NFT does not exist");
        noobId[_tokenId].traitIds.push(_traitId);
    }


    // Function to get the traits of a Noob NFT
    function getTraits(uint256 _tokenId) external view returns (uint256[] memory) {
        return noobId[_tokenId].traitIds;
    }





    // Function to generate the token URI for a Noob NFT
    function tokenURI(uint256 id) public view override returns (string memory) {
        require(_exists(id), "Token does not exist");

        // Get the Noob NFT data
        NoobNFT memory noob = noobId[id];

        string memory name = string(abi.encodePacked('#', id.toString(), ' Guidler'));
        string memory description = string(abi.encodePacked('Ready to take on the challenges of old.'));
        string memory image = Base64.encode(bytes(generateSVGofTokenById(id, noob)));


      return string(abi.encodePacked(
        'data:application/json;base64,',
        Base64.encode(
            bytes(
                abi.encodePacked(
                    '{"name":"',
                    name,
                    '", "description":"',
                    description,
                    '", "external_url":"https://burnyboys.com/token/',
                    id.toString(),
                    '", "owner":"',
                    (uint160(ownerOf(id))).toHexString(20),
                    '", "image": "',
                    'data:image/svg+xml;base64,',
                    image,
                    '"}'
                )
            )
        )
      ));
  }







    // Function to generate the SVG representation of a Noob NFT
    function generateSVGofTokenById(uint256 _tokenId, NoobNFT memory _noob) internal view returns (string memory) {

        string memory pathSVG = "";
        if (_noob.path != Path.None) {
            // Get the SVG representation of the path from the TraitLibrary contract
            pathSvg = traitLibrary.getTraitSvg(string(PathToString(_noob.path)));
        }

        string memory traitSvg = "";
        uint256[] memory traitIds = _noob.traitIds;

        for (uint256 i = 0; i < traitIds.length; i++) {
            // Get the SVG representation of each trait from the TraitLibrary contract
            string memory traitName = string(abi.encodePacked("Trait", traitIds[i].toString()));
            traitSvg = string(abi.encodePacked(traitSvg, traitLibrary.getTraitSvg(traitName)));
        }

        // Combine the SVG representations of path and traits
        string memory svg = string(abi.encodePacked(
            '<svg width="100%" height="100%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">',
            pathSvg,
            traitSvg,
            '</svg>'
        ));
        return svg;
    }


    function PathToString(Path _path) internal pure returns (string memory) {
        if (_path == Path.None) return "None";
        if (_path == Path.Knight) return "Knight";
        if (_path == Path.Warlock) return "Warlock";
        if (_path == Path.Advisor) return "Advisor";
        revert("Invalid path");
    }





    // Function to call the API and return an array of builders' builds
    function guidlerPath(address _caller, uint256 _noobId) internal {
        // Create Chainlink request
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        // Set the URL to perform the GET request on (API endpoint to fetch builders' builds)
        req.add(
            "get",
            "https://buidlguidl-v3.ew.r.appspot.com/builds/builder/{_caller}"
        );

        // Set the path to find the desired data in the API response (array of builders' builds)
        req.add("path", "");

        // Sends the request
        sendChainlinkRequest(req, fee);
    }



    // Callback function to receive the API response and process the array of builders' builds
    function fulfill(bytes32 _requestId, bytes32[] memory _buildersBuilds) public recordChainlinkFulfillment(_requestId) {
        // Process the array of builders' builds received from the API
        // For simplicity, we're not doing any processing here, but you can add your logic.
        // The _buildersBuilds array contains the data returned from the API response.
        // You can store, manipulate, or use this data as needed for your contract's logic.
    }

    // Function to withdraw Link tokens from the contract (same as before)

}