import React,{useState,useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {savePaymentMethod} from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({history}) => {
    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
    if(!shippingAddress){
        history.push('/shipping')
    }
    const [paymentMethod, setpaymentMethod] = useState('PayPal')
   
    const dispatch = useDispatch()
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer >
            <CheckoutSteps s1 s2 s3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>
            Select method
                </Form.Label>
           
            <Col>
            <Form.Check type='radio' label='PayPal or Credit Card' id='PayPal' 
            name='PaymentMethod'value={'PayPal'} checked
            onChange={e=>(setpaymentMethod(e.target.value))} >
            </Form.Check>
            <Form.Check type='radio' label='Stripe' id='stripe' 
            name='PaymentMethod'value={'stripe'} 
            onChange={e=>(setpaymentMethod(e.target.value))} >
            </Form.Check>
            </Col>
            </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue to Payment
                </Button>
        </Form>
           
        </FormContainer>
    )
}

export default PaymentScreen
