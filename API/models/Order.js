import { Sequelize } from "sequelize";
import { db } from "../config/database.js";
import Users from "./Usermodel.js";

const {DataTypes} = Sequelize;

const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const result = '';
    for (let i = 0; i < 3; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

const Order = db.define('Order', {

    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
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


userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

Users.hasMany(Order);
Inventory.belongsTo(Users, {foreignKey: "userId"});

export default Inventory;
