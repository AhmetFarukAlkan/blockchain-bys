const { Web3 } = require('web3');
const {OpenedCourseContractAddress} = require("../../../Constants/contractConstants.js");
const OpenedCourseAbi = require("../../Abies/OpenedCourseAbi.js");
require('dotenv').config();

const web3 = new Web3(process.env.GANACHE_URL);
const OpenedCourseContract = new web3.eth.Contract(OpenedCourseAbi, OpenedCourseContractAddress);

module.exports = OpenedCourseContract;
