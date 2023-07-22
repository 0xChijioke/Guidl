// import { useEffect, useState } from "react";
// import { useScaffoldContract, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Noob = () => {
  //   const { data: noob } = useScaffoldContract({ contractName: "Noob" });
  //   // console.log("noob: ", noob);

  //   const { writeAsync: mintItem, isLoading: isMinting } = useScaffoldContractWrite({
  //       contractName: "Noob",
  //       functionName: "mintItem",
  //       // args: [],
  //       // value: "0.01",
  //       onBlockConfirmation: txnReceipt => {
  //         console.log("📦 Transaction blockHash", txnReceipt.blockHash);
  //       },
  //   });

  //   const { data: noobSupply, isLoading: isNoobSupplyLoading } = useScaffoldContractRead({
  //       contractName: "Noob",
  //       functionName: "totalSupply",
  //   });

  // const [userNoobs, setUserNoobs] = useState<any[]>([]);

  // useEffect(() => {
  //   // Function to fetch and set the user's owned Noobs
  //   const fetchUserNoobs = async () => {
  //     if (noobSupply && noobSupply.toNumber() > 0) {
  //       const userAddress = "<Connected User Ethereum Address>"; // Replace with the actual user's Ethereum address
  //       const userNoobCount = await noob.balanceOf(userAddress);
  //       const userNoobIds = [];

  //       for (let i = 0; i < userNoobCount.toNumber(); i++) {
  //         const tokenId = await noob.tokenOfOwnerByIndex(userAddress, i);
  //         userNoobIds.push(tokenId.toNumber());
  //       }

  //       setUserNoobs(userNoobIds);
  //     }
  //   };

  //   fetchUserNoobs();
  // }, [noobSupply, noob]);

  return (
    <div>
      {/* <div>
        <button onClick={() => mintItem}>{isMinting ? "minting" : "mint" }</button>
      </div>

      
      <div>
        {userNoobs.map((tokenId) => (
          <div key={tokenId}>
            <img src={`<BaseURL>/token/${tokenId}`} alt={`Noob Token ${tokenId}`} />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Noob;
