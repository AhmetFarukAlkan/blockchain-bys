// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SenderChecker.sol";

contract FacultyContract {
    struct Faculty {
        uint facultyId;
        string name;
        string email;
        string phoneNumber;
        string location;
    }

    uint public facultyCounter;

    mapping(uint => Faculty) public faculties;
    SenderChecker public senderChecker;

    constructor(address _senderCheckerAddress) {
        senderChecker = SenderChecker(_senderCheckerAddress);
    }

    event FacultyAdded(uint facultyId, string name, string email, string phoneNumber, string location);

    modifier facultyExists(uint facultyId) {
        require(faculties[facultyId].facultyId != 0, "Faculty does not exist");
        _;
    }

    modifier onlyAllowedSender() {
        require(senderChecker.isAllowedSender(msg.sender), "Sender not allowed.");
        _;
    }

    function autoIncrementFacultyCounter() internal {
        facultyCounter++;
    }

    function addFaculty(string memory _name, string memory _email, string memory _phoneNumber, string memory _location) public onlyAllowedSender {
        autoIncrementFacultyCounter();
        uint facultyId = facultyCounter;
        faculties[facultyId] = Faculty(facultyId, _name, _email, _phoneNumber, _location);
        emit FacultyAdded(facultyId, _name, _email, _phoneNumber, _location);
    }

    function getFaculty(uint facultyId) public view facultyExists(facultyId) returns (string memory, string memory, string memory, string memory) {
        return (faculties[facultyId].name, faculties[facultyId].email, faculties[facultyId].phoneNumber, faculties[facultyId].location);
    }

    function getAllFaculties() public view returns (Faculty[] memory) {
        Faculty[] memory allFaculties = new Faculty[](facultyCounter);
        uint index = 0;
        for (uint i = 1; i <= facultyCounter; i++) {
            if (faculties[i].facultyId != 0) {
                allFaculties[index] = Faculty(
                    faculties[i].facultyId,
                    faculties[i].name,
                    faculties[i].email,
                    faculties[i].phoneNumber,
                    faculties[i].location
                );
                index++;
            }
        }
        return allFaculties;
    }

    function updateFaculty(uint facultyId, string memory _name, string memory _email, string memory _phoneNumber, string memory _location) public facultyExists(facultyId) onlyAllowedSender {
        faculties[facultyId].name = _name;
        faculties[facultyId].email = _email;
        faculties[facultyId].phoneNumber = _phoneNumber;
        faculties[facultyId].location = _location;
    }

    function deleteFaculty(uint facultyId) public facultyExists(facultyId) onlyAllowedSender {
        delete faculties[facultyId];
    }

    // Getter Functions

    function getFacultyName(uint facultyId) public view returns (string memory) {
        require(faculties[facultyId].facultyId != 0, "Faculty does not exist");

        return faculties[facultyId].name;
    }

    function getFacultyEmail(uint facultyId) public view returns (string memory) {
        require(faculties[facultyId].facultyId != 0, "Faculty does not exist");

        return faculties[facultyId].email;
    }
    
    function getFacultyPhoneNumber(uint facultyId) public view returns (string memory) {
        require(faculties[facultyId].facultyId != 0, "Faculty does not exist");

        return faculties[facultyId].phoneNumber;
    }

    function getFacultyLocation(uint facultyId) public view returns (string memory) {
        require(faculties[facultyId].facultyId != 0, "Faculty does not exist");

        return faculties[facultyId].location;
    }

    // Setter Functions
    
    function setFacultyName(uint facultyId, string memory _name) public onlyAllowedSender {
        require(faculties[facultyId].facultyId != 0, "Faculty does not exist");
        
        faculties[facultyId].name = _name;
    }

    function setFacultyEmail(uint facultyId, string memory _email) public onlyAllowedSender {
        require(faculties[facultyId].facultyId != 0, "Faculty does not exist");
        
        faculties[facultyId].email = _email;
    }

    function setFacultyPhoneNumber(uint facultyId, string memory _phoneNumber) public onlyAllowedSender {
        require(faculties[facultyId].facultyId != 0, "Faculty does not exist");
        
        faculties[facultyId].phoneNumber = _phoneNumber;
    }

    function setFacultyLocation(uint facultyId, string memory _location) public onlyAllowedSender {
        require(faculties[facultyId].facultyId != 0, "Faculty does not exist");
        
        faculties[facultyId].location = _location;
    }
}
