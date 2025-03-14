import User from '../models/Usermodel.js'


export const verifyUser = async ( req, res, next )  =>  {

    if(!req.session.userId){
        return res.status(401).json({msg: "You have loggedin"})
    }
    const user = await User.findOne({
       
        where: {
            uuid: req.session.userId
        }
    })
    if(!user){
        return res.status(404).json({msg: "User not found"})
    }

    req.userId = user.id;
    req.role = user.role;
    next();

}

export const AdminOnly = async ( req, res, next )  =>  {
    const user = await User.findOne({
       
        where: {
            uuid: req.session.userId
        }
    })
    if(!user){
        return res.status(404).json({msg: "User not found"})
    }

    if(user.role !== "admin"){
        return res.status(403).json({msg: "Admin only can perform this operation"})

    }
    next();




}