import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/AunthSlice'

export default configureStore({
  reducer: {
    auth: authReducer
  }
})