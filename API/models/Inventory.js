import { Sequelize } from "sequelize";
import { db } from "../config/database.js";
import Users from "./Usermodel.js";

const { DataTypes } = Sequelize;

const Inventory = db.define(
  "Inventory",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    batchNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    totalValue: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.quantity * this.unitPrice;
      },
      set(value) {
        //
      },
    },
  },
  {
    timestamps: true,
  }
);


Users.hasMany(Inventory);
Inventory.belongsTo(Users, { foreignKey: "UsersId" });

export default Inventory;
