import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
//const Router=express.Router()
//get from @fetch products

const getOrders=asyncHandler(async(req,res)=>{
    const {orderItems,shippingAddress,paymentMethod,itemsPrice,
        taxPrice,shippingPrice,totalPrice}=req.body
        if(orderItems && orderItems.length==0){
            res.status(400)
            throw new Error('No order items')

        }
        const order=new Order({
            orderItems,
            user:req.user._id,
            shippingAddress,paymentMethod,itemsPrice,
        taxPrice,shippingPrice,totalPrice
        })
const createOrder=await order.save()
res.status(201).json(createOrder)
    
})
export{

    getOrders
}
