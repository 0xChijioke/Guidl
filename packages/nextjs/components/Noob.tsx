import { useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { NFTData } from "~~/types";

const Noob = () => {
  const { address, isConnected } = useAccount();
  const [guidler, setGuidler] = useState<boolean>(false);
  const [userNoob, setUserNoob] = useState<number | null>(null);
  const [noobGuidlData, setNoobGuidlData] = useState<NFTData | null>(null);

  const { writeAsync: mintItem, isLoading: isMinting } = useScaffoldContractWrite({
    contractName: "Noob",
    functionName: "mintItem",
    // args: [],
    // value: "0.01",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  // const { data: noobSupply, isLoading: isNoobSupplyLoading } = useScaffoldContractRead({
  //     contractName: "Noob",
  //     functionName: "totalSupply",
  // });

  const { data: balanceOf } = useScaffoldContractRead({
    contractName: "Noob",
    functionName: "balanceOf",
    args: [address],
  });

  const { data: tokenOfOwnerByIndex, isLoading: isLoadingToken } = useScaffoldContractRead({
    contractName: "Noob",
    functionName: "tokenOfOwnerByIndex",
    args: [address, guidler ? BigInt(0) : undefined],
  });

  const { data: tokenURI, isLoading: isLoadingTokenURI } = useScaffoldContractRead({
    contractName: "Noob",
    functionName: "tokenURI",
    args: [guidler && userNoob ? BigInt(userNoob) : undefined],
  });

  useEffect(() => {
    // Check if the user is connected and the balance is available
    if (!isConnected || !address || !balanceOf || Number(balanceOf) === 0) return;

    // Set guidler to true to trigger fetching the token
    setGuidler(true);
  }, [address, isConnected, balanceOf]);

  useEffect(() => {
    // Check if isLoadingToken is false and the token data is available
    if (!isLoadingToken && tokenOfOwnerByIndex) {
      // Use the tokenOfOwnerByIndex hook to get the token ID of the user
      const tokenId = Number(tokenOfOwnerByIndex);

      // Set the fetched tokenId in the userNoob state
      setUserNoob(tokenId);
    }
  }, [isLoadingToken, tokenOfOwnerByIndex]);

  // useEffect hook to fetch tokenURI when it's not loading and not undefined
  useEffect(() => {
    if (!isLoadingTokenURI && tokenURI) {
      try {
        // Decode the Base64-encoded JSON string and extract the image data
        const jsonManifest = JSON.parse(Buffer.from(tokenURI.split(",")[1], "base64").toString("utf-8"));
        // Create an object containing the tokenId, tokenURI, owner address, and other JSON manifest data
        const yourGuidlData = { id: userNoob, uri: tokenURI, owner: address, ...jsonManifest };
        setNoobGuidlData(yourGuidlData);
      } catch (error) {
        console.error("Error fetching tokenURI:", error);
      }
    }
  }, [isLoadingTokenURI, tokenURI]);

  async function mint() {
    try {
      // If the user already has a Noob, do not allow minting
      if (userNoob !== null) {
        console.log("User already has a Noob.");
        return;
      }

      await mintItem();
    } catch (error) {
      console.error("Error minting Noob:", error);
    }
  }

  return (
    <div>
      <div className="flex justify-center">
        <button onClick={() => mint()}>{isMinting ? "minting" : "mint"}</button>
      </div>

      <div>
        {/* Check if tokenURI is available before rendering the Noob token */}
        {noobGuidlData && (
          <div>
            <NFTCard data={noobGuidlData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Noob;
