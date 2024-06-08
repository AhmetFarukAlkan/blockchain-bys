const { Web3 } = require('web3');
const {DepartmentOpenedCourseContractAddress} = require("../../../Constants/contractConstants.js");
const DepartmentOpenedCourseAbi = require("../../Abies/DepartmentOpenedCourseAbi.js");
require('dotenv').config();

const web3 = new Web3(process.env.GANACHE_URL);
const DepartmentOpenedCourseContract = new web3.eth.Contract(DepartmentOpenedCourseAbi, DepartmentOpenedCourseContractAddress);

module.exports = DepartmentOpenedCourseContract;
