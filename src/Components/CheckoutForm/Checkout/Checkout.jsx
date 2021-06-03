import React, {useState} from 'react';
import {Paper, Stepper, Step, StepLabel,Typography,Button,CircularProgress,Divider} from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps = ['Shipping Address', 'Payment details'];

const Confirmation = ()=> (
    <div>
        Confirmation
    </div>
)


const Checkout = () => {

    const [activeStep, setActivestep] = useState(0);
    const classes = useStyles();

    const Form = ()=>(
        activeStep ===0 ? <AddressForm/>:<PaymentForm/>
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
                {activeStep === steps.length? <Confirmation/>:<Form/>}
            </Paper>
        </div>
            
        </>
    )
}

export default Checkout