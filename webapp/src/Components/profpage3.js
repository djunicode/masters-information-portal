import React,{useState} from 'react';
import './mystyles.css';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import ScreenShareTwoToneIcon from '@material-ui/icons/ScreenShareTwoTone';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProfImage from './profilephoto.jpg';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
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

function Sid() {

    const [like, setLike] = useState(15);
  
    const [dislike,setDislike] = useState(5);
    const handleLike = e => {
      const like1 = like +1;  
      setLike(like1);
    };
    const handleDislike = e => {
        const dislike1 = dislike +1;  
        setDislike(dislike1);
      };
    
    return (
      <Grid container spacing = {2}>
          <Grid item xs = {1}></Grid>
          <Grid item xs = {10}>
        <h3 className="headers"> Questions </h3>
        <br />
        <Paper elevation = {3}>
        <Grid container spacing = {1}>
        <Grid item xs = {1}></Grid>
        <Grid item xs = {7}>
        <p className = "ques">Some Question Here ?</p>
        <div>
        <Avatar className="avatar" src="/broken-image.jpg" />      
        <div>
        <p className = "quesauthor">    Richard Rogers</p>
        <p className = "date">   7 August </p></div>
        </div>
        
        <p className="coursedesc">This is the answer to the question. This is the answer to the question. This is the answer to the question</p>    
                    
        <Grid container spacing={3}>
            <Grid item xs = {3}>
             
    <p className="likesv">{like}</p><ThumbUpAltIcon onClick={handleLike} className="icon1"/> </Grid>
    <Grid item xs = {3}>
     
    <p className="likesv" > {dislike}</p><ThumbDownAltIcon onClick={handleDislike} className="icon1"/></Grid>
    <Grid item xs = {3}>
     
    <p className="likesv">Share</p><ScreenShareTwoToneIcon  className="icon1"/></Grid>
    <Grid item xs = {3}></Grid>
    </Grid>
    </Grid>
    <Grid item xs = {4}>
    <Button variant="outlined" style={{
        
        color: "#2CE89A",borderColor:"#2CE89A"
            }} className="buttonuniv">Javascript</Button>
<Button variant="outlined" style={{
        
        color: "#2CE89A",borderColor:"#2CE89A"
            }} className="buttonuniv">React</Button>

    </Grid>
    </Grid>
    <br />
    </Paper>
    <br />
    <Paper elevation = {3}>
        <Grid container spacing = {1}>
        <Grid item xs = {1}></Grid>
        <Grid item xs = {7}>
        <p className = "ques">Some Question Here ?</p>
        <div>
        <Avatar className="avatar" src="/broken-image.jpg" />      
        <div>
        <p className = "quesauthor">    Richard Rogers</p>
        <p className = "date">   7 August </p></div>
        </div>
        
        <p className="coursedesc">This is the answer to the question. This is the answer to the question. This is the answer to the question</p>    
                    
        <Grid container spacing={3}>
            <Grid item xs = {3}>
             
    <p className="likesv">{like}</p><ThumbUpAltIcon onClick={handleLike} className="icon1"/> </Grid>
    <Grid item xs = {3}>
     
    <p className="likesv" >{dislike}</p><ThumbDownAltIcon onClick={handleDislike} className="icon1"/></Grid>
    <Grid item xs = {3}>
     
    <p className="likesv">Share</p><ScreenShareTwoToneIcon  className="icon1"/></Grid>
    <Grid item xs = {3}></Grid>
    </Grid>
    </Grid>
    <Grid item xs = {4}>
    <Button variant="outlined" style={{
        
        color: "2CE89A",borderColor:"#2CE89A"
            }} className="buttonuniv">Javascript</Button>
<Button variant="outlined" style={{
        
        color: "#2CE89A",borderColor:"#2CE89A"
            }} className="buttonuniv">React</Button>

    </Grid>
    </Grid>
    <br />
    </Paper>
    </Grid>
    <Grid item xs = {2}></Grid>
      </Grid>
    );
  };

const CurrentDate = (props) => {

  return (
    <div className='basic'>
    <Grid container spacing={4}
    direction="row"
    justify="flex-start"
    alignItems="center">
        
            <Grid item xs = {1}></Grid>
            <Grid item xs={2}><img  className='imagenew' src={ProfImage} alt='Profile Photo'/></Grid>
            <Grid  item xs={6}>
        <p className="personname2">{props.personname}</p>
        <p className="persontitle2">{props.persontitle}</p>
        <p className="persondesc2">{props.persondesc}</p>
            </Grid>
            <Grid className='icons' item xs={3}>
            <Button variant="outlined" style={{
        
        color: "#2CE89A",borderColor:"#2CE89A"
            }} className="buttonuniv">Follow</Button>
                <TwitterIcon /><FacebookIcon /><MailOutlineRoundedIcon /></Grid>
        </Grid>

        <br /><br />
        </div>
     
  );
  
};

const Profile = (props) => {

    return (
        <Grid container spacing = {2}>
            <Grid item xs = {1}></Grid>
        <Grid item xs = {10}>    
                <h3 className="headers">Current University</h3>
    <h5 className="coursename">{props.univname}</h5>
    <p className="coursedesc">{props.univdesc}</p>
        

        
        <h3 className="headers">Other Details</h3>
        
        <Grid container spacing = {1}>
          
    <Grid item xs = {4}><h4 className="persontitle3">{props.grescore}</h4>
        <p className="persondesc3">GRE Score</p></Grid>
    <Grid item xs = {4}><h4 className="persontitle3">{props.averagescore}</h4>
        <p className="persondesc3">Average Score</p></Grid>
    <Grid item xs = {4}><h4 className="persontitle3">{props.toeflscore}</h4>
        <p className="persondesc3">TOEFL Score</p></Grid>
        
        </Grid>
        
        

    
    
                <h3 className="headers">Timeline</h3>
        

         
             <ul>
        <li><div><p className="listhead">Heading of Work</p>
            <p className="listtitle">Title of the list</p>
            <p className="coursedesc">This is some description</p>
            </div></li>
            <li><div><p className="listhead">Heading of Work</p>
            <p className="listtitle">Title of the list</p>
            <p className = "coursedesc">This is some description</p>
            </div></li>
        
        
        </ul>
    </Grid>
    <Grid item xs = {1}></Grid>
    </Grid>
       
    );
    
  };
  

