require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');
const app = express();
const port = 3000;

console.log(`Private Key: ${process.env.PRIVATE_KEY}`);
console.log(`Network URL: ${process.env.NETWORK_URL}`);
console.log(`Contract Address: ${process.env.CONTRACT_ADDRESS}`);

// Loading Contract ABI.
const RewardTokenArtifact = require('../artifacts/contracts/Reward.sol/Reward.json');

// Initializing ethers with environment variables.
const provider = new ethers.providers.JsonRpcProvider(process.env.NETWORK_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const rewardTokenContract = new ethers.Contract(process.env.CONTRACT_ADDRESS, RewardTokenArtifact.abi, wallet);

app.use(express.json());

app.post('/mint', async (req, res) => {
  // @TODO: RBAC.
  console.log(`Attempting to mint a Reward...`);
  const { address, tokenURI } = req.body;
  try {
    const tx = await rewardTokenContract.mintReward(address, tokenURI);
    await tx.wait();
    console.log(`Successfully minted a Reward for ${address} with Token URI ${tokenURI}.`);
    res.json({ success: true, message: `NFT minted to ${address}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/burn', async (req, res) => {
  // @TODO: RBAC.
  console.log(`Attempting to burn a Reward...`);
  const { tokenId } = req.body;
  try {
    const tx = await rewardTokenContract.burn(tokenId);
    await tx.wait();
    console.log(`Successfully burned Reward ID ${tokenId}.`);
    res.json({ success: true, message: `NFT with ID ${tokenId} burned` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/transfer', async (req, res) => {
  // @TODO: RBAC.
  console.log(`Attempting to transfer a Reward...`);
  const { from, to, tokenId } = req.body;
  try {
    const tx = await rewardTokenContract.transferReward(from, to, tokenId);
    await tx.wait();
    console.log(`Successfully transferred Reward ID ${tokenId} from ${from} to ${to}.`);
    res.json({ success: true, message: `NFT with ID ${tokenId} transferred from ${from} to ${to}.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
