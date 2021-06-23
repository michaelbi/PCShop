import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    // maxWidth: 345, original width style
    maxWidth: '345px',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignSelf: 'center',
    
  },
  media: {
    paddingTop:'56.25%',
  },
  btn: {
      margin: '5px',
  },

  gridroot:{
    flexGrow: 1,
    maxWidth: '100%',
  }
}));