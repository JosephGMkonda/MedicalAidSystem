import { UUID } from "sequelize";
import Usermodel from "../models/Usermodel.js";
import argon2 from 'argon2'

export const getUser = async (req, res) => {

    try {

        const response = await Usermodel.findAll({
            attributes:['uuid','name','email','role']
        });
        res.status(200).json(response);
        
    } catch (error) {
        res.status(500).json({msg: "error.message"})
        
    }

}
export const getUserId = async (req, res) => {
    try {
        
        const response = await Usermodel.findOne({
            where: { uuid: req.params.id }, 
            attributes: ['uuid', 'name', 'email', 'role'], 
        });

    
        if (!response) {
            return res.status(404).json({ msg: "User not found" }); 
        }

        
        res.status(200).json(response);
    } catch (error) {
        
        res.status(500).json({ msg: error.message });
    }
};


export const createUser = async (req, res) => {

    const {name, email, password, confirmPassword, role} = req.body;
    
    if(password != confirmPassword){
        return res.status(400).json({msg:" Password do not match"})
    }
    const hashPassword = await argon2.hash(password);
    try {
         await Usermodel.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role,
         })

        res.status(201).json({msg: "Successfully Registered"});
        
    } catch (error) {
        res.status(400).json({msg: "Registration failed"})
        
    }
    
}

export const updateUser = async (req, res) => {

    const user = await Usermodel.findOne({
        where: { uuid: req.params.id }, 
        
    });


    if (!user) {
        return res.status(404).json({ msg: "User not found" }); 
    }
    const {name, email, password, confirmPassword, role} = req.body;

    let hashPassword

    if(password === "" || password === null){
        hashPassword = user.password;
    }else{
        hashPassword = await argon2.hash(password);

    }

    if(password != confirmPassword){
        return res.status(400).json({msg:" Password do not match"})
    }


    try {
        await Usermodel.update({
           name: name,
           email: email,
           password: hashPassword,
           role: role,
        },{
            where:{
                id:user.id
            }
        })

       res.status(201).json({msg: "Successfully updated"});
       
   } catch (error) {
       res.status(400).json({msg: "update failed"})
       
   }


    
}

export const deleteUser = async(req, res) => {

    const user = await Usermodel.findOne({
        where: { uuid: req.params.id }, 
        
    });


    if (!user) {
        return res.status(404).json({ msg: "User not found" }); 
    }
    

    try {
        await Usermodel.destroy({
            where:{
                id:user.id
            }
        })

       res.status(201).json({msg: "deleted Successfully "});
       
   } catch (error) {
       res.status(400).json({msg: "delete"})
       
   }

    
}