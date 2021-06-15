import { makeStyles } from '@material-ui/core';

export default makeStyles((theme)=>({

    root:{
        [theme.breakpoints.down('sm')]:{
            maxWidth: '90%',
        },
        maxWidth: '80%',
    },

    fullSpace:{
        flexGrow:1,
        maxWidth: '100%',
    }

}))