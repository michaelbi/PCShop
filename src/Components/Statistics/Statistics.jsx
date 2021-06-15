import React, {useState,useEffect} from 'react';
import {Toolbar,Paper,Grid, Card,CardHeader,CardContent} from '@material-ui/core';
import { Pie, Line } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';
import useStyles from './styles';

const Statistics = () => {

    const [pieData, setPieData] = useState();
    const [dailySales, setdailySales] = useState();

    const classes = useStyles();

    useEffect(()=>{
        const getOrders = async ()=>{

            const url = new URL(
                "https://api.chec.io/v1/orders"
            );
            
            let params = {
                "limit": "100",
            };
            Object.keys(params)
                .forEach(key => url.searchParams.append(key, params[key]));
            
            let headers = {
                "X-Authorization": process.env.REACT_APP_CHEC_SECRET_KEY,
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            
            const res = await fetch(url, {
                method: "GET",
                headers: headers,
            })

            const str = await res.json();

            let dic = {};

            const date = new Date();
            const days = new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
            const days_array = [];

            for (let i = 1; i <= days; i++) {
                days_array.push(i);
            }

            const line_data = {
                labels: days_array,
                datasets: [
                  {
                    label: 'Orders Made',
                    data: days_array.map(()=>0),
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.5)',
                  },
                ],
              };

              
            str.data.forEach((up_item)=>{

                const order_date = new Date(up_item.created*1000);
                
                if(order_date.getMonth() === date.getMonth() && order_date.getFullYear() === date.getFullYear()){
                    line_data.datasets[0].data[order_date.getDate()]++;
                }

                up_item.order.line_items.forEach((sub_item)=>{
                    if(dic[sub_item.product_id])
                    {
                        dic[sub_item.product_id].quantity=dic[sub_item.product_id].quantity+ sub_item.quantity;   
                    }
                    else{
                        dic[sub_item.product_id] = {name: sub_item.product_name, quantity: sub_item.quantity}
                    }
                })
            })

            console.log(line_data.labels);

            let t_pie = {
                labels: [],
            datasets: [
          {
            label: '# of Votes',
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(96, 255, 170, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(96, 255, 170, 1)',
            ],
            borderWidth: 1,
          },
        ],

            }
            Object.keys(dic).forEach((key)=>{
                t_pie.labels.push(dic[key].name.split(" ").splice(0,3).join(" "));
                t_pie.datasets[0].data.push(dic[key].quantity);
            })
           

            setdailySales(line_data);
            setPieData(t_pie);

        }

        getOrders();
    },[])

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
        <Paper className={classes.fullSpace}>
            <Toolbar/>
            <Grid container spacing={3} justify='center' className={classes.fullSpace}>
                <Grid item xs={12} align="center">
                    <Card className={classes.root}>
                        <CardHeader 
                        title= 'Most Sold Items'
                        />
                    <CardContent>
                        <Pie data={pieData} width={500}
	height={500}
	options={{ maintainAspectRatio: false }}/>
                    </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} align="center">
                <Card className={classes.root}>
                <CardHeader 
                        title= 'Orders this month'
                        />
                        <CardContent>
                    <Line data={dailySales} options={line_options} width={400}
	height={300}/>
                    </CardContent>

                    </Card>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Statistics
