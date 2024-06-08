// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserContract.sol";
import "./CourseContract.sol";
import "./OpenedCourseContract.sol";
import "./SenderChecker.sol";

contract StudentCourseInfoContract {
    struct StudentCourseInfo {
        uint id;
        uint openedCourseId;
        uint userId;
        bool absentee;
        int256 midtermGrade;
        int256 finalGrade;
        int256 makeupExamGrade;
        string letterGrade;
        string status;
    }

    enum Status { in_advisor_review, advisor_approved, approved}

    bool public isActive;
    uint public courseStudentsCounter;
    address public openedCourseContractAddress;
    address public userContractAddress;
    SenderChecker public senderChecker;

    mapping(uint => StudentCourseInfo) public courseStudents;

    constructor(address _openedCourseContractAddress, address _userContractAddress, address _senderCheckerAddress) {
        isActive = false;
        openedCourseContractAddress = _openedCourseContractAddress;
        userContractAddress = _userContractAddress;
        senderChecker = SenderChecker(_senderCheckerAddress);
    }

    modifier contractIsActive() {
        require(isActive, "Contract is not active");
        _;
    }

    modifier onlyAllowedSender() {
        require(senderChecker.isAllowedSender(msg.sender), "Sender not allowed.");
        _;
    }

    function toggleContractActive() public onlyAllowedSender {
        isActive = !isActive;
    }

    function addStudentCourseInfo(
        uint _openedCourseId,
        uint _userId
    ) public contractIsActive onlyAllowedSender{
        courseStudentsCounter++;
        courseStudents[courseStudentsCounter] = StudentCourseInfo(
            courseStudentsCounter,
            _openedCourseId,
            _userId,
            false,
            -1,
            -1,
            -1,
            '',
            'in_advisor_review'
        );
    }

    function addStudentCourseInfos(uint[] memory _openedCourseIds, uint _userId) public contractIsActive onlyAllowedSender {
        for (uint i = 0; i < _openedCourseIds.length; i++) {
            addStudentCourseInfo(_openedCourseIds[i], _userId);
        }
    }

    function updateStudentCourseInfo(
        uint _id,
        bool _absentee,
        int256 _midtermGrade,
        int256 _finalGrade,
        int256 _makeupExamGrade,
        string memory _status,
        string memory _letterGrade
    ) public onlyAllowedSender {
        require(_id <= courseStudentsCounter, "Id does not exist");

        StudentCourseInfo storage student = courseStudents[_id];
        student.absentee = _absentee;
        student.midtermGrade = _midtermGrade;
        student.finalGrade = _finalGrade;
        student.makeupExamGrade = _makeupExamGrade;
        student.letterGrade = _letterGrade;
        student.status = _status;
    }

    function updateStudentCourseInfoStatus(
        uint _id,
        string memory _status
    ) public onlyAllowedSender{
        require(_id <= courseStudentsCounter, "Id does not exist");

        StudentCourseInfo storage info = courseStudents[_id];
        info.status = _status;
    }

    function updateStudentCourseInfosStatus(
        uint _userId,
        uint _departmentId,
        string memory _status
    ) public onlyAllowedSender {
        for (uint i = 1; i <= courseStudentsCounter; i++) {
            StudentCourseInfo storage student = courseStudents[i];
            if (student.userId == _userId && getOpenedCourseDepartmentId(student.openedCourseId) == _departmentId) {
                student.status = _status;
            }
        }
    }

    function getStudentCourses(
        uint _userId, 
        uint _departmentId, 
        bool _isArchive
    ) public view returns (OpenedCourseContract.OpenedCourseDTO[] memory) {
        OpenedCourseContract openedCourseContract = getOpenedCourseContract();
        uint studentCoursesCount = courseStudentsCounter;

        OpenedCourseContract.OpenedCourseDTO[] memory openedCourses = new OpenedCourseContract.OpenedCourseDTO[](studentCoursesCount);
        uint openedCourseIndex = 0;

        for (uint i = 1; i <= studentCoursesCount; i++) {
            StudentCourseInfo storage studentCourse = courseStudents[i];

            if (studentCourse.userId == _userId && !getOpenedCourseIsActive(studentCourse.openedCourseId) == _isArchive && getOpenedCourseDepartmentId(studentCourse.openedCourseId) == _departmentId) {
                uint openedCourseId = studentCourse.openedCourseId;

                OpenedCourseContract.OpenedCourseDTO memory openedCourseDTO = openedCourseContract.getOpenedCourseDetail(openedCourseId);
                openedCourseDTO.studentStatus = studentCourse.status;
                openedCourseDTO.studentCourseInfoId = studentCourse.id;

                openedCourses[openedCourseIndex] = openedCourseDTO;
                openedCourseIndex++;
            }
        }

        return openedCourses;
    }

    function getStudentCourses(
        uint _userId, 
        uint _departmentId
    ) public view returns (OpenedCourseContract.OpenedCourseDTO[] memory) {
        OpenedCourseContract openedCourseContract = getOpenedCourseContract();
        uint studentCoursesCount = courseStudentsCounter;

        OpenedCourseContract.OpenedCourseDTO[] memory openedCourses = new OpenedCourseContract.OpenedCourseDTO[](studentCoursesCount);
        uint openedCourseIndex = 0;

        for (uint i = 1; i <= studentCoursesCount; i++) {
            StudentCourseInfo storage studentCourse = courseStudents[i];

            if (studentCourse.userId == _userId && getOpenedCourseDepartmentId(studentCourse.openedCourseId) == _departmentId) {
                uint openedCourseId = studentCourse.openedCourseId;

                OpenedCourseContract.OpenedCourseDTO memory openedCourseDTO = openedCourseContract.getOpenedCourseDetail(openedCourseId);
                openedCourseDTO.studentStatus = studentCourse.status;
                openedCourseDTO.studentCourseInfoId = studentCourse.id;

                openedCourses[openedCourseIndex] = openedCourseDTO;
                openedCourseIndex++;
            }
        }

        return openedCourses;
    }

    function getStudentCourseInfos(uint _openedCourseId) public view returns (StudentCourseInfoDTO[] memory) {
        uint studentCoursesCount = courseStudentsCounter;

        StudentCourseInfoDTO[] memory studentCourseInfos = new StudentCourseInfoDTO[](studentCoursesCount);
        uint studentCourseInfoIndex = 0;

        for (uint i = 1; i <= studentCoursesCount; i++) {
            StudentCourseInfo storage studentCourse = courseStudents[i];

            if (studentCourse.openedCourseId == _openedCourseId) {
                uint openedCourseId = studentCourse.openedCourseId;
                OpenedCourseContract.OpenedCourseDTO memory openedCourse = getOpenedCourse(openedCourseId);

                StudentCourseInfoDTO memory studentCourseInfo;
                studentCourseInfo.studentName = getUserContract().getFullName(studentCourse.userId);
                studentCourseInfo.studentNumber = getUserContract().getUserNumber(studentCourse.userId);
                studentCourseInfo.studentCourseInfoId = studentCourse.id;
                studentCourseInfo.studentStatus = studentCourse.status;
                studentCourseInfo.absentee = studentCourse.absentee;
                studentCourseInfo.midtermGrade = studentCourse.midtermGrade;
                studentCourseInfo.finalGrade = studentCourse.finalGrade;
                studentCourseInfo.makeupExamGrade = studentCourse.makeupExamGrade;
                studentCourseInfo.letterGrade = studentCourse.letterGrade;
                studentCourseInfo.id = openedCourse.id;
                studentCourseInfo.courseId = openedCourse.courseId;
                studentCourseInfo.courseName = getCourse(openedCourseId).name;
                studentCourseInfo.departmentId = openedCourse.departmentId;
                studentCourseInfo.isActive = openedCourse.isActive;
                studentCourseInfo.year = openedCourse.year;
                studentCourseInfo.semester = openedCourse.semester;
                studentCourseInfo.schedules = openedCourse.schedules;
                studentCourseInfo.gradingRules = openedCourse.gradingRules;
                studentCourseInfo.location = openedCourse.location;

                studentCourseInfos[studentCourseInfoIndex] = studentCourseInfo;
                studentCourseInfoIndex++;
            }
        }

        return studentCourseInfos;
    }

    function deleteStudentCourseInfo(uint _id) public onlyAllowedSender {
        require(_id <= courseStudentsCounter, "Id does not exist");

        delete courseStudents[_id];
    }

    struct StudentCourseInfoDTO {
        uint id;
        uint courseId;
        string schedules;
        uint256 year;
        uint256 semester;
        bool isActive;
        string courseName;
        uint departmentId;
        uint capacity;
        uint credit;
        string code;
        string gradingRules;
        string location;
        string studentName;
        string studentNumber;
        string studentStatus;
        bool absentee;
        int256 midtermGrade;
        int256 finalGrade;
        int256 makeupExamGrade;
        string letterGrade;
        bool isArchive;
        uint studentCourseInfoId; 
    }

    // Getter Functions

    function getOpenedCourseContract() public view returns (OpenedCourseContract) {
        OpenedCourseContract openedCourseContract = OpenedCourseContract(openedCourseContractAddress);

        return openedCourseContract;
    }

    function getUserContract() public view returns (UserContract) {
        UserContract userContract = UserContract(userContractAddress);
        return userContract;
    }

    function getContractIsActive() public view returns (bool) {
        return isActive;
    }

    function getStudentCourseInfo(uint id) public view returns (StudentCourseInfo memory) {
        return courseStudents[id];
    }

    function getOpenedCourseCourseId(uint openedCourseId) public view returns (uint) {
        return getOpenedCourseContract().getCourseId(openedCourseId);
    }

    function getCourse(uint openedCourseId) public view returns (CourseContract.Course memory) {
        return getOpenedCourseContract().getCourse(getOpenedCourseCourseId(openedCourseId));
    }

    function getOpenedCourse(uint openedCourseId) public view returns (OpenedCourseContract.OpenedCourseDTO memory) {
        return getOpenedCourseContract().getOpenedCourseDetail(openedCourseId);
    }

    function getOpenedCourseDepartmentId(uint openedCourseId) public view returns (uint) {
        return getOpenedCourseContract().getCourseDepartmentId(getOpenedCourseCourseId(openedCourseId));
    }

    function getOpenedCourseIsActive(uint openedCourseId) public view returns (bool) {
        return getOpenedCourseContract().getIsActive(openedCourseId);
    }

    function getStudentAbsentee(uint id) public view returns (bool) {
        return courseStudents[id].absentee;
    }

    // Setter Functions

    function setOpenedCourseContractAddress(address _openedCourseContractAddress) external onlyAllowedSender{
        openedCourseContractAddress = _openedCourseContractAddress;
    }
    
    function setUserContractAddress(address _userContractAddress) external onlyAllowedSender{
        userContractAddress = _userContractAddress;
    }

    function setStudentAbsentee(uint _id, bool absentee) public onlyAllowedSender{
        require(_id <= courseStudentsCounter, "Id does not exist");

        courseStudents[_id].absentee = absentee;
    }
}
