// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserContract.sol";
import "./OpenedCourseContract.sol";
import "./SenderChecker.sol";

contract TeacherContract {

    address public userContractAddress;
    address public openedCourseContractAddress;
    SenderChecker public senderChecker;

    constructor(address _userContractAddress, address _openedCourseContractAddress, address _senderCheckerAddress) {
        userContractAddress = _userContractAddress;
        openedCourseContractAddress = _openedCourseContractAddress;
        senderChecker = SenderChecker(_senderCheckerAddress);
    }

    modifier onlyAllowedSender() {
        require(senderChecker.isAllowedSender(msg.sender), "Sender not allowed.");
        _;
    }

    function getTeacherCourses(
        uint teacherId, 
        uint _departmentId,
        uint _year,
        uint _semester
    ) public view returns (OpenedCourseContract.OpenedCourseDTO[] memory) {
        OpenedCourseContract openedCourseContract = getOpenedCourseContract();

        OpenedCourseContract.OpenedCourseDTO[] memory teacherCourses = new OpenedCourseContract.OpenedCourseDTO[](openedCourseContract.openedCourseCounter());

        uint teacherCourseIndex = 0;

        for (uint i = 1; i <= openedCourseContract.openedCourseCounter(); i++) {
            OpenedCourseContract.OpenedCourseDTO memory course = openedCourseContract.getOpenedCourseDetail(i);
            if (course.id != 0 && isTeacherAssigned(course.id, teacherId) && course.departmentId == _departmentId && course.year == _year && course.semester == _semester) {
                teacherCourses[teacherCourseIndex] = course;
                teacherCourseIndex++;
            }
        }

        return teacherCourses;
    }

    function getTeacherCourses(
        uint teacherId, 
        uint _departmentId
    ) public view returns (OpenedCourseContract.OpenedCourseDTO[] memory) {
        OpenedCourseContract openedCourseContract = getOpenedCourseContract();

        OpenedCourseContract.OpenedCourseDTO[] memory teacherCourses = new OpenedCourseContract.OpenedCourseDTO[](openedCourseContract.openedCourseCounter());

        uint teacherCourseIndex = 0;

        for (uint i = 1; i <= openedCourseContract.openedCourseCounter(); i++) {
            OpenedCourseContract.OpenedCourseDTO memory course = openedCourseContract.getOpenedCourseDetail(i);
            if (course.id != 0 && isTeacherAssigned(course.id, teacherId) && course.departmentId == _departmentId) {
                teacherCourses[teacherCourseIndex] = course;
                teacherCourseIndex++;
            }
        }

        return teacherCourses;
    }

    function isTeacherAssigned(uint courseId, uint teacherId) internal view returns (bool) {
        OpenedCourseContract openedCourseContract = getOpenedCourseContract();

        OpenedCourseContract.OpenedCourseDTO memory course = openedCourseContract.getOpenedCourseDetail(courseId);

        uint[] memory teachers = course.teacherIds;

        for (uint i = 0; i < teachers.length; i++) {
            if (teachers[i] == teacherId) {
                return true;
            }
        }

        return false;
    }

    function getTeachersByDepartment(uint departmentId) public view returns (UserContract.User[] memory) {
        UserContract userContract = getUserContract();
        
        uint[] memory userIds = userContract.getAllUserIds();
        uint count;
        for (uint i = 0; i < userIds.length; i++) {
            UserContract.UserDepartment[] memory departments = userContract.getUserDepartments(userIds[i]);
            for (uint j = 0; j < departments.length; j++) {
                if (departments[j].departmentId == departmentId && keccak256(bytes(departments[j].role)) == keccak256(bytes("Teacher"))) {
                    count++;
                }
            }
        }
        
        UserContract.User[] memory teachers = new UserContract.User[](count);
        count = 0;
        for (uint i = 0; i < userIds.length; i++) {
            UserContract.UserDepartment[] memory departments = userContract.getUserDepartments(userIds[i]);
            for (uint j = 0; j < departments.length; j++) {
                if (departments[j].departmentId == departmentId && keccak256(bytes(departments[j].role)) == keccak256(bytes("Teacher"))) {
                    teachers[count] = userContract.getUser(userIds[i]);
                    count++;
                }
            }
        }
        
        return teachers;
    }

    function getAdvisorStudents(uint teacherId) public view returns (UserContract.User[] memory) {
        UserContract userContract = getUserContract();

        return userContract.getUsersByIds(userContract.getStudentsOfAdvisor(teacherId));
    }

    function getUserContract() public view returns (UserContract) {
        UserContract userContract = UserContract(userContractAddress);

        return userContract;
    }

    function getOpenedCourseContract() public view returns (OpenedCourseContract) {
        OpenedCourseContract openedCourseContract = OpenedCourseContract(openedCourseContractAddress);

        return openedCourseContract;
    }

    function getTeacherOpenedCourseIds(uint teacherId, uint _departmentId) public view returns (uint[] memory) {
        OpenedCourseContract openedCourseContract = getOpenedCourseContract();
        
        uint[] memory teacherOpenedCourseIds = new uint[](openedCourseContract.openedCourseCounter());
        uint teacherOpenedCourseIndex = 0;

        for (uint i = 1; i <= openedCourseContract.openedCourseCounter(); i++) {
            OpenedCourseContract.OpenedCourseDTO memory course = openedCourseContract.getOpenedCourseDetail(i);
            
            if (course.id != 0 && isTeacherAssigned(course.id, teacherId) && course.departmentId == _departmentId) {
                teacherOpenedCourseIds[teacherOpenedCourseIndex] = course.id;
                teacherOpenedCourseIndex++;
            }
        }
        
        return teacherOpenedCourseIds;
    }

    function setUserContractAddress(address _userContractAddress) external onlyAllowedSender{
        userContractAddress = _userContractAddress;
    }

    function setOpenedCourseContractAddress(address _openedCourseContractAddress) external onlyAllowedSender{
        openedCourseContractAddress = _openedCourseContractAddress;
    }
}
