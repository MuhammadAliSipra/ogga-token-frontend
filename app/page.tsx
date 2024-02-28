'use client'
import FormSwap from './components/form'
import Navbar from './components/navbar'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Provider } from 'react-redux'
import store from './redux/store'

export default function Home() {
    return (
        <Provider store={store}>
            <div className="flex ">
                <Navbar />
                <FormSwap />
                <ToastContainer />
            </div>
        </Provider>
    )
}
