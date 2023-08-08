// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;


// Trait Library contract
contract TraitLibrary {
    // Enum to represent the different paths
    enum Path { None, Knight, Warlock, Advisor }

    struct Trait {
        string svg; // SVG representation of the trait
        string[] variations; // Array of trait variations (e.g., Dagger, Perknife, Katana)
        Path path; // Path of the trait
    }

    mapping(string => Trait) private traits;

    function addTrait(
        string memory traitName,
        string memory svg,
        string[] memory variations,
        Path path
    ) external {
        traits[traitName] = Trait(svg, variations, path);
    }



    function getTraitSvg(string memory traitName) public view returns (string memory) {
        return traits[traitName].svg;
    }

    function getTraitVariations(string memory traitName) public view returns (string[] memory) {
        return traits[traitName].variations;
    }

    function isValidVariation(string memory traitName, string memory variation) public view returns (bool) {
        for (uint256 i = 0; i < traits[traitName].variations.length; i++) {
            if (keccak256(abi.encodePacked(traits[traitName].variations[i])) == keccak256(abi.encodePacked(variation))) {
                return true;
            }
        }
        return false;
    }
}
