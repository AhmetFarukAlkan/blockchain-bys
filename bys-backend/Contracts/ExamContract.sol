// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./OpenedCourseContract.sol";
import "./StudentContract.sol";
import "./TeacherContract.sol";
import "./SenderChecker.sol";

contract ExamContract {
    struct Exam {
        uint id;
        uint courseId;
        string examType;
        uint256 startTime;
        uint256 endTime;
        string location;
    }

    uint public examCounter;

    mapping(uint => Exam) public exams;
    address public openedCourseContractAddress;
    address public studentContractAddress;
    address public teacherContractAddress;
    SenderChecker public senderChecker;

    constructor(address _openedCourseContractAddress, address _studentContractAddress, address _teacherContractAddress, address _senderCheckerAddress) {
        examCounter = 0;
        openedCourseContractAddress = _openedCourseContractAddress;
        studentContractAddress = _studentContractAddress;
        teacherContractAddress = _teacherContractAddress;
        senderChecker = SenderChecker(_senderCheckerAddress);
    }

    event ExamAdded(uint id, uint courseId, string examType, uint256 startTime, uint256 endTime, string location);
    event ExamUpdated(uint id, string examType, uint256 startTime, uint256 endTime, string location);
    event ExamDeleted(uint id);

    modifier examExists(uint id) {
        require(exams[id].id != 0, "Exam does not exist");
        _;
    }

    modifier onlyAllowedSender() {
        require(senderChecker.isAllowedSender(msg.sender), "Sender not allowed.");
        _;
    }

    function addExam(
        uint courseId, 
        string memory examType, 
        uint256 startTime, 
        uint256 endTime, 
        string memory location
    ) public onlyAllowedSender {
        OpenedCourseContract openedCourseContract = getOpenedCourseContract();

        examCounter++;
        exams[examCounter] = Exam(examCounter, courseId, examType, startTime, endTime, location);
        openedCourseContract.addExam(courseId, examCounter);
        emit ExamAdded(examCounter, courseId, examType, startTime, endTime, location);
    }

    function updateExam(
        uint id, 
        string memory examType, 
        uint256 startTime, 
        uint256 endTime, 
        string memory location
    ) public onlyAllowedSender examExists(id) {
        exams[id].examType = examType;
        exams[id].startTime = startTime;
        exams[id].endTime = endTime;
        exams[id].location = location;
        emit ExamUpdated(id, examType, startTime, endTime, location);
    }

    function deleteExam(uint id) public examExists(id) onlyAllowedSender {
        delete exams[id];
        emit ExamDeleted(id);
    }

    struct ExamDTO {
        uint id;
        uint courseId;
        uint openedCourseId;
        uint departmentId;
        string examType;
        uint256 startTime;
        uint256 endTime;
        string location;
        string courseName;
        string code;
        string isActive;
        uint256 year;
        uint256 semester;
    }

    function getExam(uint id) public view examExists(id) returns (ExamDTO memory) {
        OpenedCourseContract openedCourseContract = getOpenedCourseContract();

        Exam storage exam = exams[id];
        uint openedCourseId = exam.courseId;
        OpenedCourseContract.OpenedCourseDTO memory openedCourseDTO = openedCourseContract.getOpenedCourseDetail(openedCourseId);

        ExamDTO memory result;

        result.id = exam.id;
        result.courseId = openedCourseDTO.courseId;
        result.openedCourseId = openedCourseDTO.id;
        result.departmentId = openedCourseDTO.departmentId;
        result.examType = exam.examType;
        result.startTime = exam.startTime;
        result.endTime = exam.endTime;
        result.location = exam.location;
        result.courseName = openedCourseDTO.courseName;
        result.code = openedCourseDTO.code;
        result.year = openedCourseDTO.year;
        result.semester = openedCourseDTO.semester;

        return result;
    }

    function getExamsByDepartmentId(
        uint _departmentId,
        uint _year,
        uint _semester
    ) public view returns (ExamDTO[] memory) {
        uint length = examCounter;
        uint count = 0;
        ExamDTO[] memory results = new ExamDTO[](length);

        for (uint i = 1; i <= length; i++) {
            if (exams[i].id != 0) {
                ExamDTO memory examDTO = getExam(i);
                if (examDTO.departmentId == _departmentId && examDTO.year == _year && examDTO.semester == _semester) {
                    results[count] = examDTO;
                    count++;
                }
            }
        }

        assembly {
            mstore(results, count)
        }

        return results;
    }

    function getStudentExams(
        uint _studentId, 
        uint _departmentId,
        uint _year,
        uint _semester
    ) public view returns (ExamDTO[] memory) {
        OpenedCourseContract openedCourseContract = getOpenedCourseContract();
        StudentContract studentContract = getStudentContract();
        uint[] memory openedCourseIds = studentContract.getStudentOpenedCourseIds(_studentId, _departmentId);

        uint length = openedCourseIds.length;
        uint count = 0;
        ExamDTO[] memory results = new ExamDTO[](length * 5); // Varsayılan olarak her ders için 5 sınav olabilir.

        for (uint i = 0; i < length; i++) {
            uint openedCourseId = openedCourseIds[i];
            uint[] memory examIds = openedCourseContract.getOpenedCourseExamIds(openedCourseId);

            for (uint j = 0; j < examIds.length; j++) {
                ExamDTO memory examDTO = getExam(examIds[j]);
                if (examDTO.year == _year && examDTO.semester == _semester) {
                    results[count] = examDTO;
                    count++;
                }
            }
        }

        assembly {
            mstore(results, count)
        }

        return results;
    }

    function getTeacherExams(
        uint _teacherId, 
        uint _departmentId,
        uint _year,
        uint _semester
    ) public view returns (ExamDTO[] memory) {
        OpenedCourseContract openedCourseContract = getOpenedCourseContract();
        TeacherContract teacherContract = getTeacherContract();
        uint[] memory openedCourseIds = teacherContract.getTeacherOpenedCourseIds(_teacherId, _departmentId);

        uint length = openedCourseIds.length;
        uint count = 0;
        ExamDTO[] memory results = new ExamDTO[](length * 5); // Her ders için 5 sınav olabilir varsayılıyor.

        for (uint i = 0; i < length; i++) {
            uint openedCourseId = openedCourseIds[i];
            
            if (openedCourseId == 0) {
                continue;
            }
            
            uint[] memory examIds = openedCourseContract.getOpenedCourseExamIds(openedCourseId);

            for (uint j = 0; j < examIds.length; j++) {
                ExamDTO memory examDTO = getExam(examIds[j]);
                if (examDTO.year == _year && examDTO.semester == _semester) {
                    results[count] = examDTO;
                    count++;
                }
            }
        }

        assembly {
            mstore(results, count)
        }

        return results;
    }

    function getOpenedCourseContract() public view returns (OpenedCourseContract) {
        OpenedCourseContract openedCourseContract = OpenedCourseContract(openedCourseContractAddress);

        return openedCourseContract;
    }

    function getStudentContract() public view returns (StudentContract) {
        StudentContract studentContract = StudentContract(studentContractAddress);

        return studentContract;
    }

    function getTeacherContract() public view returns (TeacherContract) {
        TeacherContract teacherContract = TeacherContract(teacherContractAddress);

        return teacherContract;
    }

    function setOpenedCourseContractAddress(address _openedCourseContractAddress) external onlyAllowedSender {
        openedCourseContractAddress = _openedCourseContractAddress;
    }

    function setStudentContractAddress(address _studentContractAddress) external onlyAllowedSender {
        studentContractAddress = _studentContractAddress;
    }

    function setTeacherContractAddress(address _teacherContractAddress) external onlyAllowedSender {
        teacherContractAddress = _teacherContractAddress;
    }
}
