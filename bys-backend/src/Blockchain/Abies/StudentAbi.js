const StudentAbi = [
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
				"internalType": "address",
				"name": "_studentCourseInfoContractAddress",
				"type": "address"
			}
		],
		"name": "setStudentCourseInfoContractAddress",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "_userContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_openedCourseContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_studentCourseInfoContractAddress",
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
		"inputs": [],
		"name": "getStudentCourseInfoContract",
		"outputs": [
			{
				"internalType": "contract StudentCourseInfoContract",
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
				"internalType": "uint256",
				"name": "_year",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_semester",
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
			}
		],
		"name": "getStudentOpenedCourseIds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "departmentId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			}
		],
		"name": "getStudentsByDepartment",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "userId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "surname",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "number",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "password",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "mail",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "phone",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "roles",
						"type": "string[]"
					},
					{
						"internalType": "uint256",
						"name": "created_at",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					}
				],
				"internalType": "struct UserContract.User[]",
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
		"inputs": [],
		"name": "studentCourseInfoContractAddress",
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

module.exports = StudentAbi;
