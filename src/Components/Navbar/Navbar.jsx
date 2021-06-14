import React,{useState} from 'react';
import {AppBar, Toolbar, IconButton, Badge, Typography, Menu, MenuItem} from '@material-ui/core';
import {ShoppingCart, AccountCircle} from '@material-ui/icons';
import useStyles from './styles';
import logo from '../../assets/logo.png';
import {Link, useHistory} from 'react-router-dom';

const Navbar = ({totalItems}) => {

    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
      };

      const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>{handleMenuClose(); history.push('/stats');}}>Stats</MenuItem>
    </Menu>
  );

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
                        <IconButton edge='end' color="inherit" aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              >
                            <AccountCircle/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </>
    )
}

export default Navbar
