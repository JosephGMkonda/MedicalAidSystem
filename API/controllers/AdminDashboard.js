import Inventory from "../models/Inventory.js";
import User from "../models/Usermodel.js";
import { Op } from "sequelize";

export const getAdminDashboardData = async (req, res) => {
    try {
        
        const clientCount = await User.count({
            where: { role: "client" },
        });

        
        const inventoryData = await Inventory.findAll({
            attributes: ["quantity", "unitPrice"], 
        });

        
        let totalValue = 0;
        let projectedProfit = 0;

        inventoryData.forEach((item) => {
            const quantity = item.quantity;
            const unitPrice = item.unitPrice;

            const itemTotalValue = quantity * unitPrice;
            const itemCost = itemTotalValue * 0.8; 
            const itemProfit = itemTotalValue - itemCost; 

            totalValue += itemTotalValue; 
            projectedProfit += itemProfit; 
        });

        
        res.status(200).json({
            clientCount,
            totalValue,
            projectedProfit,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


// Controller function for low stock products
export const getLowStockProducts = async (req, res) => {
    try {
      const threshold = 100; 
      const lowStockProducts = await Inventory.findAll({
        where: {
          quantity: {
            [Op.lt]: threshold, 
          },
        },
        attributes: ["productName", "quantity", "unitPrice", "batchNumber"], 
      });
  
      res.status(200).json(lowStockProducts);
    } catch (error) {
      console.error("Error fetching low-stock products:", error);
      res.status(500).json({ error: "An error occurred while fetching data." });
    }
  };



// Controller function for top 3 near-expiry products
export const getNearExpiryProducts = async (req, res) => {
  try {
    
    const nearExpiryProducts = await Inventory.findAll({
      where: {
        expirationDate: {
          [Op.gt]: new Date(), 
        },
      },
      order: [["expirationDate", "ASC"]], 
      limit: 3, 
      attributes: ["productName", "quantity", "expirationDate"], 
    });

    if (!nearExpiryProducts || nearExpiryProducts.length === 0) {
      return res.status(404).json({ message: "No near-expiry products found." });
    }

    
    res.status(200).json(nearExpiryProducts);
  } catch (error) {
    console.error("Error fetching near-expiry products:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
};



// Inventory Manager
export const getInventorySummary = async (req, res) => {
    try {
        
        const currentDate = new Date();

        
        const inventoryData = await Inventory.findAll({
            attributes: ["quantity", "unitPrice", "expirationDate"],
        });

        
        let totalValue = 0;
        let totalQuantity = 0;
        let expiredProductCount = 0;

      
        inventoryData.forEach((item) => {
            const quantity = item.quantity;
            const unitPrice = item.unitPrice;
            const expirationDate = new Date(item.expirationDate);

            
            totalValue += quantity * unitPrice;

            
            totalQuantity += quantity;

            
            if (expirationDate < currentDate) {
                expiredProductCount += quantity;
            }
        });

        
        res.status(200).json({
            totalValue,
            totalQuantity,
            expiredProductCount,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

  
  
  