import express from 'express'
import {getAdminDashboardData,getLowStockProducts,getNearExpiryProducts,getInventorySummary} from "../controllers/AdminDashboard.js"

const AdminRouter = express.Router();

AdminRouter.get('/adminStati', getAdminDashboardData);
AdminRouter.get('/lowstock', getLowStockProducts);
AdminRouter.get('/nearExpProduct', getNearExpiryProducts);
AdminRouter.get('/inventoryStat', getInventorySummary);



export default AdminRouter;