import User from '../models/Usermodel.js'
import argon from 'argon2'
import session from 'express-session'


export const Login = async (req, res) => {

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    if(!user){
        return res.status(404).json({msg: "User not found"})
    }

    const match = await argon.verify(user.password, req.body.password);
    if(!match){
        return res.status(404).json({msg: "wrong password"})
    }
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;

    res.status(200).json({uuid, name, email,role})

}



export const Me = async (req, res) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "You have loggedin"})
    }
    const user = await User.findOne({
        attribute: ['uuid','name','email','role'],
        where: {
            uuid: req.session.userId
        }
    })
    if(!user){
        return res.status(404).json({msg: "User not found"})
    }

    res.status(200).json(user)

}


export const Logout = (req, res) => {
    req.session.destroy((err) => {
        if(err){
            res.status(400).json({msg: "Fail to logout"})
        }

        res.status(200).json({msg: "Logout successfully"})
    })
}