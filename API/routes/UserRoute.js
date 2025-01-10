import express from 'express'
import { getUser,getUserId,deleteUser,updateUser,createUser } from '../controllers/UserController';


const router = express.Router();

router.get('/