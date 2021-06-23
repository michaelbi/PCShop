import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    heading: {
        
        flexBasis: '33.33%',
        flexShrink: 0,
      },
      secondaryHeading: {
        alignSelf:'center',
      },
      container:{
        marginTop: '5%',
        width: 'auto',
        flexGrow:1,
        maxWidth:'100%',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      }


}));