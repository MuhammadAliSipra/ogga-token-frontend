import { configureStore } from '@reduxjs/toolkit'
import balanceReducer from './balanceReducer'
import walletReducer from './walletReducer'
import oggaTokenReducer from './oggaTokenReducer'
export default configureStore({
    reducer: {
        balance: balanceReducer,
        wallet: walletReducer,
        oggaToken: oggaTokenReducer,
    },
})
