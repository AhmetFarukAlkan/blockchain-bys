// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserContract.sol";
import "./OpenedCourseContract.sol";
import "./StudentCourseInfoContract.sol";
import "./SenderChecker.sol";

contract StudentContract {

    address public userContractAddress;
    address public openedCourseContractAddress;
    address public studentCourseInfoContractAddress;
    SenderChecker public senderChecker;

    constructor(address _userContractAddress, address _openedCourseContractAddress, address _studentCourseInfoContractAddress, address _senderCheckerAddress) {
        userContractAddress = _userContractAddress;
        openedCourseContractAddress = _openedCourseContractAddress;
        studentCourseInfoContractAddress = _studentCourseInfoContractAddress;
        senderChecker = SenderChecker(_senderCheckerAddress);
    }

    modifier onlyAllowedSender() {
        require(senderChecker.isAllowedSender(msg.sender), "Sender not allowed.");
        _;
    }

    function getStudentsByDepartment(uint departmentId, bool isActive) public view returns (UserContract.User[] memory) {
        UserContract userContract = getUserContract();
        uint[] memory userIds = userContract.getAllUserIds();

        UserContract.User[] memory students = new UserContract.User[](0);

        for (uint i = 0; i < userIds.length; i++) {
            UserContract.UserDepartment[] memory departments = userContract.getUserDepartments(userIds[i]);

            for (uint j = 0; j < departments.length; j++) {
                if (departments[j].departmentId == departmentId && keccak256(abi.encodePacked(departments[j].role)) == keccak256(abi.encodePacked("Student")) && departments[j].isActive == isActive) {
                    UserContract.User memory user = userContract.getUser(userIds[i]);
                    students = resizeStudentsArray(students, students.length + 1);
                    students[students.length - 1] = user;
                }
            }
        }

        return students;
    }

    function resizeStudentsArray(UserContract.User[] memory currentStudents, uint newSize) internal pure returns (UserContract.User[] memory) {
        UserContract.User[] memory resizedStudents = new UserContract.User[](newSize);
        for (uint i = 0; i < currentStudents.length; i++) {
            resizedStudents[i] = currentStudents[i];
        }
        return resizedStudents;
    }

    function getStudentCourses(
        uint _userId, 
        uint _departmentId, 
        bool _isArchive
    ) public view returns (StudentCourseInfoContract.StudentCourseInfoDTO[] memory) {
        StudentCourseInfoContract studentCourseInfoContract = getStudentCourseInfoContract();

        OpenedCourseContract.OpenedCourseDTO[] memory openedCourses = studentCourseInfoContract.getStudentCourses(_userId, _departmentId, _isArchive);
        uint openedCoursesCount = openedCourses.length;

        StudentCourseInfoContract.StudentCourseInfoDTO[] memory studentCourses = new StudentCourseInfoContract.StudentCourseInfoDTO[](openedCoursesCount);

        for (uint i = 0; i < openedCoursesCount; i++) {
            OpenedCourseContract.OpenedCourseDTO memory courseDTO = openedCourses[i];
            StudentCourseInfoContract.StudentCourseInfo memory studentCourseInfo = studentCourseInfoContract.getStudentCourseInfo(courseDTO.studentCourseInfoId);

            StudentCourseInfoContract.StudentCourseInfoDTO memory studentCourse;
            studentCourse.id = courseDTO.id;
            studentCourse.courseId = courseDTO.courseId;
            studentCourse.schedules = courseDTO.schedules;
            studentCourse.year = courseDTO.year;
            studentCourse.semester = courseDTO.semester;
            studentCourse.isActive = courseDTO.isActive;
            studentCourse.courseName =  courseDTO.courseName;
            studentCourse.departmentId = courseDTO.departmentId;
            studentCourse.capacity = courseDTO.capacity;
            studentCourse.credit =  courseDTO.credit;
            studentCourse.code = courseDTO.code;
            studentCourse.studentStatus = courseDTO.studentStatus;
            studentCourse.letterGrade = studentCourseInfo.letterGrade;
            studentCourse.absentee = studentCourseInfo.absentee;
            studentCourse.midtermGrade = studentCourseInfo.midtermGrade;
            studentCourse.finalGrade = studentCourseInfo.finalGrade;
            studentCourse.makeupExamGrade = studentCourseInfo.makeupExamGrade;
            studentCourse.studentCourseInfoId = courseDTO.studentCourseInfoId;
            studentCourse.gradingRules = courseDTO.gradingRules;
            studentCourse.location = courseDTO.location;

            studentCourses[i] = studentCourse;
        }

        return studentCourses;
    }

    function getStudentCourses(
        uint _userId, 
        uint _departmentId, 
        uint _year,
        uint _semester
    ) public view returns (StudentCourseInfoContract.StudentCourseInfoDTO[] memory) {
        StudentCourseInfoContract studentCourseInfoContract = getStudentCourseInfoContract();

        OpenedCourseContract.OpenedCourseDTO[] memory openedCourses = studentCourseInfoContract.getStudentCourses(_userId, _departmentId);
        uint openedCoursesCount = openedCourses.length;

        StudentCourseInfoContract.StudentCourseInfoDTO[] memory studentCourses = new StudentCourseInfoContract.StudentCourseInfoDTO[](openedCoursesCount);

        for (uint i = 0; i < openedCoursesCount; i++) {
            OpenedCourseContract.OpenedCourseDTO memory courseDTO = openedCourses[i];
            if (courseDTO.year == _year && courseDTO.semester == _semester) {
                StudentCourseInfoContract.StudentCourseInfo memory studentCourseInfo = studentCourseInfoContract.getStudentCourseInfo(courseDTO.studentCourseInfoId);

                StudentCourseInfoContract.StudentCourseInfoDTO memory studentCourse;
                studentCourse.id = courseDTO.id;
                studentCourse.courseId = courseDTO.courseId;
                studentCourse.schedules = courseDTO.schedules;
                studentCourse.year = courseDTO.year;
                studentCourse.semester = courseDTO.semester;
                studentCourse.isActive = courseDTO.isActive;
                studentCourse.courseName =  courseDTO.courseName;
                studentCourse.departmentId = courseDTO.departmentId;
                studentCourse.capacity = courseDTO.capacity;
                studentCourse.credit =  courseDTO.credit;
                studentCourse.code = courseDTO.code;
                studentCourse.studentStatus = courseDTO.studentStatus;
                studentCourse.letterGrade = studentCourseInfo.letterGrade;
                studentCourse.absentee = studentCourseInfo.absentee;
                studentCourse.midtermGrade = studentCourseInfo.midtermGrade;
                studentCourse.finalGrade = studentCourseInfo.finalGrade;
                studentCourse.makeupExamGrade = studentCourseInfo.makeupExamGrade;
                studentCourse.studentCourseInfoId = courseDTO.studentCourseInfoId;
                studentCourse.gradingRules = courseDTO.gradingRules;
                studentCourse.location = courseDTO.location;

                studentCourses[i] = studentCourse;
            }
        }

        return studentCourses;
    }

    function getStudentCourses(
        uint _userId, 
        uint _departmentId
    ) public view returns (StudentCourseInfoContract.StudentCourseInfoDTO[] memory) {
        StudentCourseInfoContract studentCourseInfoContract = getStudentCourseInfoContract();

        OpenedCourseContract.OpenedCourseDTO[] memory openedCourses = studentCourseInfoContract.getStudentCourses(_userId, _departmentId);
        uint openedCoursesCount = openedCourses.length;

        StudentCourseInfoContract.StudentCourseInfoDTO[] memory studentCourses = new StudentCourseInfoContract.StudentCourseInfoDTO[](openedCoursesCount);

        for (uint i = 0; i < openedCoursesCount; i++) {
            OpenedCourseContract.OpenedCourseDTO memory courseDTO = openedCourses[i];
            StudentCourseInfoContract.StudentCourseInfo memory studentCourseInfo = studentCourseInfoContract.getStudentCourseInfo(courseDTO.studentCourseInfoId);

            StudentCourseInfoContract.StudentCourseInfoDTO memory studentCourse;
            studentCourse.id = courseDTO.id;
            studentCourse.courseId = courseDTO.courseId;
            studentCourse.schedules = courseDTO.schedules;
            studentCourse.year = courseDTO.year;
            studentCourse.semester = courseDTO.semester;
            studentCourse.isActive = courseDTO.isActive;
            studentCourse.courseName =  courseDTO.courseName;
            studentCourse.departmentId = courseDTO.departmentId;
            studentCourse.capacity = courseDTO.capacity;
            studentCourse.credit =  courseDTO.credit;
            studentCourse.code = courseDTO.code;
            studentCourse.studentStatus = courseDTO.studentStatus;
            studentCourse.letterGrade = studentCourseInfo.letterGrade;
            studentCourse.absentee = studentCourseInfo.absentee;
            studentCourse.midtermGrade = studentCourseInfo.midtermGrade;
            studentCourse.finalGrade = studentCourseInfo.finalGrade;
            studentCourse.makeupExamGrade = studentCourseInfo.makeupExamGrade;
            studentCourse.studentCourseInfoId = courseDTO.studentCourseInfoId;
            studentCourse.gradingRules = courseDTO.gradingRules;
            studentCourse.location = courseDTO.location;

            studentCourses[i] = studentCourse;
        }

        return studentCourses;
    }

    function getUserContract() public view returns (UserContract) {
        UserContract userContract = UserContract(userContractAddress);

        return userContract;
    }

    function getOpenedCourseContract() public view returns (OpenedCourseContract) {
        OpenedCourseContract openedCourseContract = OpenedCourseContract(openedCourseContractAddress);

        return openedCourseContract;
    }

    function getStudentCourseInfoContract() public view returns (StudentCourseInfoContract) {
        StudentCourseInfoContract studentCourseInfoContract = StudentCourseInfoContract(studentCourseInfoContractAddress);

        return studentCourseInfoContract;
    }

    function getStudentOpenedCourseIds(uint _userId, uint _departmentId) public view returns (uint[] memory) {
        StudentCourseInfoContract studentCourseInfoContract = getStudentCourseInfoContract();
        
        OpenedCourseContract.OpenedCourseDTO[] memory openedCourses = studentCourseInfoContract.getStudentCourses(_userId, _departmentId);
        uint openedCoursesCount = openedCourses.length;
        
        uint[] memory studentOpenedCourseIds = new uint[](openedCoursesCount);
        
        for (uint i = 0; i < openedCoursesCount; i++) {
            studentOpenedCourseIds[i] = openedCourses[i].id;
        }
        
        return studentOpenedCourseIds;
    }

    function setUserContractAddress(address _userContractAddress) external onlyAllowedSender{
        userContractAddress = _userContractAddress;
    }

    function setOpenedCourseContractAddress(address _openedCourseContractAddress) external onlyAllowedSender{
        openedCourseContractAddress = _openedCourseContractAddress;
    }

    function setStudentCourseInfoContractAddress(address _studentCourseInfoContractAddress) external onlyAllowedSender{
        studentCourseInfoContractAddress = _studentCourseInfoContractAddress;
    }
}
