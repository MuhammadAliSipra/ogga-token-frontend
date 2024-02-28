import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'wallet',
    initialState: {
        address: '',
    },
    reducers: {
        setUserWallet: (state, action) => {
            return {
                ...state,
                address: !!action.payload ? action.payload : '',
            }
        },
    },
})

export const { setUserWallet } = slice.actions

export const getUserWallet = (state: any) => {
    return !!state.wallet.address ? state.wallet.address : ''
}

export default slice.reducer
