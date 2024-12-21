import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

// This function deploys the SimpleDEX contract, ensuring that TokenA and TokenB are deployed first.
const deploySimpleDEX: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // Get the deployer address from Hardhat's named accounts.
  const { deployer } = await hre.getNamedAccounts();
  // Get the deploy function and the get function from Hardhat deployments.  The get function is used to retrieve already deployed contracts.
  const { deploy, get } = hre.deployments;

  // Try to get TokenA. If it's not deployed, deploy it.
  let tokenA = await get("TokenA");
  if (!tokenA.address) {
    console.log("Deploying TokenA...");
    await deploy("TokenA", { from: deployer, log: true });
    tokenA = await get("TokenA"); // Get the newly deployed contract instance.
    console.log("TokenA deployed at:", tokenA.address);
  } else {
    console.log("TokenA already deployed at:", tokenA.address);
  }

  // Try to get TokenB. If it's not deployed, deploy it.
  let tokenB = await get("TokenB");
  if (!tokenB.address) {
    console.log("Deploying TokenB...");
    await deploy("TokenB", { from: deployer, log: true });
    tokenB = await get("TokenB"); // Get the newly deployed contract instance.
    console.log("TokenB deployed at:", tokenB.address);
  } else {
    console.log("TokenB already deployed at:", tokenB.address);
  }

  // Deploy the SimpleDEX contract, passing the addresses of TokenA and TokenB as constructor arguments.
  console.log("Deploying SimpleDEX...");
  await deploy("SimpleDEX", {
    from: deployer,
    args: [tokenA.address, tokenB.address],
    log: true,
    autoMine: true, // Speeds up deployment on local networks.  No effect on mainnet.
  });

  // Get the deployed SimpleDEX contract instance.
  const SimpleDEX = await hre.ethers.getContract<Contract>("SimpleDEX", deployer);
  console.log("SimpleDEX deployed at:", SimpleDEX.address);
};

export default deploySimpleDEX;

// Tag for easier deployment management.  Allows deploying only this contract using "yarn hardhat deploy --tags SimpleDEX"
deploySimpleDEX.tags = ["SimpleDEX"];
deploySimpleDEX.dependencies = ["TokenA", "TokenB"]; // Ensures TokenA and TokenB are deployed before SimpleDEX.
