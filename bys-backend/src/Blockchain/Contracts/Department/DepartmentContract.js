const ethers = require("ethers");
const { Web3 } = require('web3');
const {walletPrivateKey, DepartmentContractAddress} = require("../../../Constants/contractConstants.js");
const DepartmentAbi = require("../../Abies/DepartmentAbi.js");
require('dotenv').config();

const wallet = new ethers.Wallet(walletPrivateKey);
const web3 = new Web3(process.env.GANACHE_URL);
const DepartmentContract = new web3.eth.Contract(DepartmentAbi, DepartmentContractAddress);

module.exports = DepartmentContract;
