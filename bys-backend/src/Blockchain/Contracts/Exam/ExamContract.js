const { Web3 } = require("web3");
const {
  ExamContractAddress,
} = require("../../../Constants/contractConstants.js");
const ExamAbi = require("../../Abies/ExamAbi.js");
require("dotenv").config();

const web3 = new Web3(process.env.GANACHE_URL);
const ExamContract = new web3.eth.Contract(ExamAbi, ExamContractAddress);

module.exports = ExamContract;
