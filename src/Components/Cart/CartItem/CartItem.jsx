import React from 'react';
import { Card, CardMedia, CardActions, Button, CardContent, Typography } from '@material-ui/core';
import useStyles from './styles';

const CartItem = ({ item ,onUpdateCartQty, onRemoveFromCart}) => {
    console.log(item);
    const classes = useStyles();
    return (
        <Card className='cart-item'>
            <CardMedia image={item.media.source} title={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4" noWrap>{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={()=>onUpdateCartQty(item.id,item.quantity - 1)}>-</Button>
                    <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
                    <Button type="button" size="small" onClick={()=>onUpdateCartQty(item.id,item.quantity + 1)}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" 
                onClick={()=>onRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
