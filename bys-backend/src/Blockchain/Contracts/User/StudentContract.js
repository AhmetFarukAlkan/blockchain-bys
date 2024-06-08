const { Web3 } = require("web3");
const {
  StudentContractAddress,
} = require("../../../Constants/contractConstants.js");
const StudentAbi = require("../../Abies/StudentAbi.js");
require("dotenv").config();

const web3 = new Web3(process.env.GANACHE_URL);
const StudentContract = new web3.eth.Contract(StudentAbi, StudentContractAddress);

module.exports = StudentContract;
