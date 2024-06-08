// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DepartmentContract.sol";
import "./SenderChecker.sol";

contract CourseContract {
    struct Course {
        uint courseId;
        string name;
        string code;
        uint departmentId;
        uint capacity;
        uint credit;
        // uint grade;
    }

    uint public courseCounter;

    SenderChecker public senderChecker;

    mapping(uint => Course) public courses;

    event CourseAdded(uint courseId, string name, uint departmentId);
    event CourseUpdated(uint courseId, string name);
    event CourseDeleted(uint courseId);

    constructor(address _senderCheckerAddress) {
        senderChecker = SenderChecker(_senderCheckerAddress);
    }

    modifier courseExists(uint courseId) {
        require(courses[courseId].courseId != 0, "Course does not exist");
        _;
    }

    modifier onlyAllowedSender() {
        require(senderChecker.isAllowedSender(msg.sender), "Sender not allowed.");
        _;
    }

    function addCourse(
        string memory _name, 
        string memory _code, 
        uint _departmentId, 
        uint _capacity, 
        uint _credit
    ) public onlyAllowedSender {
        courseCounter++;
        uint courseId = courseCounter;
        courses[courseId] = Course(courseId, _name, _code, _departmentId, _capacity, _credit);
        emit CourseAdded(courseId, _name, _departmentId);
    }
    
    function updateCourse(
        uint courseId, 
        string memory _name, 
        string memory _code, 
        uint _capacity, 
        uint _credit
    ) public courseExists(courseId) onlyAllowedSender {
        Course storage course = courses[courseId];
        course.name = _name;
        course.code = _code;
        course.capacity = _capacity;
        course.credit = _credit;

        emit CourseUpdated(courseId, _name);
    }

    function getCourseDepartmentInfo(uint courseId, address departmentContractAddress) public view courseExists(courseId) returns (CourseInfo memory) {
        DepartmentContract departmentContract = DepartmentContract(departmentContractAddress);
        
        Course memory course = courses[courseId];

        CourseInfo memory courseInfo;
        courseInfo.id = courseId;
        courseInfo.name = course.name;
        courseInfo.departmentId = course.departmentId;
        courseInfo.departmentName = departmentContract.getDepartmentName(course.departmentId);

        return courseInfo;
    }

    function getCoursesByDepartment(uint _departmentId) public view returns (Course[] memory) {
        uint count = 0;

        for (uint i = 1; i <= courseCounter; i++) {
            if (courses[i].departmentId == _departmentId) {
                count++;
            }
        }

        Course[] memory departmentCourses = new Course[](count);
        uint index = 0;

        for (uint i = 1; i <= courseCounter; i++) {
            if (courses[i].departmentId == _departmentId) {
                departmentCourses[index] = courses[i];
                index++;
            }
        }

        return departmentCourses;
    }

    struct CourseInfo {
        uint id;
        string name;
        uint departmentId;
        uint teacherId;
        string schedules;
        uint[] enrolledStudents;
        string departmentName;
        string teacherName;
    }

    // Getter Functions

    function getCourseCounter() public view returns (uint) {
        return courseCounter;
    }

    function getCourse(uint courseId) public view courseExists(courseId) returns (Course memory) {
        return courses[courseId];
    }

    function getDepartmentId(uint courseId) public view courseExists(courseId) returns (uint) {
        return courses[courseId].departmentId;
    }

    function getCourseName(uint courseId) public view courseExists(courseId) returns (string memory) {
        return courses[courseId].name;
    }
    
    function getCourseCapacity(uint courseId) public view courseExists(courseId) returns (uint) {
        return courses[courseId].capacity;
    }

    function getCourseCredit(uint courseId) public view courseExists(courseId) returns (uint) {
        return courses[courseId].credit;
    }

    function getCourseCode(uint courseId) public view courseExists(courseId) returns (string memory) {
        return courses[courseId].code;
    }

    // Setter Functions

    function setCourseName(uint courseId, string memory newName) public courseExists(courseId) onlyAllowedSender {
        courses[courseId].name = newName;
    }

    function setCourseCapacity(uint courseId, uint capacity) public courseExists(courseId) onlyAllowedSender {
        courses[courseId].capacity = capacity;
    }

    function setCourseCredit(uint courseId, uint credit) public courseExists(courseId) onlyAllowedSender {
        courses[courseId].credit = credit;
    }

    function setCourseCode(uint courseId, string memory code) public courseExists(courseId) onlyAllowedSender {
        courses[courseId].code = code;
    }
}
