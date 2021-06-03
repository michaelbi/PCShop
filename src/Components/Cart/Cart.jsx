import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Typography, Button, Grid} from '@material-ui/core';
import CartItem from './CartItem/CartItem';

import useStyles from './styles';

const Cart = ({cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart}) => {

    const isEmpty = !cart.total_items;
    const classes = useStyles();


    const EmptyCart = ()=>(
        <Typography variant='h3' color='textSecondary'>Your Cart Is Empty</Typography>
    );

    const FilledCart = ()=>(
        <>
        <Grid container spacing={3} alignContent='center'>
            {cart.line_items.map((item)=>
            (
            <Grid item key={item.id} xs={12} sm={4}>
                <CartItem item={item} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart}/>
            </Grid>
            ))}
        </Grid>

        <div className={classes.cardDetails}>
            <Typography variant='h4' color='inherit'>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
            <div>
                <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={onEmptyCart}>Empty Cart</Button>
                <Button component={Link} to='/checkout' className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary' >Checkout</Button>
            </div>
        </div>
        </>
    );

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography variant='h3' color='primary' gutterBottom>Your Shopping Cart</Typography>
            {isEmpty? <EmptyCart/> : <FilledCart/>}

            
        </Container>
    )
}

export default Cart
