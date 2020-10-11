import React,{useState,useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap'
import {createOrder} from '../actions/orderActions'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = ({history}) => {
    const cart=useSelector(state=>state.cart)
    cart.itemsPrice=cart.cartItems.reduce((acc,items)=>acc+items.price*items.qty,0)
    cart.shippingPrice=cart.cartItems.reduce((acc,items)=>acc+2.5*items.qty,0)

    cart.taxPrice=Number((0.15)*cart.itemsPrice).toFixed(2)
    cart.totalPrice=(Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice)).toFixed(2)
const dispatch = useDispatch()
const orderCreate=useSelector(state=>state.orderCreate)
const {order,success,error}=orderCreate
useEffect(() => {
    if(success){
        history.push(`/order/${order._id}`)
    }
    
}, [history,success])
    const placeOrderHandler=()=>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice
        }))
    }
    return (
       <>
       <CheckoutSteps s1 s2 s3 s4/>
       <Row>
           <Col md={8}>
               <ListGroup variant='flush'>
                   <ListGroup.Item >
                       <h2>
                           Shipping
                       </h2>
                       <p><strong>Address:</strong>
    {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}</p>
                   </ListGroup.Item>
                   <ListGroup.Item>
                       <h2>
                           Payment method
                       </h2>
                       <p><strong>Chosen Method:</strong>
                        {cart.paymentMethod}</p>
                   </ListGroup.Item>
                   <ListGroup.Item>
                       <h2>
                           Order Items
                       </h2>
                       {cart.cartItems.length===0 ?<Message>Your cart is empty!</Message>:
                       (
                    <ListGroup variant='flush'>
                        {cart.cartItems.map((item,index)=>(
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
                                        {item.qty}*${item.price}=${item.qty*item.price}
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
                               <Col>${cart.itemsPrice}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col>Shipping</Col>
                               <Col>${cart.shippingPrice}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col>Tax</Col>
                               <Col>${cart.taxPrice}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col>Total Price</Col>
                               <Col>${cart.totalPrice}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           {error &&<Message variant='danger'>{error}</Message>}
                       </ListGroup.Item>
                       <ListGroup.Item>
                          <Button type='button' className='btn-block' disabled={cart.cartItems===0} onClick={placeOrderHandler}>
                              Place Order
                          </Button>
                       </ListGroup.Item>
                   </ListGroup>
               </Card>
           </Col>
       </Row>
       </>
    )
}

export default PlaceOrderScreen
