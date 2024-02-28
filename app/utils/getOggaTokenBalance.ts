import Web3 from 'web3'

import OggaTokenContractABI from '../contract/OggaToken'

/**
 * @function
 * @name getUserOggaTokenBalance
 * @param {string} userAddress
 * @returns {number}
 * @description Simple function to allow user to get their erc20 Ogga Token Balance
 */
async function getUserOggaTokenBalance(userAddress: string) {
    try {
        // Instantiate Web3
        const web3 = new Web3(window.ethereum)

        // Define the ABI and contract address
        const contractAbi = OggaTokenContractABI
        const contractAddress =
            process.env.OGGA_TOKEN_ADDRESS ||
            '0xA68D295565ee086af823dd1dA1F95Db7e1701233'
        const contract = new web3.eth.Contract(contractAbi, contractAddress)

        // Call the contract function to get the balance
        const balance: any = await contract.methods
            .balanceOf(userAddress)
            .call()
        const etherValue = web3.utils.fromWei(balance, 'ether')
        return etherValue
    } catch (error) {
        console.error('Error getting user balance:', error)
        throw error // Handle the error accordingly
    }
}

export default getUserOggaTokenBalance
