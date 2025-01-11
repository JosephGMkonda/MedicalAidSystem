import express from 'express'
import { getOrder, getOrderById,deleteOrder,updateOrder, createOrder } from '../controllers/OrderController.js';
const router = express.Router();

router.get('/orders', getOrder);
router.get('/order:id', getOrderById);
router.delete('/order:id', deleteOrder);
router.patch('/order', updateOrder);
router.post('/order', createOrder);


export default router;