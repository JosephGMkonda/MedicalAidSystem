import express from "express";
import { verifyUser, AdminOnly } from "../middleware/AunthUser.js";
import {
  getOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/OrderController.js";

const orderRouter = express.Router();

// CliorderRouter
orderRouter.get("/orders", verifyUser, getOrder); 
orderRouter.get("/orders/:id", verifyUser, getOrderById); 
orderRouter.post("/orders", verifyUser, createOrder); 
orderRouter.delete("/orders/:uuid", verifyUser, deleteOrder); 

// Admin and InventoryManager routes
orderRouter.put("/orders/:uuid", verifyUser, updateOrder); 

export default orderRouter;