import Inventory from "../models/Inventory.js";
import User from '../models/Usermodel.js'

export const getInventory = async (req, res) => {
    try {
        let response;

        if (req.role === "admin") {
            
            response = await Inventory.findAll({
                include: [
                    {
                        model: User,
                        attributes:["name", "email"]
                    },
                ],
            });
        } else if (req.role === "client") {
            
            response = await Inventory.findAll({
                attributes: ["uuid","productName", "unitPrice","expirationDate"],
                include: [
                    {
                        model: User,
                        attributes:["name", "email"]
                    },
                ],
            });
        } else if (req.role === "user") {
            
            response = await Inventory.findAll({
                attributes: ["uuid","productName", "unitPrice", "quantity"], 
                include: [
                    {
                        model: User,
                        attributes:["name", "email"]
                    },
                ],
            });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const getInventoryById = async (req, res) => {
    try {
        
        const inventory = await Inventory.findOne({
            where: {
                uuid: req.params.id, 
            },
        });

        
        if (!inventory) {
            return res.status(404).json({ msg: "Data not found" });
        }

        let response;

        if (req.role === "admin") {
            
            response = await Inventory.findOne({
                where: {
                    uuid: req.params.id, 
                },
                include: [
                    {
                        model: User,
                        attributes: ["name", "email"],
                    },
                ],
            });
        } else if (req.role === "client") {
            
            response = await Inventory.findOne({
                attributes: ["uuid", "productName", "unitPrice", "expirationDate"],
                where: {
                    uuid: req.params.id, 
                },
                include: [
                    {
                        model: User,
                        attributes: ["name", "email"],
                    },
                ],
            });
        } else if (req.role === "user") {
            
            response = await Inventory.findOne({
                attributes: ["uuid", "productName",  "unitPrice", "quantity"],
                where: {
                    uuid: req.params.id, 
                },
                include: [
                    {
                        model: User,
                        attributes: ["name", "email"],
                    },
                ],
            });
        }

        res.status(200).json(response);
    } catch (error) {
        
        res.status(500).json({ msg: error.message });
    }
};

export const createInventory = async (req, res) => {

    const {productName,quantity,batchNumber,expirationDate,unitPrice,description} = req.body;

    try {
         await Inventory.create({
            productName:productName,
            
            quantity:quantity,
            batchNumber:batchNumber,
            expirationDate:expirationDate,
            unitPrice:unitPrice,
            description:description,
            userId: req.userId
        })
        res.status(201).json({msg: "created invetory"});
    } catch (error) {

        res.status(500).json({msg: error.message});    
    }
    
}

export const updateInventory = async (req, res) => {
    try {
        
        const inventory = await Inventory.findOne({
            where: {
                uuid: req.params.id,
            },
        });

        
        if (!inventory) {
            return res.status(404).json({ msg: "Data not found" });
        }

        
        if (req.role === "admin") {
            
            await Inventory.update(req.body, {
                where: {
                    uuid: req.params.id,
                },
            });
        } else if (req.role === "user") {
            
            const { quantity, batchNumber } = req.body;
            await Inventory.update({ quantity, batchNumber }, {
                where: {
                    uuid: req.params.id,
                },
            });
        } else if (req.role === "client") {
            
            return res.status(403).json({ msg: "Clients are not allowed to update inventory" });
        } else {
            return res.status(403).json({ msg: "Unauthorized role" });
        }

    
        const updatedInventory = await Inventory.findOne({
            where: {
                uuid: req.params.id,
            },
        });

        res.status(200).json(updatedInventory);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};




export const deleteInventory = async (req, res) => {
    try {
        
        const inventory = await Inventory.findOne({
            where: {
                uuid: req.params.id,
            },
        });

        
        if (!inventory) {
            return res.status(404).json({ msg: "Data not found" });
        }

        
        if (req.role === "admin") {
            
            await Inventory.destroy({
                where: {
                    uuid: req.params.id,
                },
            });

            
            return res.status(200).json({ msg: "Deleted successfully" });
        } else {
        
            return res.status(403).json({ msg: "Only admins can delete inventory" });
        }
    } catch (error) {
        
        res.status(500).json({ msg: error.message });
    }
};
