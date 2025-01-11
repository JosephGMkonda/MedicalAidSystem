import { Sequelize } from "sequelize";
import { db } from "../config/database.js";
import Users from "./Usermodel.js";

const { DataTypes } = Sequelize;

const Order = db.define('Order', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Approved', 'Rejected', 'Dispatched', 'Delivered'),
        defaultValue: 'Pending',
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: true,  
});

Users.hasMany(Order);
Order.belongsTo(Users, { foreignKey: "UserId" });  

export default Order;
