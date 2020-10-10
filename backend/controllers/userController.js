import asyncHandler from 'express-async-handler'
//const Router=express.Router()
//get from @fetch products
import User from '../models/userModel.js'
import generateToken from '../utils/generateTokens.js'

//Auth User 
const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token :generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})
const getUserProfile=asyncHandler(async(req,res)=>{
    
    const user=await User.findById(req.user._id)
    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })
    }else{
        res.status(404)
        throw new Error('user is found')
    }
    
})
const registerNewUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    const user=await User.findOne({email})
    if(user){
        res.status(400)
        throw new Error('user already exists')
    }
    const userr=await User.create({
        name,email,password
    })
    if(userr){
res.status(201)
res.json({
    _id:userr._id,
    name:userr.name,
    email:userr.email,
    isAdmin:userr.isAdmin,
    token :generateToken(userr._id)
})
    }else{
        res.status(400)
        throw new Error('Invalid user data')
        
    }
})
export
{
    authUser,getUserProfile,registerNewUser
}