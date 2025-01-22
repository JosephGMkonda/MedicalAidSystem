import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/AunthSlice'
import userReducer from './features/UserSlice'
import inventoryReducer from './features/inventory'

export default configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    inventories: inventoryReducer
  }
})