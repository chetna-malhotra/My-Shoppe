
import {getUserDetails,updateUserProfile} from '../actions/userActions'
import React,{useState,useEffect} from 'react'
//import {Link, Redirect} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Row,Col} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'



const ProfileScreen = ({location,history}) => {

    const [name, setname] = useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [message, setmessage] = useState(null)
    const dispatch=useDispatch()
    const userDetails=useSelector(state=>state.userDetails)
    const {loading,error,user}=userDetails
    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin
    const userUpdateProfile=useSelector(state=>state.userUpdateProfile)
    const {success}=userUpdateProfile
    


    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user.name)
            {
                dispatch(getUserDetails('profile'))
            }else{
                setname(user.name)
                setEmail(user.email)
            }

        }
    },[history,userInfo,dispatch,user])
    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!==confirmPassword)
            setmessage('Passwords do not match.')
        else
            {
                dispatch(updateUserProfile({id:user._id,name,email,password}))
            }
    }
    return (
       <Row>
           <Col md={3}>
           <h1>User Profile</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated!{success}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e)=>setname(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmpassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password again' value={confirmPassword} onChange={(e)=>setconfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
           </Col>
           <Col md={9}>
               <h2>My orders</h2>
           </Col>
       </Row>
    )
}

export default ProfileScreen

