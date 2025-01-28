import Order from "../models/Order.js";
import Inventory from "../models/Inventory.js";
import OrderItem from "../models/OrderItem.js";
import User from '../models/Usermodel.js'






export const getOrder = async (req, res) => {
  try {
    let whereCondition = {};

    // Role-based filtering
    if (req.role === "admin") {
      // Admin sees all orders
      whereCondition = {};
    } else if (req.role === "user") {
      // Inventory Manager sees only approved orders
      whereCondition = { status: "Approved" };
    } else {
      // Clients see only their own orders
      whereCondition = { UserId: req.userId };
    }

    const orders = await Order.findAll({
      where: whereCondition, // Dynamic condition based on role
      include: [
        {
          model: OrderItem,
          include: [Inventory], // Include product details
        },
      ],
    });

    // Format the response (same as before)
    const formattedOrders = orders.map((order) => {
      let totalQuantity = 0;
      let totalCost = 0;

      const formattedOrderItems = order.OrderItems.map((item) => {
        const itemTotalCost = item.quantity * parseFloat(item.Inventory.unitPrice);
        totalQuantity += item.quantity;
        totalCost += itemTotalCost;

        return {
          uuid: item.uuid,
          orderId: item.orderId,
          inventoryId: item.inventoryId,
          quantity: item.quantity,
          priceAtOrder: item.priceAtOrder,
          productName: item.Inventory.productName,
          unitPrice: item.Inventory.unitPrice,
          batchNumber: item.Inventory.batchNumber,
          expirationDate: item.Inventory.expirationDate,
          itemTotalCost: itemTotalCost,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });

      return {
        uuid: order.uuid,
        orderNumber: order.orderNumber,
        status: order.status,
        quantity: totalQuantity,
        totalCost: totalCost,
        deliveryAddress: order.deliveryAddress,
        description: order.description,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        UserId: order.UserId,
        OrderItems: formattedOrderItems,
      };
    });

    res.status(200).json(formattedOrders);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the order by ID and ensure it belongs to the logged-in client
    const order = await Order.findOne({
      where: { id, UserId: req.userId },
      include: [
        {
          model: OrderItem,
          include: [Inventory], // Include product details
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createOrder = async (req, res) => {
  const { items, deliveryAddress, description } = req.body;

  try {
    
    for (const item of items) {
      const inventory = await Inventory.findOne({ where: { uuid: item.inventoryId } });

      if (!inventory) {
        return res.status(404).json({ msg: `Product not found: ${item.inventoryId}` });
      }

      if (inventory.quantity < item.quantity) {
        return res.status(400).json({
          msg: `Not enough stock for ${inventory.productName}. Available: ${inventory.quantity}`,
        });
      }
    }

    // Create the order
    const order = await Order.create({
      orderNumber: `ORD-${Date.now()}`,
      UserId: req.userId,
      deliveryAddress,
      description,
      status: "Pending",
    });

    // Add items to the order and update inventory
    for (const item of items) {
      const inventory = await Inventory.findOne({ where: { uuid: item.inventoryId } });

      await OrderItem.create({
        orderId: order.uuid,
        inventoryId: inventory.uuid, 
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




export const updateOrder = async (req, res) => {
  const { uuid } = req.params;  
  const { status } = Array.isArray(req.body) ? req.body[0] : req.body; 

  console.log("Request Body:", req.body); 
  console.log("User Role:", req.role); 
  console.log("Status:", status); 

  try {
    const order = await Order.findOne({ where: { uuid } });

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    if (req.role === "admin" && ["Approved", "Rejected"].includes(status)) {
      order.status = status;
    } else if (req.role === "user" && status === "Dispatched") {
      if (order.status !== "Approved") {
        return res.status(400).json({ msg: "Only approved orders can be dispatched" });
      }
      order.status = status;
    } else {
      return res.status(403).json({ msg: "Unauthorized action" });
    }

    await order.save();
    res.status(200).json({ msg: "Order updated successfully", order });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ msg: error.message });
  }
};




  export const deleteOrder = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Fetch the order and ensure it belongs to the logged-in client
      const order = await Order.findOne({ where: { id, UserId: req.userId } });
  
      if (!order) {
        return res.status(404).json({ msg: "Order not found" });
      }
  
      // Delete the order
      await order.destroy();
      res.status(200).json({ msg: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };