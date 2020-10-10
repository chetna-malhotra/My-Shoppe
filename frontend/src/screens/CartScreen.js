import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import {addToCart,removeFromCart} from '../actions/cartActions'
import {Row,Col,Button,ListGroup,Form,Image,Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CartScreen = ({match,location,history}) => {
    const productId=match.params.id
    const qty=location.search?Number( location.search.split('=')[1]):1

const dispatch=useDispatch()
const cart=useSelector(state=>state.cart)

const {cartItems}=cart
useEffect(()=>{
    if(productId){
        dispatch(addToCart(productId,qty))
    }
    
},[dispatch,productId,qty])
const removeFromCartHandler=(id)=>{
dispatch(removeFromCart(id))
}
const checkouthandler=()=>{

}
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length===0?(
                <Message>Your cart is empty! <Link to='/'>Go back</Link></Message>):(
                <ListGroup variant='flush'>
                    {cartItems.map(x=>(
                        <ListGroup.Item key={x.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={x.image} alt={x.name} fluid rounded/>

                                </Col>
                                <Col md={3}>
                                <Link to={`/product/${x.product}`}>{x.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${x.price}
                                </Col>
                                <Col md={2}>
                                <Form.Control as='select' value={x.qty} onChange={(e)=>dispatch(addToCart(x.product,Number(e.target.value)))}>
                                    {
                                    [...Array(x.countInStock).keys()].map((y)=>(
                                        <option key={y+1} value={y+1}>
                                        {y+1}
                                        </option>
                                    ))
                                    }

                                </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button type='button' variant='light' onClick={()=>removeFromCartHandler(x.product)} >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                           <h2>Subtotal ({cartItems.reduce((acc,cur)=>acc+cur.qty,0)}) items</h2>
                           ${cartItems.reduce((acc,cur)=>acc+cur.price*cur.qty,0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length===0} onClick={checkouthandler}>
                                Proceed To Checkout

                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
            
        </Row>
    )
}

export default CartScreen
