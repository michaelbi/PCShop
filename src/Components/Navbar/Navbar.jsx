import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import useStyles from './styles';
import logo from '../../assets/logo.png';

const Navbar = () => {

    const classes = useStyles();
    return (
        <>
            <AppBar position='fixed' color='inherit' className={classes.appBar}>
                <Toolbar>
                    <Typography variant='h6' color='inherit' className={classes.title}>
                        <img src={logo} alt='PC Shop' height='25px' className={classes.image}/>
                        PC Shop
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.button}>
                        <IconButton>
                            <Badge badgeContent={2} color='secondary'>
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
