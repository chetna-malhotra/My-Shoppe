import React from 'react'
import {Container} from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import CartScreen from './screens/CartScreen'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'

function App() {
  return (
    <Router>
    
      <Header/>
    <main className='py-3'>
      <Container>
        <Route path='/login' component={LoginScreen}/>
        <Route path='/placeorder'component={PlaceOrderScreen}/>
        <Route path='/shipping' component={ShippingScreen}/>
        <Route path='/payment' component={PaymentScreen}/>
        <Route path='/profile' component={ProfileScreen}/>
        <Route path='/register' component={RegisterScreen}/>
        <Route exact path='/' component={HomeScreen}/>
        <Route path='/product/:id' component={ProductScreen}/>
        <Route path='/cart/:id?' component={CartScreen} />
      </Container>
    </main>
     
     <Footer/>
  
    </Router>
  );
}

export default App;
