import { configureStore } from '@reduxjs/toolkit'
import postSlice from '../slice/postSlice'
import userSlice from '../slice/userSlice'

const store = configureStore({
    reducer: {
        User: userSlice,
        Posts: postSlice
    }
})

export default store