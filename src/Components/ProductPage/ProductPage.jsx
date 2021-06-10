import React, { useEffect, useState } from 'react';
import {
  Card, Grid, Toolbar, Button,
  Accordion, AccordionSummary,
  AccordionDetails, Typography,
  CircularProgress, CardMedia,
  CardHeader, Divider,
  Paper
} from '@material-ui/core';
import { AddShoppingCartOutlined } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
import useStyles from './styles';
import Product from '../Products/Product/Product';


const ProductPage = ({onAddToCart}) => {

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const classes = useStyles();

  const getProduct = async (_id) => {

    const p = await commerce.products.retrieve(_id);

    console.log(p);
    setProduct(p);

  }

  useEffect(() => {

    getProduct(id);

  }, [id]);

  return (
    <Paper className={classes.gridroot}>
      <Toolbar />
      {product.media ? (
        <>
        <Grid container alignContent='center' spacing={3} className={classes.gridroot}>
          <Grid item xs={12} sm={7} alignContent='center'>
            <Card className={classes.root}>
              <CardHeader
                title={product.name}
              />
              <CardMedia className={classes.media} image={product.media.source} alt={`product: ${product.name}`} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} alignItems='center' alignContent='center'>
            
              <Accordion>
                <AccordionSummary
                  expandIcon={'+'}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography >Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography align='right' dangerouslySetInnerHTML={{ __html: product.description }} />
                </AccordionDetails>
              </Accordion>
              <Button color='primary' size='large'
                type='button' variant='contained'
                endIcon={<AddShoppingCartOutlined />}
                onClick={()=>onAddToCart(product.id,1)}
                className={classes.btn}
                >
                Add To Cart
                            </Button>
          
          </Grid>
        </Grid>

        <br/>
        <br/>
        <Divider/>
        <br/>
        <br/>

        <Typography variant='h5' gutterBottom color='secondary'>Related items</Typography>
        <Grid container spacing={3} className={classes.gridroot}>
            {
              product.related_products.map((item)=>(
                <Grid item xs={12} sm={2}>
                    <Product product={item} onAddToCart={onAddToCart}/>
                </Grid>
              ))
            }
        </Grid>
        </>
      ) : (
        <div style={{ display: 'flex', width: '100%', alignContent: 'center' }}>
          <CircularProgress style={{ margin: '5px auto' }} />
        </div>
      )}

    </Paper>
  )
}

export default ProductPage
