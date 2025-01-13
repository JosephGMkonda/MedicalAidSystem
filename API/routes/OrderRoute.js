import express from 'express'
import { getOrder, getOrderById,deleteOrder,updateOrder, createOrder } from '../controllers/OrderController.js';

const orderRouter = express.Router();

orderRouter.get('/orders', getOrder);
orderRouter.get('/order:id', getOrderById);
orderRouter.delete('/order:id', deleteOrder);
orderRouter.patch('/order', updateOrder);
orderRouter.post('/order', createOrder);


export default orderRouter;