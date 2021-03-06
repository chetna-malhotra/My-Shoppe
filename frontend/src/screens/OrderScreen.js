import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col,ListGroup,Image,Card} from 'react-bootstrap'
import {getOrderDetails,payOrder} from '../actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {ORDER_PAY_RESET} from '../constants/orderConstants'

const OrderScreen = ({match}) => {
    const orderId=match.params.id
    const [sdkReady,setsdkReady]=useState(false)
    const dispatch = useDispatch()
const orderDetails=useSelector(state=>state.orderDetails)
const {order,loading,error}=orderDetails
const orderPay=useSelector(state=>state.orderPay)
const {loading:loadingPay,success:successPay}=orderPay
//Price

if(!loading){
    order.itemsPrice=order.orderItems.reduce((acc,items)=>acc+items.price*items.qty,0)
order.shippingPrice=order.orderItems.reduce((acc,items)=>acc+2.5*items.qty,0)   
order.taxPrice=Number((0.15)*order.itemsPrice).toFixed(2)
order.totalPrice=(Number(order.itemsPrice)+Number(order.shippingPrice)+Number(order.taxPrice)).toFixed(2) 
}
    useEffect(() => {
        dispatch(getOrderDetails(orderId))
        const addPaypalScript=async()=>{
            const {data:clientId}=await axios.get('/api/config/paypal')

            const script =document.createElement('script')
            script.type='text/javascript'
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}&currency=INR`
            script.async=true
            script.onload=()=>{
                setsdkReady(true)
            }
            document.body.appendChild(script)
        }
       
        
        if( !order){
            
            dispatch(getOrderDetails(orderId))
        }
        else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }else{
                setsdkReady(true)
            }
        }
    }, [dispatch, orderId,successPay]) 
    const successPaymentHandler=(paymentResult)=>{
        console.log(this)
        dispatch(payOrder(orderId,paymentResult))
    }
    



   
    return loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:
    <>
    <h1>Order {order._id}</h1>
    <Row>
           <Col md={8}>
               <ListGroup variant='flush'>
                   <ListGroup.Item >
                       <h2>
                           Shipping
                       </h2>
                       <p>
                           <strong>Address:</strong>
    {order.shippingAddress.address}, {order.shippingAddress.city},{''}, {order.shippingAddress.postalCode}</p>
    {order.isDelivered?<Message variant='success'>Delivered on</Message>:<Message variant='danger'>Not Delivered</Message>}
                   </ListGroup.Item>
                   <ListGroup.Item>
                       <h2>
                           Payment method
                       </h2>
                       <p><strong>Chosen Method:</strong>
                        {order.paymentMethod} </p>
                        {order.isPaid?<Message variant='success'>Paid on {order.paidAt}</Message>:<Message variant='danger'>Not Paid</Message>}
                   </ListGroup.Item>
                   <ListGroup.Item>
                       <h2>
                           Order Items
                       </h2>
                       {order.orderItems.length===0 ?<Message>Your order is empty!</Message>:
                       (
                    <ListGroup variant='flush'>
                        {order.orderItems.map((item,index)=>(
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>

                                    </Col>
                                    <Col md={5}>
                                        <Link to={`/product${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={5}>
                                        {item.qty}*{item.price}INR={item.qty*item.price}INR
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                       )}
                       
                   </ListGroup.Item>
               </ListGroup>
           </Col>
           <Col md={4}>
               <Card>
                   <ListGroup>
                       <ListGroup.Item>
                           <h2>Order Summary</h2>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col>Items</Col>
                               <Col>{order.itemsPrice}INR</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col>Shipping</Col>
                               <Col>{order.shippingPrice}INR</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col>Tax</Col>
                               <Col>{order.taxPrice}INR</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col>Total Price</Col>
                               <Col>{order.totalPrice}INR</Col>
                           </Row>
                       </ListGroup.Item>
                       {!order.isPaid &&(
                           <ListGroup.Item>
                           {loadingPay && <Loader/>}
                           {!sdkReady ?<Loader/>:(
                               <PayPalButton amount={order.totalPrice} 
                               onSuccess={successPaymentHandler}/>
                           )}

                       </ListGroup.Item>
                       )}
                       
                     
                   </ListGroup>
               </Card>
           </Col>
       </Row>
    </>
}

export default OrderScreen
