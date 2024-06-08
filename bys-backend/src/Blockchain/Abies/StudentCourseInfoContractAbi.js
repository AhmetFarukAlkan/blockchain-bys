const StudentCourseInfoContractAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_openedCourseContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_userContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_senderCheckerAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_openedCourseId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_userId",
				"type": "uint256"
			}
		],
		"name": "addStudentCourseInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "_openedCourseIds",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "_userId",
				"type": "uint256"
			}
		],
		"name": "addStudentCourseInfos",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "courseStudents",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "openedCourseId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "userId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "absentee",
				"type": "bool"
			},
			{
				"internalType": "int256",
				"name": "midtermGrade",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "finalGrade",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "makeupExamGrade",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "letterGrade",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "courseStudentsCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "deleteStudentCourseInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractIsActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "openedCourseId",
				"type": "uint256"
			}
		],
		"name": "getCourse",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "courseId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "code",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "departmentId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "capacity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "credit",
						"type": "uint256"
					}
				],
				"internalType": "struct CourseContract.Course",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "openedCourseId",
				"type": "uint256"
			}
		],
		"name": "getOpenedCourse",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "courseId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "schedules",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "year",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "semester",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "teacherIds",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "examIds",
						"type": "uint256[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "courseName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "departmentId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "capacity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "credit",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "code",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "studentName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "studentStatus",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "studentCourseInfoId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "gradingRules",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					}
				],
				"internalType": "struct OpenedCourseContract.OpenedCourseDTO",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOpenedCourseContract",
		"outputs": [
			{
				"internalType": "contract OpenedCourseContract",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "openedCourseId",
				"type": "uint256"
			}
		],
		"name": "getOpenedCourseCourseId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "openedCourseId",
				"type": "uint256"
			}
		],
		"name": "getOpenedCourseDepartmentId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "openedCourseId",
				"type": "uint256"
			}
		],
		"name": "getOpenedCourseIsActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getStudentAbsentee",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getStudentCourseInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "openedCourseId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "userId",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "absentee",
						"type": "bool"
					},
					{
						"internalType": "int256",
						"name": "midtermGrade",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "finalGrade",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "makeupExamGrade",
						"type": "int256"
					},
					{
						"internalType": "string",
						"name": "letterGrade",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					}
				],
				"internalType": "struct StudentCourseInfoContract.StudentCourseInfo",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_openedCourseId",
				"type": "uint256"
			}
		],
		"name": "getStudentCourseInfos",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "courseId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "schedules",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "year",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "semester",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "courseName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "departmentId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "capacity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "credit",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "code",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "gradingRules",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "studentName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "studentNumber",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "studentStatus",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "absentee",
						"type": "bool"
					},
					{
						"internalType": "int256",
						"name": "midtermGrade",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "finalGrade",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "makeupExamGrade",
						"type": "int256"
					},
					{
						"internalType": "string",
						"name": "letterGrade",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isArchive",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "studentCourseInfoId",
						"type": "uint256"
					}
				],
				"internalType": "struct StudentCourseInfoContract.StudentCourseInfoDTO[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_userId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_departmentId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_isArchive",
				"type": "bool"
			}
		],
		"name": "getStudentCourses",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "courseId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "schedules",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "year",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "semester",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "teacherIds",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "examIds",
						"type": "uint256[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "courseName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "departmentId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "capacity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "credit",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "code",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "studentName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "studentStatus",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "studentCourseInfoId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "gradingRules",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					}
				],
				"internalType": "struct OpenedCourseContract.OpenedCourseDTO[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_userId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_departmentId",
				"type": "uint256"
			}
		],
		"name": "getStudentCourses",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "courseId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "schedules",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "year",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "semester",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "teacherIds",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "examIds",
						"type": "uint256[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "courseName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "departmentId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "capacity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "credit",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "code",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "studentName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "studentStatus",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "studentCourseInfoId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "gradingRules",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					}
				],
				"internalType": "struct OpenedCourseContract.OpenedCourseDTO[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserContract",
		"outputs": [
			{
				"internalType": "contract UserContract",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "openedCourseContractAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "senderChecker",
		"outputs": [
			{
				"internalType": "contract SenderChecker",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_openedCourseContractAddress",
				"type": "address"
			}
		],
		"name": "setOpenedCourseContractAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "absentee",
				"type": "bool"
			}
		],
		"name": "setStudentAbsentee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userContractAddress",
				"type": "address"
			}
		],
		"name": "setUserContractAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "toggleContractActive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_absentee",
				"type": "bool"
			},
			{
				"internalType": "int256",
				"name": "_midtermGrade",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "_finalGrade",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "_makeupExamGrade",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "_status",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_letterGrade",
				"type": "string"
			}
		],
		"name": "updateStudentCourseInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_status",
				"type": "string"
			}
		],
		"name": "updateStudentCourseInfoStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_userId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_departmentId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_status",
				"type": "string"
			}
		],
		"name": "updateStudentCourseInfosStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "userContractAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

module.exports = StudentCourseInfoContractAbi;
