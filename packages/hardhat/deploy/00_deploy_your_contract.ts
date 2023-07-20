import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const cape = await deploy("Cape", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
  const arms = await deploy("Arms", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
  const chest = await deploy("Chest", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
  const capeFront = await deploy("CapeFront", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
  const boots = await deploy("Boots", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
  const waist = await deploy("Waist", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
  const headmail = await deploy("HeadMail", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
  const helmet = await deploy("Helmet", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
  const ethlogo = await deploy("ETHLogo", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
  const sword = await deploy("Sword", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
  // const castle = await deploy("Castle", {
  //     from: deployer,
  //     args: [],
  //     log: true,
  //   });
  await deploy("Noob", {
    from: deployer,
    args: [
      cape.address,
      arms.address,
      chest.address,
      capeFront.address,
      boots.address,
      waist.address,
      headmail.address,
      helmet.address,
      ethlogo.address,
      sword.address,
    ],
    log: true,
    autoMine: true,
  });
  // Get the deployed contract
  // const yourContract = await hre.ethers.getContract("YourContract", deployer);
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["Noob"];
