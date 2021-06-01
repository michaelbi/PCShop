import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';
import useStyles from './styles';

const Product = ({product}) => {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} title={product.name} image={product.media.source}/>

            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant='h5' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant='h5'>
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography variant='body2' align='right' color='textSecondary' noWrap='true' dangerouslySetInnerHTML={{__html: product.description}}/>
            </CardContent>

            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label='add to shopping cart'>
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
            
        </Card>
    )
}

export default Product
