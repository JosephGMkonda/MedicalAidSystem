import express from 'express'
import { getInventory, getInventoryById,updateInventory,deleteInventory,createInventory } from '../controllers/InventoryController';

const router = express.Router();

router