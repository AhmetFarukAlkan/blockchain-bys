// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SenderChecker.sol";

contract UserContract {
    struct User {
        uint userId;
        string name;
        string surname;
        string number;
        string password;
        string mail;
        string phone;
        string[] roles;
        uint created_at;
        bool isActive;
    }

    struct AdvisorStudent {
        uint teacherId;
        uint[] studentIds;
        uint departmentId;
    }

    struct UserDepartment {
        uint userId;
        uint departmentId;
        string role;
        bool isActive;
    }

    uint public userCounter;
    uint public advisorStudentCounter;

    SenderChecker public senderChecker;

    mapping(uint => User) public users;
    mapping(uint => AdvisorStudent) public advisorStudents;
    mapping(uint => UserDepartment[]) public userDepartments;

    event UserAdded(uint userId, string name, string surname, string number, string password, string mail, string phone, string[] roles, uint created_at);
    event UserUpdated(uint userId, string name, string surname, string number, string password, string mail, string phone, string[] roles);
    event UserDeleted(uint userId);
    event AdvisorStudentUpdated(uint teacherId, uint[] studentIds);
    event UserDepartmentAdded(uint userId, uint departmentId, string role);
    event UserApproved(uint userId);

    constructor(address _senderCheckerAddress) {
        senderChecker = SenderChecker(_senderCheckerAddress);
    }

    modifier userExists(uint userId) {
        require(users[userId].userId != 0, "User does not exist");
        _;
    }

    modifier onlyAllowedSender() {
        require(senderChecker.isAllowedSender(msg.sender), "Sender not allowed.");
        _;
    }

    function autoIncrementUserCounter() internal {
        userCounter++;
    }

    function addUser(
        string memory _name,
        string memory _surname,
        string memory _number,
        string memory _password,
        string memory _mail,
        string memory _phone,
        string[] memory _roles,
        bool _isActive
    ) public onlyAllowedSender {
        autoIncrementUserCounter();
        uint userId = userCounter;
        uint created_at = block.timestamp;
        users[userId] = User(userId, _name, _surname, _number, _password, _mail, _phone, _roles, created_at, _isActive);
        emit UserAdded(userId, _name, _surname, _number, _password, _mail, _phone, _roles, created_at);
    }

    function addAdvisorStudentRelationship(uint teacherId, uint[] memory studentIds, uint departmentId) public onlyAllowedSender userExists(teacherId) {
        advisorStudents[teacherId] = AdvisorStudent(teacherId, studentIds, departmentId);
        emit AdvisorStudentUpdated(teacherId, studentIds);
    }

    function getStudentsOfAdvisor(uint teacherId) public view userExists(teacherId) returns (uint[] memory) {
        return advisorStudents[teacherId].studentIds;
    }

    function addStudentToAdvisor(uint teacherId, uint studentId) public onlyAllowedSender userExists(teacherId) {
        advisorStudents[teacherId].studentIds.push(studentId);
        emit AdvisorStudentUpdated(teacherId, advisorStudents[teacherId].studentIds);
    }

    function removeStudentFromAdvisor(uint teacherId, uint studentId) public onlyAllowedSender userExists(teacherId) {
        uint[] storage students = advisorStudents[teacherId].studentIds;
        for (uint i = 0; i < students.length; i++) {
            if (students[i] == studentId) {
                students[i] = students[students.length - 1];
                students.pop();
                emit AdvisorStudentUpdated(teacherId, students);
                return;
            }
        }
        revert("Student not found in advisor's list");
    }

    function addUserDepartment(uint userId, uint departmentId, string memory role, bool isActive) public onlyAllowedSender userExists(userId) {
        userDepartments[userId].push(UserDepartment(userId, departmentId, role, isActive));
        emit UserDepartmentAdded(userId, departmentId, role);
    }

    function getUserDepartments(uint userId) public view userExists(userId) returns (UserDepartment[] memory) {
        return userDepartments[userId];
    }

    function updateUserDepartmentStatus(uint userId, uint departmentId, bool isActive) public onlyAllowedSender userExists(userId) {
        UserDepartment[] storage departments = userDepartments[userId];
        for (uint i = 0; i < departments.length; i++) {
            if (departments[i].departmentId == departmentId) {
                departments[i].isActive = isActive;
                return;
            }
        }
        revert("UserDepartment not found for the given userId and departmentId");
    }

    function getUserPersonalInfo(uint userId) public view userExists(userId) returns (string memory, string memory, string memory, string memory, string memory) {
        return (
            users[userId].name,
            users[userId].surname,
            users[userId].number,
            users[userId].mail,
            users[userId].phone
        );
    }

    function getUserByEmailAndPassword(string memory _email, string memory _password) public view returns (User memory) {
        for (uint i = 1; i <= userCounter; i++) {
            if (keccak256(bytes(users[i].mail)) == keccak256(bytes(_email)) && keccak256(bytes(users[i].password)) == keccak256(bytes(_password))) {
                return users[i];
            }
        }
        revert("User does not exist");
    }

    function getAllUserIds() public view returns (uint[] memory) {
        uint[] memory userIds = new uint[](userCounter);
        uint index = 0;
        for (uint i = 1; i <= userCounter; i++) {
            if (users[i].userId != 0) {
                userIds[index] = users[i].userId;
                index++;
            }
        }
        return userIds;
    }

    function getUsersByIds(uint[] memory ids) public view returns (User[] memory) {
        User[] memory userList = new User[](ids.length);
        for (uint i = 0; i < ids.length; i++) {
            if (users[ids[i]].userId != 0) {
                userList[i] = users[ids[i]];
            }
        }
        return userList;
    }

    function getAllUsers() public view returns (User[] memory) {
        return getUsersByIds(getAllUserIds());
    }
    
    function updateUser(
        uint userId,
        string memory _name,
        string memory _surname,
        string memory _number,
        string memory _password,
        string memory _mail,
        string memory _phone,
        string[] memory _roles,
        bool _isActive
    ) public onlyAllowedSender userExists(userId) {
        users[userId].name = _name;
        users[userId].surname = _surname;
        users[userId].number = _number;
        users[userId].password = _password;
        users[userId].mail = _mail;
        users[userId].phone = _phone;
        users[userId].roles = _roles;
        users[userId].isActive = _isActive;
        emit UserUpdated(userId, _name, _surname, _number, _password, _mail, _phone, _roles);
    }

    function approveUser(
        uint userId,
        string memory _number,
        string[] memory _roles,
        bool _isActive
    ) public onlyAllowedSender userExists(userId) {
        users[userId].number = _number;
        users[userId].roles = _roles;
        users[userId].isActive = _isActive;
    }

    function deleteUser(uint userId) public onlyAllowedSender userExists(userId) {
        delete users[userId];
        emit UserDeleted(userId);
    }

    // Getter Functions

    function getUser(uint userId) public view userExists(userId) returns (User memory) {
        return users[userId];
    }

    function getFullName(uint userId) public view userExists(userId) returns (string memory) {  
        string memory fullName = string(abi.encodePacked(users[userId].name, " ", users[userId].surname));
        return fullName;
    }

    function getUserNumber(uint userId) public view userExists(userId) returns (string memory) {
        return users[userId].number;
    }

    function getUserRoles(uint userId) public view userExists(userId) returns (string[] memory) {
        return users[userId].roles;
    }

    function getAdvisorInfo(uint teacherId) public view userExists(teacherId) returns (AdvisorStudent memory) {
        return advisorStudents[teacherId];
    }

    // Setter Functions

    function setUserRoles(uint userId, string[] memory newRoles) public onlyAllowedSender userExists(userId) {
        users[userId].roles = newRoles;
        emit UserUpdated(userId, users[userId].name, users[userId].surname, users[userId].number, users[userId].password, users[userId].mail, users[userId].phone, newRoles);
    }
}
