import express from 'express'
const Router=express.Router()
import {protect} from '../middleware/authMiddleware.js'
import { authUser, registerNewUser, getUserProfile,updateUserProfile } from '../controllers/userController.js'
//@desc Fetch all products
//@route GET/api/products
Router.route('/login').post(authUser)
Router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
Router.route('/').post(registerNewUser)
export default Router