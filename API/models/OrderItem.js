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
        validate: {
          notEmpty: true,
        },
      },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: "id",
    },
  },
  inventoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Inventory,
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1,
    },
  },
  priceAtOrder: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Inventory.hasMany(OrderItem, { foreignKey: "inventoryId" });
OrderItem.belongsTo(Inventory, { foreignKey: "inventoryId" });

export default OrderItem;
