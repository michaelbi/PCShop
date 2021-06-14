import React, {useState,useEffect} from 'react'
import {commerce} from './lib/commerce';
import {Navbar, Products, Cart, Checkout, ProductPage, Statistics} from './Components';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = () => {

    const [products,setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async ()=>{
        const {data} = await commerce.products.list();

        setProducts(data);
    };

    const fetchCart = async ()=>{
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async (product_id, quantity)=>{
        const item = await commerce.cart.add(product_id, quantity);

        setCart(item.cart);
    }

    const handleUpdateCartQty = async (lineItemId, quantity) => {
        const response = await commerce.cart.update(lineItemId, { quantity });
    
        setCart(response.cart);
      };
    
      const handleRemoveFromCart = async (lineItemId) => {
        const response = await commerce.cart.remove(lineItemId);
    
        setCart(response.cart);
      };
    
      const handleEmptyCart = async () => {
        const response = await commerce.cart.empty();
    
        setCart(response.cart);
      };

      const refreshCart = async ()=>{
          const newCart = await commerce.cart.empty();

          setCart(newCart);
      }

      const handleCaptureCheckout = async (checkoutTokenId, newOrder)=>{
          try {
              const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

              setOrder(incomingOrder);
              refreshCart();
          } catch (error) {
              setErrorMessage(error.data.error.message);
          }

      }

    useEffect(()=>{
        fetchProducts();
        fetchCart();

    },[]);

    return (
        <Router>
        <div>
            <Navbar totalItems={cart.total_items}/>
            <Switch>
                <Route exact path='/'>
                    <Products products={products} onAddToCart={handleAddToCart}/>
                </Route>
                <Route exact path='/p/:id'>
                    <ProductPage onAddToCart={handleAddToCart}/>
                </Route>
                <Route exact path='/cart'>
                    <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart}/>                
                </Route>
                <Route exact path='/checkout'>
                    <Checkout 
                    cart={cart}
                    order={order}
                    onCaptureCheckout={handleCaptureCheckout}
                    error={errorMessage}
                    />
                </Route>
                <Route exact path='/stats'>
                    <Statistics />
                </Route>
            </Switch>         
        </div>
        </Router>
    )
}

export default App;
