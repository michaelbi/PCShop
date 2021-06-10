import React from 'react';
import { Link } from 'react-router-dom';
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';
import useStyles from './styles';

const Product = ({product, onAddToCart}) => {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} title={product.name} image={product.media.source}/>

            <CardContent>
                    <Typography className={classes.typoLink} variant='h5' gutterBottom noWrap component={Link} to={`/p/${product.id}`}>
                        {product.name}
                    </Typography>
                    <Typography variant='body2' align='right' color='textSecondary' 
                                noWrap dangerouslySetInnerHTML={{__html: product.description}}/>
                    <Typography variant='h5' align='right' color='secondary'>
                        {product.price.formatted_with_symbol}
                    </Typography>
            </CardContent>

            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label='add to shopping cart' onClick={()=>onAddToCart(product.id,1)}>
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
            
        </Card>
    )
}

export default Product
