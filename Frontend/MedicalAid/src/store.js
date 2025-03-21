import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/AunthSlice'
import userReducer from './features/UserSlice'
import inventoryReducer from './features/inventory'
import adminReducer from "./features/AdminSlice";
import nearExpiryReducer from "./features/Expiry";
import lowStockReducer from "./features/LowStockSlice";
import inventoryManagerReducer from "./features/InventoryManagerSlice";
import inventoryClientReducer from "./features/ClientProductSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    inventories: inventoryReducer,
    admin: adminReducer,
    nearExpiry: nearExpiryReducer,
    lowStock: lowStockReducer,
    inventory: inventoryManagerReducer,
    inventoryProduct: inventoryClientReducer,




  }
})