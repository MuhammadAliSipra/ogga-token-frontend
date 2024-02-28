import Web3 from 'web3'

import TokenBankContractABI from '../contract/TokenBank'

/**
 * @function
 * @name getTokenBalance
 * @param {string} userAddress
 * @returns {number}
 * @description Simple function to allow user to get their erc20 Ogga Token Balance from token Bank Contract
 */
async function getTokenBalance(userAddress: string) {
    try {
        // Instantiate Web3
        const web3 = new Web3(window.ethereum)

        // Define the ABI and contract address
        const contractAbi = TokenBankContractABI
        const contractAddress =
            process.env.TOKEN_BANK_ADDRESS ||
            '0x1837435c8eF4007a78C9f65Ce05163c2541201b8'

        const contract = new web3.eth.Contract(contractAbi, contractAddress)

        // Call the contract function to get the balance
        const balance: any = await contract.methods.balances(userAddress).call()
        const etherValue = web3.utils.fromWei(balance, 'ether')
        return etherValue
    } catch (error) {
        console.error('Error getting user balance:', error)
        throw error // Handle the error accordingly
    }
}

export default getTokenBalance
