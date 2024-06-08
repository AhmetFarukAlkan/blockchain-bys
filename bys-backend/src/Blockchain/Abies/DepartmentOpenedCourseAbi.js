const DepartmentOpenedCourseAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_openedCourseContractAddress",
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
		"name": "getOpenedCoursesByDepartment",
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
	}
];

module.exports = DepartmentOpenedCourseAbi;
