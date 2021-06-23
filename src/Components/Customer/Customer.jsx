import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { commerce } from "../../lib/commerce";
import { ExpandMore } from "@material-ui/icons";
import {
  Paper,
  Toolbar,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Divider,
  CircularProgress,
} from "@material-ui/core";

const Customer = () => {
  const [orders, setOrders] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const getOrders = async () => {
      if (commerce.customer.isLoggedIn()) {
        const customer = commerce.customer.id();
        const orders = await commerce.customer.getOrders(customer);

        setOrders(orders.data.data);
      }
    };

    getOrders();
  }, []);

  return (
    <Paper align="center">
      <Toolbar />
      
      
      <Container align="left" className={classes.container}>
        <Typography variant="h4" color="inherit" gutterBottom align="center">
          Orders
        </Typography>
        {orders.length === 0 && (
        <div style={{display:'flex', justifyContent:'center', paddingBottom:'20px'}}>
          <br/>
        <CircularProgress/>
        
      </div>
      )}
        {orders.map((order) => (
          <Accordion key={order.id}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.heading}
              >
                {new Date(order.created * 1000).toLocaleDateString()}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                className={classes.secondaryHeading}
              >
                {order.order_value.formatted_with_symbol}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                {order.order.line_items &&
                  order.order.line_items.map((item) => (
                    <Grid key={item.id} sm={12} item>
                      <Typography variant="body1" color="inherit">
                        {item.product_name}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        quantity: {item.quantity}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        price: {item.line_total.formatted_with_symbol}
                      </Typography>
                    </Grid>
                  ))}

                <Grid item sm={12}>
                  <Divider />
                  <br />
                  <Typography variant="body1" color="inherit">
                    Shipping
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Type: {order.shipping.name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Country: {order.shipping.country}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    City: {order.shipping.town_city}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Street: {order.shipping.street}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    ZIP/POSTAL CODE: {order.shipping.postal_zip_code}
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  <Divider />
                  <br />
                  <Typography variant="body1" color="inherit">
                    Status
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Paid: {order.status_payment.replace("_", " ").toUpperCase()}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Delivered:{" "}
                    {order.status_fulfillment.replace("_", " ").toUpperCase()}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Paper>
  );
};

export default Customer;
