'use client'
import { useEffect, useState } from 'react'
import ActionButton from '../button'
import InputField from '../inputField'
import { useSelector } from 'react-redux'

import { getUserBalance } from '../../redux/balanceReducer'
import { getOggaTokens } from '../../redux/oggaTokenReducer'
import { getUserWallet } from '../../redux/walletReducer'

import depositUserFunds from '../../utils/depositTokens'
import withdrawUserFunds from '../../utils/withdrawTokens'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function FormSwap() {
    const allowedAction = ['Deposit', 'Withdraw']
    const [action, setAction] = useState(allowedAction[0])
    const [title, setTitle] = useState(action + ' funds')
    const [loading, setLoading] = useState(false)
    const [userAmount, setUserAmount] = useState(0)

    const walletAddress = useSelector(getUserWallet)
    const tokenBalance = useSelector(getUserBalance)
    const oggaTokens = useSelector(getOggaTokens)

    const withdrawFunds = async () => {
        try {
            setLoading(true)
            await withdrawUserFunds(walletAddress, userAmount)
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            toast.error(err?.message)
        }
    }

    const depositFunds = async () => {
        try {
            setLoading(true)
            console.log(userAmount)
            await depositUserFunds(walletAddress, userAmount)
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            toast.error(err?.message)
        }
    }

    useEffect(() => {
        setTitle(action + ' funds')
        setUserAmount(0)
    }, [action])

    return (
        <>
            <div className="flex justify-center items-center w-full h-screen">
                <div className=" flex justify-center items-center w-full">
                    <div className=" p-4 w-full max-w-md max-h-full">
                        <div className=" bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Select the Action
                                </h3>
                            </div>
                            <ul className="flex justify-center flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                                {allowedAction?.map((itm: string) => {
                                    return (
                                        <li
                                            key={itm}
                                            className="me-2 cursor-pointer"
                                        >
                                            <a
                                                onClick={() => setAction(itm)}
                                                className={`inline-block p-2 ${
                                                    action === itm
                                                        ? 'text-blue-600 bg-gray-100'
                                                        : 'hover:text-gray-600 hover:bg-gray-50'
                                                }  rounded-t-lg `}
                                            >
                                                {itm}
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                            <div className="flex w-full p-2 md:pl-8 justify-center text-sm md:justify-start">
                                Token Balance :{' '}
                                {tokenBalance ? `${tokenBalance}` : '0'}
                            </div>
                            <div className="flex w-full p-2 md:pl-8 justify-center text-sm md:justify-start">
                                Ogga Tokens :{' '}
                                {oggaTokens ? `${oggaTokens}` : '0'}
                            </div>
                            <div className="mt-10 p-4 md:p-5 flex justify-center">
                                <form className="space-y-10" action="#">
                                    <InputField
                                        title={title}
                                        amount={userAmount}
                                        setAmount={setUserAmount}
                                    />
                                    <div
                                        className={`${walletAddress ? 'block' : 'disable'}`}
                                    >
                                        <ActionButton
                                            title={
                                                action === 'Deposit'
                                                    ? 'Deposit'
                                                    : 'Withdraw'
                                            }
                                            loading={loading}
                                            func={
                                                action === 'Deposit'
                                                    ? depositFunds
                                                    : withdrawFunds
                                            }
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
