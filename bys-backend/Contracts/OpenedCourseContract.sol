// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserContract.sol";
import "./CourseContract.sol";
import "./SenderChecker.sol";

contract OpenedCourseContract {
    struct OpenedCourse {
        uint id;
        uint courseId;
        string schedules;
        uint256 year;
        uint256 semester;
        uint[] teacherIds;
        uint[] examIds;
        bool isActive;
        string gradingRules;
        string location;
    }

    uint public openedCourseCounter;

    mapping(uint => OpenedCourse) public openedCourses;

    address public courseContractAddress;
    address public userContractAddress;
    SenderChecker public senderChecker;

    event CourseAdded(uint id, uint[] teacherIds, string schedules, bool isActive);
    event CourseUpdated(uint id, uint[] teacherIds, string schedules, bool isActive);
    event CourseDeleted(uint id);
    event CourseStatusChanged(uint id, bool isActive);

    modifier courseExists(uint id) {
        require(openedCourses[id].id != 0, "Course does not exist");
        _;
    }

    modifier onlyAllowedSender() {
        require(senderChecker.isAllowedSender(msg.sender), "Sender not allowed.");
        _;
    }

    constructor(address _courseContractAddress, address _userContractAddress, address _senderCheckerAddress) {
        courseContractAddress = _courseContractAddress;
        userContractAddress = _userContractAddress;
        senderChecker = SenderChecker(_senderCheckerAddress);
    }

    function addOpenedCourse(
        uint _courseId, 
        string memory _schedules, 
        uint256 _year, 
        uint256 _semester,
        string memory _gradingRules,
        string memory _location        
    ) public onlyAllowedSender returns (uint) {
        openedCourseCounter++;
        uint[] memory emptyArray;
        openedCourses[openedCourseCounter] = OpenedCourse(openedCourseCounter, _courseId, _schedules, _year, _semester, emptyArray, emptyArray, true, _gradingRules, _location);
        emit CourseAdded(openedCourseCounter, emptyArray, _schedules, true);
        return openedCourseCounter;
    }

    function updateOpenedCourse(
        uint _id,
        string memory _schedules,
        uint256 _year,
        uint256 _semester,
        bool _isActive,
        string memory _gradingRules,
        string memory _location        
    ) public courseExists(_id) onlyAllowedSender {
        OpenedCourse storage course = openedCourses[_id];
        
        course.schedules = _schedules;
        course.year = _year;
        course.semester = _semester;
        course.isActive = _isActive;
        course.gradingRules = _gradingRules;
        course.location = _location;

        emit CourseUpdated(_id, course.teacherIds, _schedules, _isActive);
    }

    function deleteOpenedCourse(uint _id) public courseExists(_id) onlyAllowedSender {
        delete openedCourses[_id];
        emit CourseDeleted(_id);
    }

    function isStudent(uint userId) internal view returns (bool) {
        string[] memory userRoles = getUserContract().getUserRoles(userId);

        for (uint i = 0; i < userRoles.length; i++) {
            if (keccak256(abi.encodePacked(userRoles[i])) == keccak256(abi.encodePacked("Student"))) {
                return true;
            }
        }
        return false;
    }

    function addExam(uint courseId, uint examId) public onlyAllowedSender returns (uint) {
        openedCourses[courseId].examIds.push(examId);
        return examId;
    }

    struct OpenedCourseDTO {
        uint id;
        uint courseId;
        string schedules;
        uint256 year;
        uint256 semester;
        uint[] teacherIds;
        uint[] examIds;
        bool isActive;
        string courseName;
        uint departmentId;
        uint capacity;
        uint credit;
        string code;
        string studentName;
        string studentStatus;
        uint studentCourseInfoId;
        string gradingRules;
        string location;
    }

    // Getter Functions

    function getCourseContract() public view returns (CourseContract) {
        CourseContract courseContract = CourseContract(courseContractAddress);
        return courseContract;
    }

    function getUserContract() public view returns (UserContract) {
        UserContract userContract = UserContract(userContractAddress);
        return userContract;
    }

    function getTeacher(uint teacherId) public view returns (UserContract.User memory) {
        return getUserContract().getUser(teacherId);
    }

    function getCourse(uint courseId) public view returns (CourseContract.Course memory) {
        return getCourseContract().getCourse(courseId);
    }

    function getCourseDepartmentId(uint courseId) public view returns (uint) {
        return getCourseContract().getDepartmentId(courseId);
    }

    function getCourseId(uint id) public view courseExists(id) returns (uint) {
        return openedCourses[id].courseId;
    }

    function getCourseYear(uint id) public view courseExists(id) returns (uint256) {
        return openedCourses[id].year;
    }

    function getCourseSemester(uint id) public view courseExists(id) returns (uint256) {
        return openedCourses[id].semester;
    }
    
    function getIsActive(uint id) public view courseExists(id) returns (bool) {
        return openedCourses[id].isActive;
    }

    function getCourseSchedules(uint id) public view courseExists(id) returns (string memory) {
        return openedCourses[id].schedules;
    }

    function getOpenedCourseExamIds(uint id) public view returns (uint[] memory) {
        return openedCourses[id].examIds;
    }

    function getOpenedCourseDetail(uint openedCourseId) public view returns (OpenedCourseDTO memory) {
        CourseContract courseContract = getCourseContract();

        OpenedCourse memory openedCourse = openedCourses[openedCourseId];
        CourseContract.Course memory courseInfo = courseContract.getCourse(openedCourse.courseId);

        OpenedCourseDTO memory result;
        result.id = openedCourse.id;
        result.courseId = openedCourse.courseId;
        result.schedules = openedCourse.schedules;
        result.year = openedCourse.year;
        result.semester = openedCourse.semester;
        result.teacherIds = openedCourse.teacherIds;
        result.examIds = openedCourse.examIds;
        result.isActive = openedCourse.isActive;
        result.gradingRules = openedCourse.gradingRules;
        result.location = openedCourse.location;
        result.courseName = courseInfo.name;
        result.departmentId = courseInfo.departmentId;
        result.capacity = courseInfo.capacity;
        result.credit = courseInfo.credit;
        result.code = courseInfo.code;

        return result;
    }

    // Setter Functions

    function setCourseContractAddress(address _courseContractAddress) onlyAllowedSender external {
        courseContractAddress = _courseContractAddress;
    }

    function setUserContractAddress(address _userContractAddress) onlyAllowedSender external {
        userContractAddress = _userContractAddress;
    }

    function setCourseIsActive(uint id, bool isActive) public courseExists(id) onlyAllowedSender {
        openedCourses[id].isActive = isActive;
    }

    function setCourseSchedules(uint id, string memory schedules) public courseExists(id) onlyAllowedSender {
        openedCourses[id].schedules = schedules;
    }
    
    function setGradingRules(uint id, string memory gradingRules) public courseExists(id) onlyAllowedSender {
        openedCourses[id].gradingRules = gradingRules;
    }

    function setTeacherIds(uint _id, uint[] memory _teacherIds) public courseExists(_id) onlyAllowedSender {
        openedCourses[_id].teacherIds = _teacherIds;
        emit CourseUpdated(_id, _teacherIds, openedCourses[_id].schedules, openedCourses[_id].isActive);
    }
}
