import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import bodyparser from 'body-parser'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
dotenv.config()
connectDB()
const app=express();
const port=process.env.PORT || 5000
app.use(express.json())
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)

app.use(notFound)
app.use(errorHandler)


app.listen(port,console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`.yellow.bold))

app.get('/',(req,res)=>{
    res.send('Hello')
})