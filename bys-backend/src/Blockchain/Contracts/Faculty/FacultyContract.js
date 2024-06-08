const ethers = require("ethers");
const { Web3 } = require('web3');
const { walletPrivateKey, FacultyContractAddress} = require("../../../Constants/contractConstants.js");
const FacultyAbi = require("../../Abies/FacultyAbi.js");
require('dotenv').config();

const wallet = new ethers.Wallet(walletPrivateKey);
const web3 = new Web3(process.env.GANACHE_URL);
const FacultyContract = new web3.eth.Contract(FacultyAbi, FacultyContractAddress);

module.exports = FacultyContract;
