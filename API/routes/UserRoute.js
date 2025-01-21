import express from 'express'
import { getUser,getUserId,deleteUser,updateUser,createUser } from '../controllers/UserController.js';
import { verifyUser, AdminOnly } from '../middleware/AunthUser.js';

const userRouter = express.Router();
userRouter.get('/users',verifyUser,AdminOnly, getUser);
userRouter.get('/users/:id',verifyUser,AdminOnly, getUserId);
userRouter.delete('/users/:id',verifyUser,AdminOnly, deleteUser);
userRouter.patch('/users/:id',verifyUser,AdminOnly, updateUser);
userRouter.post('/users',verifyUser,AdminOnly, createUser);


export default userRouter;