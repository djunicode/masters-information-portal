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
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import TextField from '@material-ui/core/TextField';
import Cookies from 'js-cookie';
import CircularProgress from '@material-ui/core/CircularProgress';

const axios = require('axios');
const token = Cookies.get('jwt');

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

function Ques() {
  const questions = [
      {
          author: "Leonardo DiCaprio",
          date: "7th August",
          like2: 8,
          dislike2:10,

          
      },
      {
          author: "Richard Rogers",
          date: "10th November",
          like2: 7,
          dislike2:12,
          
      },
      {
          author: "Steve Rogers",
          date: "7th March",
          like2: 6,
          dislike2:15,
          
      },
      {
          author: "Natasha Romanoff",
          date: "5th January",
          like2: 5,
          dislike2:12,
          
      }
  ]

  
  function CustomLike(props) {  
    const [like2, setLike2] = useState(props.like2);  
    const incrementCount = (e) => setLike2(like2 + 1); 
  return( <Grid item xs = {3}>
             
    <p className="likesv">{like2}</p><ThumbUpAltIcon onClick={incrementCount} className="icon1"/> </Grid>) 
  }
  function CustomDislike(props) {  
    const [dislike2, setDislike2] = useState(props.dislike2);  
    const incrementCount = (e) => setDislike2(dislike2 + 1); 
  return(<Grid item xs = {3}>
     
    <p className="likesv" > {dislike2}</p><ThumbDownAltIcon onClick={incrementCount} className="icon1"/></Grid>) 
  }
  
  
  const displayQuestions = questions.map((ques, index) =>{

    
      return(
        
          <Grid container spacing = {2}>
          <Grid item xs = {1}></Grid>
          <Grid item xs = {10}>
  
        <Paper elevation = {3}>
        <Grid container spacing = {1}>
        <Grid item xs = {1}></Grid>
        <Grid item xs = {7}>
        <p className = "ques">Some Question Here ?</p>
        <div>
        <Avatar className="avatar" src="/broken-image.jpg" />      
        <div>
      <p className = "quesauthor">    {ques.author}</p>
        <p className = "date">   {ques.date} </p></div>
        </div>
        
        <p className="coursedesc">This is the answer to the question. This is the answer to the question. This is the answer to the question</p>    
                    
        <Grid container spacing={3}>
            <CustomLike like2={ques.like2} />
    <CustomDislike dislike2 = {ques.dislike2}/>
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
    
    </Grid>
    <Grid item xs = {2}></Grid>
      </Grid>
    
      )
  })
return(
  <div>
  <Grid container spacing = {2}>
          <Grid item xs = {1}></Grid>
          <Grid item xs = {10}>
        
        
            </Grid>
    <Grid item xs = {2}></Grid>
      </Grid>
      {displayQuestions}
      </div>
)
  
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


function SearchProfiles() {


 

 const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };
   
 const [searchTerm, setSearchTerm] = React.useState("");
 const [searchTerm1, setSearchTerm1] = React.useState("");
const [searchResults1, setSearchResults1] = React.useState([]);
 const [searchResults, setSearchResults] = React.useState([]);
 const [people, setPeople] = React.useState([]);
const [loaded, setLoaded] = React.useState(false);
    const [universityNames,setUniversityNames]=React.useState([]);

 const handleChange1 = event => {
    setSearchTerm(event.target.value);
  };
  const handleChange2 = event => {
    setSearchTerm1(event.target.value);
  };
 React.useEffect(() => {

if(!loaded){
 axios.get('api/users/', {
                headers: {
                  Authorization: token
                  
                }

              })
              .then(function (response) {
                
              
              setPeople(response.data);
              
              
      
              })
              .catch(function (error) {
                console.log("Invalid Bro Sid");
              });

                var tags = {universityArr:[],universityNames:[],tagArr:[],tagNames:[]};
  if(!tags.universityArr.length && !tags.tagArr.length){
  axios.get('/api/tags').then(function (res) {
                
                res.data.forEach((item)=>{
	  		if(item.isSchool){
	    		
	    		if(!tags.universityNames.includes(item.name)){
			      tags.universityNames.push(item.name)
	    		}
	  		}
	  		
		});
  setUniversityNames(tags.universityNames);
  setLoaded(true);  
              })
              .catch(function (error) {
                console.log("Not working");
              });
              
  
  }

}
    const results = people.filter((person) =>
      person.name.toLowerCase().includes(searchTerm) 
    );
    setSearchResults(results);
  const results1 = universityNames.filter((univ) =>
      univ.toLowerCase().includes(searchTerm1) 
    );
    setSearchResults1(results1);
  

  }, [loaded,searchTerm,people,universityNames,searchTerm1]);




  return (


    <div className={classes.root}>
    

    
      <div className='basic'>
    <Grid container spacing={3}
    direction="row"
    justify="flex-start"
    alignItems="center">
        
            
            <Grid item xs={4}></Grid>
            <Grid  item xs={5}>
            <TextField value={searchTerm} onChange={handleChange1} id="outlined-basic" label="Search Name" variant="outlined" />
            <TextField value={searchTerm1} onChange={handleChange2} id="outlined-basic" label="Search Univ" variant="outlined" />
        
            </Grid>
            <Grid className='icons' item xs={3}>
            </Grid>
        </Grid>
<Grid container spacing={2}>
        
            <Grid item xs={1}></Grid>
            <Grid  item xs={5}>
            <p className = "search">Search Results</p>
            
            </Grid>
            <Grid className='icons' item xs={3}>
            </Grid>
        </Grid>

        <br /><br />
        </div>
    
      <Divider  style={{color:'#2CE89A'}}/> 
      <div className={classes.demo1}>
          <Grid container spacing={1}>
          <Grid item xs = {1}></Grid>
          <Grid item xs = {10}>    
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab className="tabu" label="User" />
          <AntTab className="tabu" label="University" />
          <AntTab className="tabu" label="Posts" />
        </AntTabs></Grid></Grid>
        <Typography className={classes.padding} />
      </div>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        
        
        
        
         {loaded?searchResults.map(item => (
          <Grid container spacing = {1}>
          <Grid item xs = {1}></Grid>
          <Grid item xs = {10}>
  
        <Paper elevation = {3}>
        <Grid container spacing={1}
    direction="row"
    justify="flex-start"
    alignItems="center">
        
            
            <Grid item xs={2}> <Avatar className="imagenew1" /> </Grid>
            <Grid  item xs={8}>
        <p className="personname3">{item.name}</p>
        <p className="persontitle4">{item.department}</p>
        <p className="persondesc4">{item.bio}</p>
            <br/>
            <br />
            </Grid>
            <Grid className='icons' item xs={2}>
            <a href = {`/${item._id}`} target="_blank"><Button variant="outlined" style={{
        
        color: "#2CE89A",borderColor:"#2CE89A"
            }} className="buttonprof">View Profile</Button></a>
                </Grid>
        </Grid>

    <br />
    <br />
    </Paper>
    <br />
    
    </Grid>
    <Grid item xs = {2}></Grid>
      </Grid>
        )):<div><Grid container spacing = {3}><Grid item xs = {5}></Grid><Grid item xs = {3}><CircularProgress /></Grid><Grid item xs = {4}></Grid></Grid></div>}
              
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        {loaded?searchResults1.map(item => (
          <Grid container spacing = {2}>
          <Grid item xs = {1}></Grid>
          <Grid item xs = {10}>
  
        <Paper elevation = {3}>
        <Grid container spacing={2}
    direction="row"
    justify="flex-start"
    alignItems="center">
        
            <Grid item xs = {1}></Grid>
            <Grid item xs={1}></Grid>
            <Grid  item xs={7}>
        <p className="personname4">{item}</p>
           </Grid>
            <Grid className='icons' item xs={2}>
            <a href="/university" target="_blank"><Button variant="outlined" style={{
        
        color: "#2CE89A",borderColor:"#2CE89A"
            }} className="buttonprof1">View Profile</Button></a>
                </Grid>
        </Grid>

    <br />
    </Paper>
    <br />
    
    </Grid>
    <Grid item xs = {2}></Grid>
      </Grid>
     )):<div><Grid container spacing = {3}><Grid item xs = {5}></Grid><Grid item xs = {3}><CircularProgress /></Grid><Grid item xs = {4}></Grid></Grid></div>}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
      
       <Ques/>
        </TabPanel>
      </SwipeableViews>



      
    </div>
  );
}
export default SearchProfiles;




