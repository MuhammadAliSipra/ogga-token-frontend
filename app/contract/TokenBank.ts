const TokenBankContractABI = [
    {
        inputs: [{ internalType: 'address', name: '_token', type: 'address' }],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    { inputs: [], name: 'ReentrancyGuardReentrantCall', type: 'error' },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'Deposit',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'Withdrawal',
        type: 'event',
    },
    {
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'balances',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
        name: 'deposit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'token',
        outputs: [
            { internalType: 'contract IERC20', name: '', type: 'address' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'withdrawAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    { stateMutability: 'payable', type: 'receive' },
]

export default TokenBankContractABI
