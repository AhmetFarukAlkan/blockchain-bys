// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserContract.sol";
import "./FacultyContract.sol";
import "./SenderChecker.sol";

contract DepartmentContract {
    struct Department {
        uint departmentId;
        string name;
        uint facultyId;
        string email;
        string phoneNumber;
        string location;
        string degreeLevel;
        string walletAddress;
    }

    enum DegreeLevel { bachelor, associate, master, phd }

    uint public departmentCounter;

    mapping(uint => Department) public departments;

    SenderChecker public senderChecker;

    event DepartmentAdded(uint departmentId, string name, uint facultyId, string email, string phoneNumber, string location, string degreeLevel); // Event güncellendi

    modifier departmentExists(uint departmentId) {
        require(departments[departmentId].departmentId != 0, "Department does not exist");
        _;
    }

    constructor(address _senderCheckerAddress) {
        senderChecker = SenderChecker(_senderCheckerAddress);
    }

    modifier onlyAllowedSender() {
        require(senderChecker.isAllowedSender(msg.sender), "Sender not allowed.");
        _;
    }

    function autoIncrementDepartmentCounter() internal {
        departmentCounter++;
    }

    function addDepartment(
        string memory _name, 
        uint _facultyId, 
        string memory _email, 
        string memory _phoneNumber, 
        string memory _location, 
        string memory _degreeLevel,
        string memory _walletAddress
    ) public onlyAllowedSender {
        autoIncrementDepartmentCounter();
        uint departmentId = departmentCounter;
        departments[departmentId] = Department(departmentId, _name, _facultyId, _email, _phoneNumber, _location, _degreeLevel, _walletAddress);
        emit DepartmentAdded(departmentId, _name, _facultyId, _email, _phoneNumber, _location, _degreeLevel);
    }

    function getDepartment(uint departmentId) public view departmentExists(departmentId) returns (Department memory) {
        return departments[departmentId];
    }

    function getAllDepartments() public view returns (Department[] memory) {
        Department[] memory allDepartments = new Department[](departmentCounter);
        uint index = 0;
        for (uint i = 1; i <= departmentCounter; i++) {
            if (departments[i].facultyId != 0) {
                allDepartments[index] = departments[i];
                index++;
            }
        }
        return allDepartments;
    }

    function updateDepartment(
        uint departmentId, 
        string memory _name, 
        uint _facultyId, 
        string memory _email, 
        string memory _phoneNumber, 
        string memory _location,
        string memory _degreeLevel,
        string memory _walletAddress
    ) public departmentExists(departmentId) onlyAllowedSender {
        departments[departmentId].name = _name;
        departments[departmentId].facultyId = _facultyId;
        departments[departmentId].email = _email;
        departments[departmentId].phoneNumber = _phoneNumber;
        departments[departmentId].location = _location;
        departments[departmentId].degreeLevel = _degreeLevel;
        departments[departmentId].walletAddress = _walletAddress;
    }

    function deleteDepartment(uint departmentId) public departmentExists(departmentId) onlyAllowedSender {
        delete departments[departmentId];
    }

    function getDepartmentsByFaculty(uint _facultyId) public view returns (Department[] memory) {
        uint count = 0;

        for (uint i = 1; i <= departmentCounter; i++) {
            if (departments[i].facultyId == _facultyId) {
                count++;
            }
        }

        if (count == 0) {
            return new Department[](0);
        }

        Department[] memory facultyDepartments = new Department[](count);
        uint index = 0;

        for (uint i = 1; i <= departmentCounter; i++) {
            if (departments[i].facultyId == _facultyId) {
                facultyDepartments[index] = departments[i];
                index++;
            }
        }

        return facultyDepartments;
    }

    function getDepartmentWithFaculty(uint departmentId, address facultyContractAddress) public view departmentExists(departmentId) returns (string memory, uint, string memory, string memory, string memory, string memory, string memory) {
        Department memory department = departments[departmentId];

        FacultyContract facultyContract = FacultyContract(facultyContractAddress);

        return (department.name, department.facultyId, facultyContract.getFacultyName(department.facultyId), department.email, department.phoneNumber, department.location, department.degreeLevel);
    }

    function push(uint[] memory arr, uint element) internal pure returns (uint[] memory) {
        uint newArrLength = arr.length + 1;
        uint[] memory newArr = new uint[](newArrLength);
        for (uint i = 0; i < arr.length; i++) {
            newArr[i] = arr[i];
        }
        newArr[newArrLength - 1] = element;
        return newArr;
    }

    // Getter Functions

    function getDepartmentName(uint departmentId) public view departmentExists(departmentId) returns (string memory){
        return departments[departmentId].name;
    }

    function getFacultyId(uint departmentId) public view departmentExists(departmentId) returns (uint) {
        return departments[departmentId].facultyId;
    }

    function getDepartmentEmail(uint departmentId) public view departmentExists(departmentId) returns (string memory) {
        return departments[departmentId].email;
    }
    
    function getDepartmentPhoneNumber(uint departmentId) public view departmentExists(departmentId) returns (string memory) {
        return departments[departmentId].phoneNumber;
    }

    function getDepartmentLocation(uint departmentId) public view departmentExists(departmentId) returns (string memory) {
        return departments[departmentId].location;
    }

    function getDepartmentWalletAddress(uint departmentId) public view departmentExists(departmentId) returns (string memory) {
        return departments[departmentId].walletAddress;
    }

    function getStudentDepartmentIds(uint userId, address userContractAddress) public view returns (uint[] memory) {
        UserContract userContract = UserContract(userContractAddress);
        UserContract.UserDepartment[] memory userDepartments = userContract.getUserDepartments(userId);
        uint[] memory departmentsIds = new uint[](0);

        for (uint i = 0; i < userDepartments.length; i++) {
            if (keccak256(abi.encodePacked(userDepartments[i].role)) == keccak256(abi.encodePacked("Student"))) {
                departmentsIds = push(departmentsIds, userDepartments[i].departmentId);
            }
        }

        return departmentsIds;
    }

    function getDepartmentsByStudent(uint userId, address userContractAddress) public view returns (Department[] memory) {
        uint[] memory userDepartmentIds = getStudentDepartmentIds(userId, userContractAddress);

        Department[] memory studentDepartments = new Department[](userDepartmentIds.length);

        for (uint i = 0; i < userDepartmentIds.length; i++) {
            uint departmentId = userDepartmentIds[i];
            studentDepartments[i] = departments[departmentId];
        }

        return studentDepartments;
    }

    function getTeacherDepartmentIds(uint userId, address userContractAddress) public view returns (uint[] memory) {
        UserContract userContract = UserContract(userContractAddress);
        UserContract.UserDepartment[] memory userDepartments = userContract.getUserDepartments(userId);
        uint[] memory departmentsIds = new uint[](0);

        for (uint i = 0; i < userDepartments.length; i++) {
            if (keccak256(abi.encodePacked(userDepartments[i].role)) == keccak256(abi.encodePacked("Teacher"))) {
                departmentsIds = push(departmentsIds, userDepartments[i].departmentId);
            }
        }

        return departmentsIds;
    }

    
    function getDepartmentsByTeacher(uint userId, address userContractAddress) public view returns (Department[] memory) {
        uint[] memory userDepartmentIds = getTeacherDepartmentIds(userId, userContractAddress);

        Department[] memory teacherDepartments = new Department[](userDepartmentIds.length);

        for (uint i = 0; i < userDepartmentIds.length; i++) {
            uint departmentId = userDepartmentIds[i];
            teacherDepartments[i] = departments[departmentId];
        }

        return teacherDepartments;
    }

    // Setter Functions

    function setDepartmentName(uint departmentId, string memory _name) public departmentExists(departmentId) onlyAllowedSender {        
        departments[departmentId].name = _name;
    }

    function setFacultyId(uint departmentId, uint _facultyId) public departmentExists(departmentId) onlyAllowedSender {        
        departments[departmentId].facultyId = _facultyId;
    }

    function setDepartmentEmail(uint departmentId, string memory _email) public departmentExists(departmentId) onlyAllowedSender {        
        departments[departmentId].email = _email;
    }

    function setDepartmentPhoneNumber(uint departmentId, string memory _phoneNumber) public departmentExists(departmentId) onlyAllowedSender {        
        departments[departmentId].phoneNumber = _phoneNumber;
    }

    function setDepartmentLocation(uint departmentId, string memory _location) public departmentExists(departmentId) onlyAllowedSender {        
        departments[departmentId].location = _location;
    }
}
