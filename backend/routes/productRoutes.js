import express from 'express'
const Router=express.Router()
import { getProductByid, getProducts } from '../controllers/productController.js'
//@desc Fetch all products
//@route GET/api/products
//@access Public
Router.route('/').get(getProducts)

Router.route('/:id').get(getProductByid)
export default Router