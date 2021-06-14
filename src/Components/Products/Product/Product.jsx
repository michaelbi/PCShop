import React from 'react';
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton, CardActionArea} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';
import useStyles from './styles';
import {useHistory} from 'react-router-dom';

const Product = ({product, onAddToCart}) => {

    const classes = useStyles();
    const history = useHistory();

    return (
        <Card className={classes.root} >
            <CardActionArea onClick={()=>history.push(`/p/${product.id}`)}>
            <CardMedia className={classes.media} title={product.name} image={product.media.source}/>

            <CardContent>
                    <Typography className={classes.typoLink} variant='h5' gutterBottom noWrap >
                        {product.name}
                    </Typography>
                    <Typography variant='body2' align='right' color='textSecondary' 
                                noWrap dangerouslySetInnerHTML={{__html: product.description}}/>
                    <Typography variant='h5' align='right' color='secondary'>
                        {product.price.formatted_with_symbol}
                    </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label='add to shopping cart' onClick={()=>onAddToCart(product.id,1)}>
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
            
            
        </Card>
    )
}

export default Product
