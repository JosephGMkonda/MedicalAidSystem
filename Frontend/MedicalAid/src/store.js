import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/AunthSlice'
import userReducer from './features/UserSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer
  }
})