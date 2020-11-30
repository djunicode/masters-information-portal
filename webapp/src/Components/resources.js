import React from 'react';
import { makeStyles, useTheme ,withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import ToggleButton from '@material-ui/lab/ToggleButton';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
const useStyles1 = makeStyles(theme => ({
  root: {
    flexGrow:1,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  search:{
      width:'300px',
      textAlign:"center",
      backgroundColor:"#F8F8F8",
      display:"flex",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  icon:{
    margin: 0,
 top: 'auto',
 right: 20,
 bottom: 20,
 left: 'auto',
 position: 'fixed',
 },
}));




const useStyles = makeStyles(theme => ({
    root:{
        flexGrow:1,
        height:"100vh",
        background:"none",
        marginLeft:"50px",
        marginRight:"50px",


    },
    card:{
        width:'300px',
        minHeight:'250px',
        margin:"20px",
    },

    title:{
      fontSize:'25px',
      fontWeight:'bold',
      float:"left"
    },
    username:{
      float:"left",
      marginLeft:"5px",
      paddingTop:"8px",
      fontWeight:"bold",
    },
    image:{
      float:"left",
    },
   
  
}));

function All() {
  const classes=useStyles();
  return(
        <Paper elevation={0} className={classes.root}>
          
          <Grid container spacing={6}>
            <Grid item xs={4}>
            <Card className={classes.card} raised="true">
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="ABC" align="left"/>
            <Typography className={classes.username}>ABC</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            <Card className={classes.card} raised="true">
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="ABC"  align="left"/>
            <Typography className={classes.username}>ABC</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            <Card className={classes.card} raised="true">
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="ABC" align="left"/>
            <Typography className={classes.username}>ABC</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card className={classes.card} raised="true">
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="DEF" align="left"/>
            <Typography className={classes.username}>DEF</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            <Card className={classes.card} raised="true"> 
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="DEF" align="left"/>
            <Typography className={classes.username}>DEF</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            <Card className={classes.card} raised="true"> 
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="DEF" align="left"/>
            <Typography className={classes.username}>DEF</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card className={classes.card} raised="true"> 
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="GHI"  align="left"/>
            <Typography className={classes.username}>GHI</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            <Card className={classes.card} raised="true"> 
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="GHI" align="left"/>
            <Typography className={classes.username}>GHI</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            <Card className={classes.card} raised="true"> 
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="GHI"  align="left"/>
            <Typography className={classes.username}>GHI</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            </Grid>
         </Grid>
       
        </Paper>
  );
};


const  New=(props)=>{
  const classes=useStyles();
  return(
    <Paper elevation={0} className={classes.root}>
          
    <Grid container spacing={6}>
      <Grid item xs={4}>
      <Card className={classes.card} raised="true">
      <CardContent>
      <Typography className={classes.title} gutterBottom>
         Title
      </Typography><br /><br />
      <Avatar className={classes.image} alt="ABC" align="left"/>
      <Typography className={classes.username}>ABC</Typography><br /> <br />
      <Typography variant="body1" align="left">
      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
      </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" color="primary">
          Resource Link
        </Button>
      </CardActions>
      </Card>
      <Card className={classes.card} raised="true">
      <CardContent>
      <Typography className={classes.title} gutterBottom>
         Title
      </Typography><br /><br />
      <Avatar className={classes.image} alt="ABC"  align="left"/>
      <Typography className={classes.username}>ABC</Typography><br /> <br />
      <Typography variant="body1" align="left">
      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
      </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" color="primary">
          Resource Link
        </Button>
      </CardActions>
      </Card>
      <Card className={classes.card} raised="true">
      <CardContent>
      <Typography className={classes.title} gutterBottom>
         Title
      </Typography><br /><br />
      <Avatar className={classes.image} alt="ABC" align="left"/>
      <Typography className={classes.username}>ABC</Typography><br /> <br />
      <Typography variant="body1" align="left">
      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
      </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" color="primary">
          Resource Link
        </Button>
      </CardActions>
      </Card>
      </Grid>
      <Grid item xs={4}>
      <Card className={classes.card} raised="true">
      <CardContent>
      <Typography className={classes.title} gutterBottom>
         Title
      </Typography><br /><br />
      <Avatar className={classes.image} alt="DEF" align="left"/>
      <Typography className={classes.username}>DEF</Typography><br /> <br />
      <Typography variant="body1" align="left">
      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
      </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" color="primary">
          Resource Link
        </Button>
      </CardActions>
      </Card>
      <Card className={classes.card} raised="true"> 
      <CardContent>
      <Typography className={classes.title} gutterBottom>
         Title
      </Typography><br /><br />
      <Avatar className={classes.image} alt="DEF" align="left"/>
      <Typography className={classes.username}>DEF</Typography><br /> <br />
      <Typography variant="body1" align="left">
      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
      </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" color="primary">
          Resource Link
        </Button>
      </CardActions>
      </Card>
      <Card className={classes.card} raised="true"> 
      <CardContent>
      <Typography className={classes.title} gutterBottom>
         Title
      </Typography><br /><br />
      <Avatar className={classes.image} alt="DEF" align="left"/>
      <Typography className={classes.username}>DEF</Typography><br /> <br />
      <Typography variant="body1" align="left">
      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
      </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" color="primary">
          Resource Link
        </Button>
      </CardActions>
      </Card>
      </Grid>
      <Grid item xs={4}>
      <Card className={classes.card} raised="true"> 
      <CardContent>
      <Typography className={classes.title} gutterBottom>
         Title
      </Typography><br /><br />
      <Avatar className={classes.image} alt="GHI"  align="left"/>
      <Typography className={classes.username}>GHI</Typography><br /> <br />
      <Typography variant="body1" align="left">
      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
      </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" color="primary">
          Resource Link
        </Button>
      </CardActions>
      </Card>
      <Card className={classes.card} raised="true"> 
      <CardContent>
      <Typography className={classes.title} gutterBottom>
         Title
      </Typography><br /><br />
      <Avatar className={classes.image} alt="GHI" align="left"/>
      <Typography className={classes.username}>GHI</Typography><br /> <br />
      <Typography variant="body1" align="left">
      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
      </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" color="primary">
          Resource Link
        </Button>
      </CardActions>
      </Card>
      <Card className={classes.card} raised="true"> 
      <CardContent>
      <Typography className={classes.title} gutterBottom>
         Title
      </Typography><br /><br />
      <Avatar className={classes.image} alt="GHI"  align="left"/>
      <Typography className={classes.username}>GHI</Typography><br /> <br />
      <Typography variant="body1" align="left">
      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
      </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" color="primary">
          Resource Link
        </Button>
      </CardActions>
      </Card>
      </Grid>
   </Grid>
  
  </Paper>
);
};

const  Books=(props)=>{
    const classes=useStyles();
    return(
      <Paper elevation={0} className={classes.root}>
          
          <Grid container spacing={6}>
            <Grid item xs={4}>
            <Card className={classes.card} raised="true">
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="ABC" align="left"/>
            <Typography className={classes.username}>ABC</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            <Card className={classes.card} raised="true">
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="ABC"  align="left"/>
            <Typography className={classes.username}>ABC</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            <Card className={classes.card} raised="true">
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="ABC" align="left"/>
            <Typography className={classes.username}>ABC</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card className={classes.card} raised="true">
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="DEF" align="left"/>
            <Typography className={classes.username}>DEF</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            <Card className={classes.card} raised="true"> 
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="DEF" align="left"/>
            <Typography className={classes.username}>DEF</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            <Card className={classes.card} raised="true"> 
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="DEF" align="left"/>
            <Typography className={classes.username}>DEF</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card className={classes.card} raised="true"> 
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="GHI"  align="left"/>
            <Typography className={classes.username}>GHI</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            <Card className={classes.card} raised="true"> 
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="GHI" align="left"/>
            <Typography className={classes.username}>GHI</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            <Card className={classes.card} raised="true"> 
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="GHI"  align="left"/>
            <Typography className={classes.username}>GHI</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            </Grid>
         </Grid>
        
        </Paper>
  );
};


const  Lists=(props)=>{
    const classes=useStyles();
    return(
      <Paper elevation={0} className={classes.root}>
          
      <Grid container spacing={6}>
        <Grid item xs={4}>
        <Card className={classes.card} raised="true">
        <CardContent>
        <Typography className={classes.title} gutterBottom>
           Title
        </Typography><br /><br />
        <Avatar className={classes.image} alt="ABC" align="left"/>
        <Typography className={classes.username}>ABC</Typography><br /> <br />
        <Typography variant="body1" align="left">
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
        </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium" color="primary">
            Resource Link
          </Button>
        </CardActions>
        </Card>
        <Card className={classes.card} raised="true">
        <CardContent>
        <Typography className={classes.title} gutterBottom>
           Title
        </Typography><br /><br />
        <Avatar className={classes.image} alt="ABC"  align="left"/>
        <Typography className={classes.username}>ABC</Typography><br /> <br />
        <Typography variant="body1" align="left">
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
        </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium" color="primary">
            Resource Link
          </Button>
        </CardActions>
        </Card>
        <Card className={classes.card} raised="true">
        <CardContent>
        <Typography className={classes.title} gutterBottom>
           Title
        </Typography><br /><br />
        <Avatar className={classes.image} alt="ABC" align="left"/>
        <Typography className={classes.username}>ABC</Typography><br /> <br />
        <Typography variant="body1" align="left">
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
        </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium" color="primary">
            Resource Link
          </Button>
        </CardActions>
        </Card>
        </Grid>
        <Grid item xs={4}>
        <Card className={classes.card} raised="true">
        <CardContent>
        <Typography className={classes.title} gutterBottom>
           Title
        </Typography><br /><br />
        <Avatar className={classes.image} alt="DEF" align="left"/>
        <Typography className={classes.username}>DEF</Typography><br /> <br />
        <Typography variant="body1" align="left">
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
        </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium" color="primary">
            Resource Link
          </Button>
        </CardActions>
        </Card>
        <Card className={classes.card} raised="true"> 
        <CardContent>
        <Typography className={classes.title} gutterBottom>
           Title
        </Typography><br /><br />
        <Avatar className={classes.image} alt="DEF" align="left"/>
        <Typography className={classes.username}>DEF</Typography><br /> <br />
        <Typography variant="body1" align="left">
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
        </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium" color="primary">
            Resource Link
          </Button>
        </CardActions>
        </Card>
        <Card className={classes.card} raised="true"> 
        <CardContent>
        <Typography className={classes.title} gutterBottom>
           Title
        </Typography><br /><br />
        <Avatar className={classes.image} alt="DEF" align="left"/>
        <Typography className={classes.username}>DEF</Typography><br /> <br />
        <Typography variant="body1" align="left">
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
        </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium" color="primary">
            Resource Link
          </Button>
        </CardActions>
        </Card>
        </Grid>
        <Grid item xs={4}>
        <Card className={classes.card} raised="true"> 
        <CardContent>
        <Typography className={classes.title} gutterBottom>
           Title
        </Typography><br /><br />
        <Avatar className={classes.image} alt="GHI"  align="left"/>
        <Typography className={classes.username}>GHI</Typography><br /> <br />
        <Typography variant="body1" align="left">
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
        </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium" color="primary">
            Resource Link
          </Button>
        </CardActions>
        </Card>
        <Card className={classes.card} raised="true"> 
        <CardContent>
        <Typography className={classes.title} gutterBottom>
           Title
        </Typography><br /><br />
        <Avatar className={classes.image} alt="GHI" align="left"/>
        <Typography className={classes.username}>GHI</Typography><br /> <br />
        <Typography variant="body1" align="left">
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
        </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium" color="primary">
            Resource Link
          </Button>
        </CardActions>
        </Card>
        <Card className={classes.card} raised="true"> 
        <CardContent>
        <Typography className={classes.title} gutterBottom>
           Title
        </Typography><br /><br />
        <Avatar className={classes.image} alt="GHI"  align="left"/>
        <Typography className={classes.username}>GHI</Typography><br /> <br />
        <Typography variant="body1" align="left">
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
        </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium" color="primary">
            Resource Link
          </Button>
        </CardActions>
        </Card>
        </Grid>
     </Grid>
     
    </Paper>
  );
};

const  Forms=(props)=>{
    const classes=useStyles();
    return(
      <Paper elevation={0} className={classes.root}>
          
          <Grid container spacing={6}>
            <Grid item xs={4}>
            <Card className={classes.card} raised="true">
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="ABC" align="left"/>
            <Typography className={classes.username}>ABC</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            <Card className={classes.card} raised="true">
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="ABC"  align="left"/>
            <Typography className={classes.username}>ABC</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            <Card className={classes.card} raised="true">
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="ABC" align="left"/>
            <Typography className={classes.username}>ABC</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card className={classes.card} raised="true">
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="DEF" align="left"/>
            <Typography className={classes.username}>DEF</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            <Card className={classes.card} raised="true"> 
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="DEF" align="left"/>
            <Typography className={classes.username}>DEF</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            <Card className={classes.card} raised="true"> 
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="DEF" align="left"/>
            <Typography className={classes.username}>DEF</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card className={classes.card} raised="true"> 
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="GHI"  align="left"/>
            <Typography className={classes.username}>GHI</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            <Card className={classes.card} raised="true"> 
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="GHI" align="left"/>
            <Typography className={classes.username}>GHI</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            <Card className={classes.card} raised="true"> 
            <CardContent>
            <Typography className={classes.title} gutterBottom>
               Title
            </Typography><br /><br />
            <Avatar className={classes.image} alt="GHI"  align="left"/>
            <Typography className={classes.username}>GHI</Typography><br /> <br />
            <Typography variant="body1" align="left">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary">
                Resource Link
              </Button>
            </CardActions>
            </Card>
            </Grid>
         </Grid>
        
        </Paper>
  );

};


// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     'aria-controls': `full-width-tabpanel-${index}`,
//   };
// }

const AntTabs = withStyles({
  root: {
    borderBottom: '0px solid #123800',
  },
  indicator: {
    backgroundColor: '#123800',
  },
})(Tabs);


const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,

    fontSize:20,
    marginTop:5,
    marginRight: theme.spacing(4),
    
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#123800',
      opacity: 1,
    },
    '&$selected': {
      color: '#123800',
      fontWeight: theme.typography.fontWeightBold,
    },
    '&:focus': {
      color: '#123800',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

export default function Resources() {
  const classes = useStyles1();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root} align="center"> 
    
      <div className={classes.demo1}>
       
          <Grid>
          <Grid item xs = {3}></Grid>
          <Grid item xs = {9}>    
          <Typography align="left" style={{color:"#123800",fontWeight:"bold",fontSize:"30px",marginLeft:"10px"}}>Resources</Typography>
          <Paper elevation={0} variant="outlined" component="form" className={classes.search}>
      <InputBase
        className={classes.input}
        placeholder="Search A Forum"
        color="secondary"
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example" >
          <AntTab className="tabu" label="All" />
          <AntTab className="tabu" label="New" />
          <AntTab className="tabu" label="Books" />
          <AntTab className="tabu" label="List" />
          <AntTab className="tabu" label="Forms" />
        </AntTabs></Grid></Grid>
        <Typography className={classes.padding} />
      </div>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            <All />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <New />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
            <Books />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
            <Lists />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
            <Forms />
        </TabPanel>
      </SwipeableViews>
      <Fab className={classes.icon} color="primary" aria-label="add">
            <AddIcon />
      </Fab>
    </div>
  );
}
