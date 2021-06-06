import React, {useState, useEffect} from 'react';
import {Paper, Stepper, Step, StepLabel,Typography, Divider, CircularProgress, Button, CssBaseline} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import {commerce} from '../../../lib/commerce';


const Checkout = ({cart, order, onCaptureCheckout, error}) => {

    const [activeStep, setActivestep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState('');
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (cart.id) {
          const generateToken = async () => {
            try {
              const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
    
              setCheckoutToken(token);
            } catch (error){
              history.pushState('/');
            }
          };
    
          generateToken();
        }
      }, [cart]);

      const next = (data)=>{
        setShippingData(data);

        nextStep();
    }

    const nextStep = ()=>{setActivestep( (prev) => prev + 1)}
    const backStep = ()=>{setActivestep( (prev) => prev - 1)}

    const Form = ()=>(
        activeStep ===0 ? <AddressForm checkoutToken={checkoutToken} next={next}/>:
                          <PaymentForm 
                          shippingData={shippingData} 
                          checkoutToken={checkoutToken} 
                          back={backStep}
                          onCaptureCheckout={onCaptureCheckout}
                          nextStep={nextStep}
                          />
    )

    const steps = ['Shipping Address', 'Payment details'];

let Confirmation = ()=> order.customer ?(
    <>
        <div>
            <Typography variant='h6'>Thank You For Your Purchase {order.customer.firstname} {order.customer.lastname}</Typography>
            <Divider className={classes.divider}/>
            <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
        </div>
        <br/>
        <Button component={Link} to='/' variant='outlined' type='button'>Continue Shopping</Button>
    </>
):
(
    <div className={classes.spinner}>
            <CircularProgress/>
        </div>
)

if(error)
{
    Confirmation = ()=>(
        <>
            <Typography variant='h5'>Error: {error}</Typography>
            <br/>
            <Button component={Link} to='/' variant='outlined' type='button'>Continue Shopping</Button>
        </>
    )
}

    return (
        <>
        <CssBaseline/>
        <div className={classes.toolbar}/>
        <div className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant='h4' align='center'>Checkout</Typography>

                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step)=>(
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length? <Confirmation/>: checkoutToken && <Form/>}
            </Paper>
        </div>
            
        </>
    )
}

export default Checkout
