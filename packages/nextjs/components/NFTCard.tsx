import { Address } from "./scaffold-eth";
import { NFTData } from "~~/types";

type Props = {
  data: NFTData;
};

const NFTCard = ({ data }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center p-3 space-y-3 rounded-lg text-center bg-base-300">
      <img src={data.image} alt={data.name} />
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <div>
        Owner <Address address={data.owner} />
      </div>
      <a href={data.external_url} target="_blank" rel="noopener noreferrer">
        View on External Website
      </a>
    </div>
  );
};

export default NFTCard;
