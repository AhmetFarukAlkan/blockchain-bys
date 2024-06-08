const { Web3 } = require("web3");
const {
  SenderCheckerContractAddress,
} = require("../../../Constants/contractConstants.js");
const SenderCheckerAbi = require("../../Abies/SenderCheckerAbi.js");
require("dotenv").config();

const web3 = new Web3(process.env.GANACHE_URL);
const SenderCheckerContract = new web3.eth.Contract(SenderCheckerAbi, SenderCheckerContractAddress);

module.exports = SenderCheckerContract;
