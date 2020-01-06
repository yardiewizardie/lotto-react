import web3 from './web3';

const address = '0x4477f8BbC3aCcbA5aa9648d5508E4921480f2efD';

const abi = [
	{
		constant: true,
		inputs: [],
		name: 'manager',
		outputs: [ { internalType: 'address', name: '', type: 'address' } ],
		payable: false,
		stateMutability: 'view',
		type: 'function',
		signature: '0x481c6a75'
	},
	{
		constant: false,
		inputs: [],
		name: 'pickWinner',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
		signature: '0x5d495aea'
	},
	{
		constant: true,
		inputs: [],
		name: 'getPlayers',
		outputs: [ { internalType: 'address payable[]', name: '', type: 'address[]' } ],
		payable: false,
		stateMutability: 'view',
		type: 'function',
		signature: '0x8b5b9ccc'
	},
	{
		constant: false,
		inputs: [],
		name: 'roll',
		outputs: [],
		payable: true,
		stateMutability: 'payable',
		type: 'function',
		signature: '0xcd5e3c5d'
	},
	{
		constant: true,
		inputs: [],
		name: 'winner',
		outputs: [ { internalType: 'address', name: '', type: 'address' } ],
		payable: false,
		stateMutability: 'view',
		type: 'function',
		signature: '0xdfbf53ae'
	},
	{ inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor', signature: 'constructor' }
];

export default new web3.eth.Contract(abi, address);
