'use client'
import ActionButton from '../button'
import Web3 from 'web3'

import { useSelector, useDispatch } from 'react-redux'
import { getUserWallet, setUserWallet } from '../../redux/walletReducer'
import { setUserBalance } from '../../redux/balanceReducer'
import { setOggaTokens } from '../../redux/oggaTokenReducer'
import { useState } from 'react'

import getUserOggaTokenBalance from '../../utils/getOggaTokenBalance'
import getTokenBalance from '../../utils/getUserBalance'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

declare global {
    interface Window {
        ethereum?: any // Define ethereum property as optional of any type
    }
}

function formatEthereumAddress(address: string): string {
    if (!address) return ''

    const start = address.slice(0, 7)
    const end = address.slice(-5)
    return `${start}...${end}`
}

export default function Navbar() {
    const walletAddress = formatEthereumAddress(useSelector(getUserWallet))
    const dispatch = useDispatch()

    const [connection, setConnection] = useState(false)
    const [loading, setLoading] = useState(false)

    const connectWallet = async () => {
        if (window.ethereum) {
            setLoading(true)
            const web3 = new Web3(window.ethereum)
            try {
                // Request account access if needed
                await window.ethereum.request({ method: 'eth_requestAccounts' })

                // Check the network ID
                await web3.eth.net
                    .getId()
                    .then(async (networkId: any) => {
                        if (String(networkId) !== '11155111n') {
                            await window.ethereum
                                .request({
                                    method: 'wallet_switchEthereumChain',
                                    params: [{ chainId: '0xAA36A7' }],
                                })
                                .then(async () => {
                                    const accounts =
                                        await web3.eth.getAccounts()
                                    const userAccount = accounts[0]
                                    const oggaTokens =
                                        await getUserOggaTokenBalance(
                                            userAccount
                                        )
                                    const tokenBalance =
                                        await getTokenBalance(userAccount)
                                    dispatch(setUserWallet(userAccount))
                                    setConnection(true)
                                    dispatch(setUserBalance(tokenBalance))
                                    dispatch(setOggaTokens(oggaTokens))
                                    setLoading(false)
                                })
                                .catch(async (e: any) => {
                                    setLoading(true)
                                    if (e.code === 4902) {
                                        console.log(
                                            'network is not available, add it'
                                        )
                                    } else {
                                        console.log('could not set network')
                                    }
                                })
                        }
                    })
                    .catch((err) => {
                        setLoading(true)
                        console.log(err, 'unable to retrieve network id')
                        throw err
                    })
            } catch (error: any) {
                console.error('MetaMask connection error:', error)
                toast.warning(error?.message)
            }
        } else {
            toast.warning('Please Install MetaMask, Metamask not found')
        }
    }

    const discountWallet = async () => {
        setConnection(false)
        dispatch(setUserWallet(null))
        dispatch(setUserBalance(0))
        dispatch(setOggaTokens(0))
    }

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center md:order-2">
                    <p className="flex justify-center mr-6">
                        Wallet Address: {walletAddress}
                    </p>
                    <ActionButton
                        loading={loading}
                        title={`${connection ? 'Discount' : 'Connect'} Wallet`}
                        func={connection ? discountWallet : connectWallet}
                    />
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky"
                >
                    <ul
                        className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse 
          md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                    >
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                aria-current="page"
                            >
                                Blockchain dapp
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
