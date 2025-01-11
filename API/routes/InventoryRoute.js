import express from 'express'
import { getInventory, 
    getInventoryById,
    updateInventory,
    deleteInventory,
    createInventory } from '../controllers/InventoryController';

const router = express.Router();

router.get('/inventory', getInventory);
router.get('/inventory:id', getInventoryById);
router.delete('/inventory:id', deleteInventory);
router.patch('/inventory', updateInventory);
router.post('/create', createInventory);


export default router;