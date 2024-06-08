const ethers = require("ethers");
const { Web3 } = require('web3');
const {walletPrivateKey, CourseContractAddress} = require("../../../Constants/contractConstants.js");
const CourseAbi = require("../../Abies/CourseAbi.js");
require('dotenv').config();

const wallet = new ethers.Wallet(walletPrivateKey);
const web3 = new Web3(process.env.GANACHE_URL);
const CourseContract = new web3.eth.Contract(CourseAbi, CourseContractAddress);

module.exports = CourseContract;
