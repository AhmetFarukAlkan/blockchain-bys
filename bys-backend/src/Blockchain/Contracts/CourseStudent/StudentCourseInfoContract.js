const ethers = require("ethers");
const { Web3 } = require('web3');
const {walletPrivateKey, StudentCourseInfoContractAddress} = require("../../../Constants/contractConstants.js");
const StudentCourseInfoContractAbi = require("../../Abies/StudentCourseInfoContractAbi.js");
require('dotenv').config();

const wallet = new ethers.Wallet(walletPrivateKey);
const web3 = new Web3(process.env.GANACHE_URL);
const StudentCourseInfoContract = new web3.eth.Contract(StudentCourseInfoContractAbi, StudentCourseInfoContractAddress);

module.exports = StudentCourseInfoContract;
