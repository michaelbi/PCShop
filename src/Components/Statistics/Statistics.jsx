import React, { useState, useEffect } from "react";
import {
  Toolbar,
  Paper,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { Pie, Line } from "react-chartjs-2";
import useStyles from "./styles";

const Statistics = () => {
  const [pieData, setPieData] = useState();
  const [dailySales, setdailySales] = useState();
  const [paid, setPaid] = useState("");
  const [refunded, setRefunded] = useState("");

  const classes = useStyles();

  useEffect(() => {
    const getOrders = async () => {
      const url = new URL("https://api.chec.io/v1/orders");

      let params = {
        limit: "100",
      };
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );

      let headers = {
        "X-Authorization": process.env.REACT_APP_CHEC_SECRET_KEY,
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const res = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const str = await res.json();

      let dic = {};

      console.log(str);

      let sum_paid = 0;
      let sum_refunded = 0;

      const date = new Date();
      const days = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDate();
      const days_array = [];

      for (let i = 1; i <= days; i++) {
        days_array.push(i);
      }

      const line_data = {
        labels: days_array,
        datasets: [
          {
            label: "Orders Made",
            data: days_array.map(() => 0),
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };

      str.data.forEach((up_item) => {
        const order_date = new Date(up_item.created * 1000);

        if (
          order_date.getMonth() === date.getMonth() &&
          order_date.getFullYear() === date.getFullYear()
        ) {
          line_data.datasets[0].data[order_date.getDate() - 1]++;

          if (up_item.status_payment === "paid") {
            sum_paid += parseFloat(
              up_item.order_value.formatted.replace(/,/g, "")
            );
          } else {
            sum_refunded += parseFloat(
              up_item.order_value.formatted.replace(/,/g, "")
            );
          }
        }

        up_item.order.line_items.forEach((sub_item) => {
          if (dic[sub_item.product_id]) {
            dic[sub_item.product_id].quantity =
              dic[sub_item.product_id].quantity + sub_item.quantity;
          } else {
            dic[sub_item.product_id] = {
              name: sub_item.product_name,
              quantity: sub_item.quantity,
            };
          }
        });
      });

      let t_pie = {
        labels: [],
        datasets: [
          {
            label: "# of Votes",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(96, 255, 170, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(96, 255, 170, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
      Object.keys(dic).forEach((key) => {
        t_pie.labels.push(dic[key].name.split(" ").splice(0, 3).join(" "));
        t_pie.datasets[0].data.push(dic[key].quantity);
      });

      setdailySales(line_data);
      setPieData(t_pie);
      setPaid(sum_paid.toLocaleString("en-US", { maximumFractionDigits: 2 }));
      setRefunded(
        sum_refunded.toLocaleString("en-US", { maximumFractionDigits: 2 })
      );
    };

    getOrders();
  }, []);

  const line_options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  return (
    <Paper className={classes.fullSpace} align="center">
      <Toolbar />
      <Grid
        container
        className={classes.fullSpace}
        spacing={3}
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} align="center" className={classes.fullSpace}>
          <Card>
            <CardContent style={{ background: "#4caf50" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ArrowUpwardIcon />
                <div
                  style={{
                    display: "flex",
                    flexFlow: "column nowrap",
                    alignItems: "flex-start",
                    padding: "0 15px",
                  }}
                >
                  <Typography variant="h6" color="textSecondary">
                    Paid This Month
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    ₪{paid}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} align="center" className={classes.fullSpace}>
          <Card>
            <CardContent style={{ background: "#f44336" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ArrowDownwardIcon />
                <div
                  style={{
                    display: "flex",
                    flexFlow: "column nowrap",
                    alignItems: "flex-start",
                    padding: "0 15px",
                  }}
                >
                  <Typography variant="h6" color="textSecondary">
                    Refunded This Month
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    ₪{refunded}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        justify="center"
        className={classes.fullSpace}
      >
        <Grid item xs={12} align="center">
          <Card className={classes.root}>
            <CardHeader title="Most Sold Items" />
            <CardContent>
              <Pie
                data={pieData}
                width={500}
                height={500}
                options={{ maintainAspectRatio: false }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} align="center">
          <Card className={classes.root}>
            <CardHeader title="Orders this month" />
            <CardContent>
              <Line
                data={dailySales}
                options={line_options}
                width={400}
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Statistics;
