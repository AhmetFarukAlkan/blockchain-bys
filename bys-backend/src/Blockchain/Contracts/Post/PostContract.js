const ethers = require("ethers");
const { Web3 } = require('web3');
const {walletPrivateKey, PostContractAddress} = require("../../../Constants/contractConstants.js");
const PostAbi = require("../../Abies/PostAbi.js");
require('dotenv').config();

const wallet = new ethers.Wallet(walletPrivateKey);
const web3 = new Web3(process.env.GANACHE_URL);
const PostContract = new web3.eth.Contract(PostAbi, PostContractAddress);

module.exports = PostContract;
