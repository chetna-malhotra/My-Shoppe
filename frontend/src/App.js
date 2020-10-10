import React from 'react'
import {Container} from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import CartScreen from './screens/CartScreen'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import {BrowserRouter as Router,Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    
      <Header/>
    <main className='py-3'>
      <Container>
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
