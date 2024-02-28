import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'balance',
    initialState: {
        amount: 0,
    },
    reducers: {
        setUserBalance: (state, action) => {
            return {
                ...state,
                amount: !!action.payload ? action.payload : 0,
            }
        },
    },
})

export const { setUserBalance } = slice.actions

export const getUserBalance = (state: any) => {
    return !!state.balance.amount ? state.balance.amount : 0
}

export default slice.reducer
