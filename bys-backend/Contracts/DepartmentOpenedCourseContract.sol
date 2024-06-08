// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DepartmentContract.sol";
import "./OpenedCourseContract.sol";

contract DepartmentOpenedCourseContract {
    address public openedCourseContractAddress;

    constructor(address _openedCourseContractAddress) {
        openedCourseContractAddress = _openedCourseContractAddress;
    }

    function getOpenedCoursesByDepartment(uint departmentId, bool isActive) public view returns (OpenedCourseContract.OpenedCourseDTO[] memory) {
        OpenedCourseContract openedCourseContract = getOpenedCourseContract();
        uint totalOpenedCourses = openedCourseContract.openedCourseCounter();

        OpenedCourseContract.OpenedCourseDTO[] memory allOpenedCourses = new OpenedCourseContract.OpenedCourseDTO[](totalOpenedCourses);

        uint departmentOpenedCourseCount = 0;

        for (uint i = 1; i <= totalOpenedCourses; i++) {
            uint courseDepartmentId = openedCourseContract.getCourseDepartmentId(openedCourseContract.getCourseId(i));

            if (courseDepartmentId == departmentId) {
                if (openedCourseContract.getIsActive(i) == isActive) {
                    allOpenedCourses[departmentOpenedCourseCount] = openedCourseContract.getOpenedCourseDetail(i);
                    departmentOpenedCourseCount++;
                }
            }
        }

        OpenedCourseContract.OpenedCourseDTO[] memory departmentOpenedCourses = new OpenedCourseContract.OpenedCourseDTO[](departmentOpenedCourseCount);

        for (uint j = 0; j < departmentOpenedCourseCount; j++) {
            departmentOpenedCourses[j] = allOpenedCourses[j];
        }

        return departmentOpenedCourses;
    }

    // Getter Functions

    function getOpenedCourseContract() public view returns (OpenedCourseContract) {
        OpenedCourseContract openedCourseContract = OpenedCourseContract(openedCourseContractAddress);
        return openedCourseContract;
    }

    // Setter Functions

    function setOpenedCourseContractAddress(address _openedCourseContractAddress) external {
        openedCourseContractAddress = _openedCourseContractAddress;
    }
}
