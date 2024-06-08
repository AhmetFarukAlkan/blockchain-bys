const { Web3 } = require("web3");
const {
  walletPrivateKey,
  TeacherContractAddress,
} = require("../../../Constants/contractConstants.js");
const TeacherAbi = require("../../Abies/TeacherAbi.js");
require("dotenv").config();

const web3 = new Web3(process.env.GANACHE_URL);
const TeacherContract = new web3.eth.Contract(TeacherAbi, TeacherContractAddress);

module.exports = TeacherContract;
