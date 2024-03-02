export const wagmiAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "memberAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "height",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "weight",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bornYear",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum MemberManagement.Role",
				"name": "role",
				"type": "uint8"
			}
		],
		"name": "MemberAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "memberAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "height",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "weight",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bornYear",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum MemberManagement.Role",
				"name": "role",
				"type": "uint8"
			}
		],
		"name": "MemberRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "memberAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum MemberManagement.Role",
				"name": "newRole",
				"type": "uint8"
			}
		],
		"name": "MemberRoleChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "memberAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "height",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "weight",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bornYear",
				"type": "uint256"
			}
		],
		"name": "MemberUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_memberAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_height",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_weight",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_bornYear",
				"type": "uint256"
			},
			{
				"internalType": "enum MemberManagement.Role",
				"name": "_role",
				"type": "uint8"
			}
		],
		"name": "addMember",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_memberAddress",
				"type": "address"
			}
		],
		"name": "getMemberDetails",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "members",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "height",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "weight",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bornYear",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
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
		"name": "registerMember",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "roles",
		"outputs": [
			{
				"internalType": "enum MemberManagement.Role",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_memberAddress",
				"type": "address"
			},
			{
				"internalType": "enum MemberManagement.Role",
				"name": "_newRole",
				"type": "uint8"
			}
		],
		"name": "setMemberRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_memberAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_height",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_weight",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_bornYear",
				"type": "uint256"
			}
		],
		"name": "updateMember",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]  as const; 