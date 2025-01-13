import express from "express";
import cors from "cors";
import session from "express-session";
import userRouter from './routes/UserRoute.js'
import AuthRouter from "./routes/AunthRoutes.js";
import inventoryRouter from './routes/InventoryRoute.js'
import orderRouter from './routes/OrderRoute.js'
import { db } from "./config/database.js";
import sequelizeStore from 'connect-session-sequelize'
import dotenv from "dotenv";
import Inventory from "./models/Inventory.js";
import Order from "./models/Order.js";
import User from "./models/Usermodel.js";

dotenv.config();

const app = express();

const sessionStore = sequelizeStore(session.Store);

const store = new sessionStore({
    db:db
})




// (async () => {
//     try {
//         await db.sync({ force: true });
//         console.log("Database synced successfully!");
//     } catch (error) {
//         console.error("Error syncing database:", error);
//     }
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: 'auto' }
}));

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use('/api', userRouter);
app.use('/api', AuthRouter);
app.use('/api', inventoryRouter);
app.use('/api', orderRouter);
// store.sync();
app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running");
});
