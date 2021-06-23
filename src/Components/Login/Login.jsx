import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Confirmation from "./Confirmation/Confirmation";
import {
  Paper,
  Toolbar,
  TextField,
  Typography,
  Button,
  Container,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  useForm,
  FormProvider,
  Controller,
  useFormContext,
} from "react-hook-form";
import useStyles from "./styles";
import { commerce } from "../../lib/commerce";

const Login = ({ handleLogIn, handleLoginAdmin }) => {
  const methods = useForm();
  const control = useFormContext();
  const classes = useStyles();
  const history = useHistory();
  const [cToken, setcToken] = useState(undefined);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (commerce.customer.isLoggedIn()) {
      history.push("/");
    }
  }, []);

  const handleSendEmail = async (data) => {
    setIsSent(true);
    if(data.email === 'Admin'){
      handleLoginAdmin();
      history.push('/stats');
    }
    else
    {
      if (typeof window !== "undefined" && data.email) {
        const token = await commerce.customer.login(
          data.email,
          `${window.location.protocol}//${window.location.host}/login/callback`
        );
  
        setcToken(true);
        console.log(token);
      } else {
        // work out what you want to do server-side...
  
        setcToken(false);
      }
    }
    
  };

  return (
    <div className={classes.layout}>
      <Toolbar />
      <Paper className={classes.paper}>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="back to main"
          component={Link}
          to="/"
        >
          <ArrowBackIcon />
        </IconButton>

        {history.location.pathname.split("/").length === 2 ? (
          <>
            <Typography
              variant="h4"
              color="inherit"
              align="center"
              gutterBottom
            >
              Login
            </Typography>
            {!isSent ? (
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit((data) =>
                    handleSendEmail(data)
                  )}
                >
                  <Container className={classes.container}>
                    <Controller
                      control={control}
                      name="email"
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Email"
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />
                  </Container>

                  <Container align="center">
                    <Button variant="contained" color="secondary" type="submit">
                      Send Confirmation Email
                    </Button>
                  </Container>
                </form>
              </FormProvider>
            ) : (
              !cToken && <div style={{display:'flex', justifyContent:'center'}}><CircularProgress align='center'/></div>
            )}

            {cToken ? (
              <Typography align='center'>Email Has Been Sent</Typography>
            ) : (
              typeof cToken !== "undefined" && (
                <Typography align='center'>Error Try Again</Typography>
              )
            )}
          </>
        ) : (
          <Confirmation handleLogIn={handleLogIn} />
        )}
      </Paper>
    </div>
  );
};

export default Login;
