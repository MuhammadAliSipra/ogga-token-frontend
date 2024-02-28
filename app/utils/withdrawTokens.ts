import Web3 from 'web3'

import TokenBankContractABI from '../contract/TokenBank'

/**
 * @function
 * @name depositUserFunds
 * @param {string} walletAddress
 * @param {number} userAmount
 * @returns {Response}
 * @description Simple function to allow user to withdraw erc20 Ogga Token funds from token Bank contract
 */
async function withdrawUserFunds(walletAddress: string, userAmount: number) {
    try {
        if (!walletAddress) {
            throw new Error('Connect Wallet Address')
        }

        // Instantiate Web3
        const web3 = new Web3(window.ethereum)

        // Define the ABI and contract address
        const contractAbi = TokenBankContractABI
        const contractAddress =
            process.env.TOKEN_BANK_ADDRESS ||
            '0x1837435c8eF4007a78C9f65Ce05163c2541201b8'

        const contract = new web3.eth.Contract(contractAbi, contractAddress)
        console.log(userAmount)
        const gasOptions = {
            from: walletAddress,
            gasPrice: web3.utils.toWei('5', 'gwei'),
            gasLimit: 25000,
        }
        console.log(contract)
        // Call the contract function to get the balance
        const result = await contract.methods
            .withdraw(userAmount)
            .send(gasOptions)

        return result
    } catch (error: any) {
        if (error.message === 'Connect Wallet Address') {
            throw new Error(
                'Please connect a wallet address before withdrawing funds.'
            )
        } else {
            console.error('Error getting while depositing Funds:')
        }
    }
}

export default withdrawUserFunds
