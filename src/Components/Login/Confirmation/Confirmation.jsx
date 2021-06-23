import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Typography, CircularProgress } from "@material-ui/core";

const Confirmation = ({ handleLogIn }) => {
  const history = useHistory();
  const [logged, setLogged] = useState(undefined);

  useEffect(() => {
    let func;

    const getToken = async () => {
      const loggedApi = await handleLogIn(
        history.location.pathname.split("/")[3]
      );

      setLogged(loggedApi);

      func = setTimeout(() => {
        if (loggedApi) {
          history.push("/customer");
        } else {
          history.push("/login");
        }
      }, 3000);
    };

    getToken();

    return () => {
      clearTimeout(func);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexFlow: "column nowrap",
      }}
    >
      {typeof logged === "undefined" && <CircularProgress />}

      {typeof logged !== "undefined" &&
        (logged ? (
          <Typography variant="h4" color="inherit" gutterBottom>
            Login Successful
          </Typography>
        ) : (
          <Typography variant="h4" color="inherit" gutterBottom>
            Login Failed
          </Typography>
        ))}

      {typeof logged !== "undefined" && (
        <Typography variant="body1" color="inherit">
          You'll Be Redirected in <small>3s</small>
        </Typography>
      )}
    </div>
  );
};

export default Confirmation;
