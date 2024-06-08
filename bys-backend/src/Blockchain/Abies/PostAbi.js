const PostAbi = [
	{
		"inputs": [
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "postId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "creator_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "body",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "created_at",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "course_id",
				"type": "uint256"
			}
		],
		"name": "PostAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "postId",
				"type": "uint256"
			}
		],
		"name": "PostDeleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "postId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "creator_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "body",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "created_at",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "course_id",
				"type": "uint256"
			}
		],
		"name": "PostUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_creator_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_body",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_course_id",
				"type": "uint256"
			}
		],
		"name": "addPost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_postId",
				"type": "uint256"
			}
		],
		"name": "deletePost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_postId",
				"type": "uint256"
			}
		],
		"name": "getPost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
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
				"name": "_course_id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "userContractAddress",
				"type": "address"
			}
		],
		"name": "getPostsByCourse",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "creator_id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "user_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "body",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "created_at",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "course_id",
						"type": "uint256"
					}
				],
				"internalType": "struct PostContract.PostInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "postCount",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "posts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "creator_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "body",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "created_at",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "course_id",
				"type": "uint256"
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
				"internalType": "uint256",
				"name": "_postId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_body",
				"type": "string"
			}
		],
		"name": "updatePost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

module.exports = PostAbi;
