import React, {useState, useEffect} from 'react';
import {Paper, Stepper, Step, StepLabel,Typography} from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import {commerce} from '../../../lib/commerce';

const steps = ['Shipping Address', 'Payment details'];

const Confirmation = ()=> (
    <div>
        Confirmation
    </div>
)


const Checkout = ({cart}) => {

    const [activeStep, setActivestep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState('');
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();

    useEffect(() => {
        if (cart.id) {
          const generateToken = async () => {
            try {
              const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
    
              setCheckoutToken(token);
            } catch {
              
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
                          <PaymentForm setShippingData={setShippingData} checkoutToken={checkoutToken} back={backStep}/>
    )

    return (
        <>
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
