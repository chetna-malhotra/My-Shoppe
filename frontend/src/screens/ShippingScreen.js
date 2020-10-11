import React,{useState,useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {saveShippingAddress} from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({history}) => {
    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
    const [address, setaddress] = useState(shippingAddress.address)
    const [city, setcity] = useState(shippingAddress.city)

    const [postalCode, setpostalCode] = useState(shippingAddress.postalCode)

    const [country,setCountry] = useState(shippingAddress.country)
    const dispatch = useDispatch()
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps s1 s2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' placeholder='' value={address} onChange={(e)=>setaddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' placeholder='' value={city} onChange={(e)=>setcity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type='text' placeholder='' value={postalCode} onChange={(e)=>setpostalCode(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' placeholder='' value={country} onChange={(e)=>setCountry(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue to Payment
                </Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
