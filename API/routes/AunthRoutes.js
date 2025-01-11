import express from 'express'
import {Login, Logout, Me} from '../controllers/AunthController.js'

const AuthRouter = express.Router();

AuthRouter.get('/me', Me);
AuthRouter.delete('/logout', Logout);
AuthRouter.post('/login', Login);


export default AuthRouter;