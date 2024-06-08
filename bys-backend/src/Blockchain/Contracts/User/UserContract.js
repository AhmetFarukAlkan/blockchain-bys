const ethers = require("ethers");
const { Web3 } = require("web3");
const {
  walletPrivateKey,
  UserContractAddress,
} = require("../../../Constants/contractConstants.js");
const UserAbi = require("../../Abies/UserAbi.js");
require("dotenv").config();

const wallet = new ethers.Wallet(walletPrivateKey);
const web3 = new Web3(process.env.GANACHE_URL);
const UserContract = new web3.eth.Contract(UserAbi, UserContractAddress);

module.exports = UserContract;
