import { Sequelize } from "sequelize";
import { db } from "../config/database.js";
import Order from "./Order.js";
import Inventory from "./Inventory.js";

const { DataTypes } = Sequelize;

const OrderItem = db.define("OrderItem", {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Order,
      key: "uuid",
    },
  },
  inventoryId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Inventory,
      key: "uuid",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Relationships
Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Inventory.hasMany(OrderItem, { foreignKey: "inventoryId", targetKey: "uuid" });
OrderItem.belongsTo(Inventory, { foreignKey: "inventoryId", targetKey: "uuid" });

export default OrderItem;