import Order from "../models/Order.js";
import Inventory from "../models/Inventory.js";
import OrderItem from "../models/OrderItem.js";
import User from '../models/Usermodel.js'


export const getOrder = (req, res) => {

}

export const getOrderById = (req, res) => {
    
}
export const createOrder = async (req, res) => {
    const { items, deliveryAddress, description } = req.body;
  
    try {
      
      for (const item of items) {
        const inventory = await Inventory.findOne({ where: { uuid: item.inventoryId } });
  
        if (!inventory) {
          return res.status(404).json({ msg: `Drug not found: ${item.inventoryId}` });
        }
  
        if (inventory.quantity < item.quantity) {
          return res.status(400).json({
            msg: `Not enough stock for ${inventory.productName}. Available: ${inventory.quantity}`,
          });
        }
      }
  
      
      const order = await Order.create({
        orderNumber: `ORD-${Date.now()}`,
        UserId: req.userId,
        deliveryAddress,
        description,
        status: "Pending",
      });
  
      
      for (const item of items) {
        const inventory = await Inventory.findOne({ where: { uuid: item.inventoryId } });
  
        await OrderItem.create({
          orderId: order.id,
          inventoryId: inventory.id,
          quantity: item.quantity,
          priceAtOrder: inventory.unitPrice,
        });
  
        
        inventory.quantity -= item.quantity;
        await inventory.save();
      }
  
      res.status(201).json({ msg: "Order created successfully", order });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };




export const updateOrder = (req, res) => {
    
}

export const deleteOrder = (req, res) => {
    
}