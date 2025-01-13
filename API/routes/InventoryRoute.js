import express from 'express'
import { getInventory, 
    getInventoryById,
    updateInventory,
    deleteInventory,
    createInventory } from '../controllers/InventoryController.js';
import { verifyUser, AdminOnly } from '../middleware/AunthUser.js';


const inventoryRouter = express.Router();

inventoryRouter.get('/inventory',verifyUser, getInventory);
inventoryRouter.get('/inventory/:id',verifyUser, getInventoryById);
inventoryRouter.delete('/inventory/:id',verifyUser, deleteInventory);
inventoryRouter.patch('/inventory/:id',verifyUser, updateInventory);
inventoryRouter.post('/create',verifyUser, createInventory);


export default inventoryRouter;