import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import useStyles from './styles';
import logo from '../../assets/logo.png';
import {Link, useLocation} from 'react-router-dom';

const Navbar = ({totalItems}) => {

    const classes = useStyles();
    return (
        <>
            <AppBar position='fixed' color='inherit' className={classes.appBar}>
                <Toolbar>
                    <Typography variant='h6' color='inherit' className={classes.title} component={Link} to="/">
                        <img src={logo} alt='PC Shop' height='25px' className={classes.image}/>
                        PC Shop
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color='secondary'>
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
