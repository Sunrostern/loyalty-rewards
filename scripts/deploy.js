async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying Contracts with Account", deployer.address);

  const RewardToken = await ethers.getContractFactory("Reward");
  const rewardToken = await RewardToken.deploy();

  await rewardToken.deployed();

  console.log("RewardToken address:", rewardToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
