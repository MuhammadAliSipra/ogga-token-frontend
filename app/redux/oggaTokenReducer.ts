import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'oggaToken',
    initialState: {
        amount: 0,
    },
    reducers: {
        setOggaTokens: (state, action) => {
            return {
                ...state,
                amount: !!action.payload ? action.payload : 0,
            }
        },
    },
})

export const { setOggaTokens } = slice.actions

export const getOggaTokens = (state: any) => {
    return !!state.oggaToken.amount ? state.oggaToken.amount : 0
}

export default slice.reducer