const UniversityApplications = (props) => {

    return (
        
        <Grid container spacing = {2}>
        
            <Grid item xs = {1}></Grid>
            <Grid item xs = {10}>
            <h3 className="headers">University Applications</h3>
            <br ></br>
            <br />
            <Grid container spacing ={3} className="uni" style={{backgroundColor:"#FFFFFF"}}>
            <Grid item xs = {8}> <h3 className="univtitle">University Name</h3>
            <h5 className="coursename">Course Name</h5>
            <p className="coursedesc" >This is my desciption.This is my description line 2. This is my description line 2.This is my description line 2.This is my description line 2.This is my description line 2.This is my description line 2.</p>
            <br />
            <p className="coursedesc">Date Applied</p>
            </Grid>
            <Grid item xs = {3}>
                <br /><br /><br /><br />
            <Button variant="outlined" style={{
        
        color: "#E8B32C",borderColor:"#E8B32C"
            }} className="buttonuniv">Applied</Button>
            </Grid>
            <Grid item xs={1}></Grid>
            </Grid>
            <br />
            <br />
            <Grid container spacing ={3} className="uni" style={{backgroundColor:"#FFFFFF"}}>
            <Grid item xs = {8}> <h3 className="univtitle">University Name</h3>
            <h5 className="coursename">Course Name</h5>
            <p className="coursedesc" >This is my desciption.This is my description line 2. This is my description line 2.This is my description line 2.This is my description line 2.This is my description line 2.This is my description line 2.</p>
            <br />
            <p className="coursedesc">Date Applied</p>
            </Grid>
            <Grid item xs = {3}>
                <br /><br /><br /><br />
            <Button variant="outlined" style={{
        
        color: "#E8B32C",borderColor:"#E8B32C"
            }} className="buttonuniv">Applied</Button>
            </Grid>
            <Grid item xs={1}></Grid>
            </Grid>
            <br />
            <br />
            <Grid container spacing ={3} className="unis" style={{backgroundColor:"#FFFFFF"}}>
            <Grid item xs = {8}> <h3 className="univtitle">University Name</h3>
            <h5 className="coursename">Course Name</h5>
            <p className="coursedesc" >This is my desciption.This is my description line 2. This is my description line 2.This is my description line 2.This is my description line 2.This is my description line 2.This is my description line 2.</p>
            <br />
            <p className="coursedesc">Date Applied</p>
            </Grid>
            <Grid item xs = {3}>
                <br /><br /><br /><br />
            <Button variant="outlined" style={{
        
        color: "#2CE89A",borderColor:"#2CE89A"
            }} className="buttonuniv">Selected</Button>
            </Grid>
            <Grid item xs={1}></Grid>
            </Grid>
            <br />
            <br />
            <Grid container spacing ={3} className="unir" style={{backgroundColor:"#FFFFFF"}}>
            <Grid item xs = {8}> <h3 className="univtitle">University Name</h3>
            <h5 className="coursename">Course Name</h5>
            <p className="coursedesc" >This is my desciption.This is my description line 2. This is my description line 2.This is my description line 2.This is my description line 2.This is my description line 2.This is my description line 2.</p>
            <br />
            <p className="coursedesc">Date Applied</p>
            </Grid>
            <Grid item xs = {3}>
                <br /><br /><br /><br />
            <Button variant="outlined" style={{
        
        color: "#E84B2C",borderColor:"#E84B2C"
            }} className="buttonuniv">Rejected</Button>
            </Grid>
            <Grid item xs={1}></Grid>
            </Grid>

            </Grid>
            <Grid item xs = {1}></Grid>
            </Grid>
    );
    
  };

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor:'#E5E5E5',
    
    flexGrow:1,
    marginTop:0,
    
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const AntTabs = withStyles({
  root: {
    borderBottom: '0px solid #2CE89A',
  },
  indicator: {
    backgroundColor: '#2CE89A',
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,

    fontSize:20,
    
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
      color: '#2CE89A',
      opacity: 1,
    },
    '&$selected': {
      color: '#2CE89A',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#2CE89A',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);


export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
     <CurrentDate style={{backgroundColor:'#E5E5E5'}} personname="Siddharth Salvi" persontitle="S.E Computer Engineering"  persondesc="This is my description. This is my description.This is my description.This is my description.This is my description."/>
     <Divider  style={{color:'#2CE89A'}}/> 
      <div className={classes.demo1}>
          <Grid container spacing={2}>
          <Grid item xs = {1}></Grid>
          <Grid item xs = {10}>    
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab className="tabu" label="Profile" />
          <AntTab className="tabu" label="University" />
          <AntTab className="tabu" label="Questions" />
        </AntTabs></Grid></Grid>
        <Typography className={classes.padding} />
      </div>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Profile 
        univname="D.J Sanghvi College of Engineering"
        univdesc="This is my description line 2.This is my description line 2.This is my description line 2.This is my description line 2."
        grescore="3.7"
        toeflscore="115"
        averagescore="320" />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <UniversityApplications style={{backgroundColor:'#E5E5E5'}} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
       <Sid />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
