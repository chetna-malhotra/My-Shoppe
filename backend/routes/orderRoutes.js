import express from 'express'
const Router=express.Router()
import {protect} from '../middleware/authMiddleware.js'
import {getOrders } from '../controllers/orderController.js'
//@desc Fetch all products
//@route GET/api/products
Router.route('/').post(protect,getOrders)
export default Router