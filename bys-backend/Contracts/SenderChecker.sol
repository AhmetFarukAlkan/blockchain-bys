// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SenderChecker {

    address[] public allowedSenders;

    address public owner;

    uint public allowedSendersCounter;

    constructor() {
        owner = msg.sender;
        allowedSenders.push(owner);
        autoIncrementCounter();
    }

    function autoIncrementCounter() internal {
        allowedSendersCounter++;
    }

    function addAllowedSender(address _sender) public onlyAllowedSender {
        if (isAllowedSender(_sender)) {
            return;
        }        
        allowedSenders.push(_sender);
        autoIncrementCounter();
    }

    function removeAllowedSender(address _sender) public onlyAllowedSender {
        require(isAllowedSender(_sender), "Sender not allowed.");
        for (uint i = 0; i < allowedSendersCounter; i++) {
            if (allowedSenders[i] == _sender) {
                delete allowedSenders[i];
                allowedSendersCounter--;
                allowedSenders[i] = allowedSenders[allowedSendersCounter];
                delete allowedSenders[allowedSendersCounter];
                break;
            }
        }
    }

    function isAllowedSender(address _sender) public view returns (bool) {
        for (uint i = 0; i < allowedSendersCounter; i++) {
            if (allowedSenders[i] == _sender) {
                return true;
            }
        }
        return false;
    }

    modifier onlyAllowedSender() {
        require(isAllowedSender(msg.sender), "Sender not allowed.");
        _;
    }
}
