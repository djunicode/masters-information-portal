import React,{useEffect} from 'react';
import './mystyles.css';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

import GitHubIcon from '@material-ui/icons/GitHub';
import Cookies from 'js-cookie';
import {useParams} from 'react-router-dom';
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

/*
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
  
  const displayQuestions = questions.map((ques, index) =>{


  function CustomLike(props) {  
  const [like2, setLike2] = useState(props.like2);
    const [lclicked,setLClicked] = useState(false); 
    const [lcolor,setLColor] = useState('');      
    const [dislike2, setDislike2] = useState(props.dislike2);
    const [dclicked,setDClicked] = useState(false);
    const [dcolor,setDColor] = useState("");  
    
    const incrementLike = (e) => {
      if(!lclicked && !dclicked){
      setLike2(like2 + 1);
      setLClicked(true);
      setLColor("primary");
      }
      else if(!lclicked && dclicked){
      setLike2(like2 + 1);
      setLClicked(true);
      setLColor("primary");
      setDislike2(props.dislike2);
       setDClicked(false);
       setDColor("")
         
      }
      else{
        setLike2(props.like2);
        setLClicked(false);
        setLColor("")
      }    
    }
    const incrementDislike = (e) => {
     
     if(!dclicked && !lclicked){
      setDislike2(dislike2 + 1);
      setDClicked(true);
      setDColor("primary");
     }
     else if(!dclicked && lclicked){
       setDislike2(dislike2 + 1);
      setDClicked(true);
      setDColor("primary");
      setLike2(props.like2);
        setLClicked(false);
        setLColor("")

     }
     else{
       setDislike2(props.dislike2);
       setDClicked(false);
       setDColor("")
       
     }
    } 
  return( 
    <Grid container spacing = {3}>
  <Grid item xs = {4}>
             
    <p className="likesv">{like2}</p><ThumbUpAltIcon color={lcolor} onClick={incrementLike} className="icon1"/>  </Grid>
    <Grid item xs = {4}>
    <p className="likesv" > {dislike2}</p><ThumbDownAltIcon color = {dcolor} onClick={incrementDislike} className="icon1"/>  
    </Grid>
   <Grid item xs = {4}>
     
    <p className="likesv">Share</p><ScreenShareTwoToneIcon  className="icon1"/></Grid>
</Grid>
  )
  }  
      return(
        
          <Grid container spacing = {2}>
          <Grid item xs = {1}></Grid>
          <Grid item xs = {10}>
  
        <Paper elevation = {3}>
        <Grid container spacing = {1}>
        <Grid item xs = {1}></Grid>
        <Grid item xs = {7}>
        <p className = "ques">Some Question Here and some text here for the people of this country ?</p>
        <div>
              
        <div>
      <Avatar style={{float:"left"}}/>
      <p className = "quesauthor">    {ques.author}</p>
        <p className = "date">   {ques.date} </p></div>
        </div>
        
        <p className="coursedesc">This is the answer to the question. This is the answer to the question. This is the answer to the question</p>    
                    
        
            <CustomLike like2={ques.like2} dislike2 = {ques.dislike2}/>
   
        

    </Grid>
    <Grid item xs = {4}>
    <Button variant="outlined" style={{
        
        color: "#2CE89A",borderColor:"#2CE89A"
            }} className="buttonuniv">Machine Learning</Button>
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

const displayQuestions1 = questions.map((ques, index) =>{
function CustomLike(props) {  
  const [like2, setLike2] = useState(props.like2);
    const [lclicked,setLClicked] = useState(false); 
    const [lcolor,setLColor] = useState('');      
    const [dislike2, setDislike2] = useState(props.dislike2);
    const [dclicked,setDClicked] = useState(false);
    const [dcolor,setDColor] = useState("");  
    
    const incrementLike = (e) => {
      if(!lclicked && !dclicked){
      setLike2(like2 + 1);
      setLClicked(true);
      setLColor("primary");
      }
      else if(!lclicked && dclicked){
      setLike2(like2 + 1);
      setLClicked(true);
      setLColor("primary");
      setDislike2(props.dislike2);
       setDClicked(false);
       setDColor("")
         
      }
      else{
        setLike2(props.like2);
        setLClicked(false);
        setLColor("")
      }    
    }
    const incrementDislike = (e) => {
     
     if(!dclicked && !lclicked){
      setDislike2(dislike2 + 1);
      setDClicked(true);
      setDColor("primary");
     }
     else if(!dclicked && lclicked){
       setDislike2(dislike2 + 1);
      setDClicked(true);
      setDColor("primary");
      setLike2(props.like2);
        setLClicked(false);
        setLColor("")

     }
     else{
       setDislike2(props.dislike2);
       setDClicked(false);
       setDColor("")
       
     }
    } 
  return( 
    <Grid container spacing = {3}>
  <Grid item xs = {4}>
             
    <p className="likesv">{like2}</p><ThumbUpAltIcon color={lcolor} onClick={incrementLike} className="icon1"/>  </Grid>
    <Grid item xs = {4}>
    <p className="likesv" > {dislike2}</p><ThumbDownAltIcon color = {dcolor} onClick={incrementDislike} className="icon1"/>  
    </Grid>
   <Grid item xs = {4}>
     
    <p className="likesv">Share</p><ScreenShareTwoToneIcon  className="icon1"/></Grid>
</Grid>
  )
  }    
      return(
        
          <Grid container spacing = {1}>
          
          <Grid item xs = {12}>
  
        <Paper elevation = {3}>
        <Grid container spacing = {1}>
        <Grid item xs = {1}></Grid>
        <Grid item xs = {6}>
        <p className = "ques">Some Question Here and some text here for the people of this country ?</p>
         </Grid>
    <Grid item xs = {5}>
    <Button variant="outlined" style={{
        
        color: "#2CE89A",borderColor:"#2CE89A", width:"auto"
            }} >Machine Learning</Button>
            <Button variant="outlined" style={{
        
        color: "#2CE89A",borderColor:"#2CE89A", width:"auto"
            }} >Javascript</Button>
            <Button variant="outlined" style={{
        
        color: "#2CE89A",borderColor:"#2CE89A", width:"auto"
            }} >Javascript</Button>
<Button variant="outlined" style={{
        
        color: "#2CE89A",borderColor:"#2CE89A"
            }} >React</Button>

    </Grid>
    </Grid>
    <Grid container spacing = {1}>
    <Grid item xs = {1}></Grid>
    <Grid item xs = {10}>
    <div>
        <div>
        <Avatar style={{float:"left"}} />      
        
      <p className = "quesauthor">    {ques.author}</p>
        <p className = "date">   {ques.date} </p></div>
        </div>
        
        <p className="coursedesc">This is the answer to the question. This is the answer to the question. This is the answer to the question</p>    
        <CustomLike like2={ques.like2} dislike2 = {ques.dislike2}/>

    </Grid>
    <Grid item xs = {1}></Grid>
        </Grid>
    <br />
    </Paper>
    <br />
    
    </Grid>
    
      </Grid>
    
      )
  })


return(
  <div>
  <Grid container spacing = {2}>
          <Grid item xs = {1}></Grid>
          <Grid item xs = {10}>
        <h3 className="headers"> Questions </h3>
        
            </Grid>
    <Grid item xs = {2}></Grid>
      </Grid>
      {window.innerWidth<=500?displayQuestions1:displayQuestions}
      
      </div>
)
  
}
*/
const CurrentDate = (props) => {

if (props.winwid>=1200 ){
  return (
    <div className='basic'>
    <Grid container spacing={4}
    direction="row"
    justify="flex-start"
    alignItems="center">
        
            <Grid item xs = {1}></Grid>
            <Grid item xs={2}><img  className='imagenew'  src={props.image} alt='Profile'/></Grid>
            <Grid  item xs={6}>
        <p className="personname2">{props.personname}</p>
        <p className="persontitle2">{props.persontitle}</p>
        <p className="persondesc2">{props.persondesc}</p>
            </Grid>
            <Grid className='icons' item xs={3}>
            <Button variant="outlined" style={{
        
        color: "#2CE89A",borderColor:"#2CE89A"
            }} className="buttonuniv">Follow</Button>
                <a href = {props.twitterLink}><TwitterIcon /></a><a href = {props.facebookLink}><FacebookIcon  /></a><a href = {props.githubLink}><GitHubIcon /></a></Grid>
        </Grid>

        <br /><br />
        </div>
     
  );
}
else if(props.winwid < 1200){
    return(

            <div className='basic'>
    <Grid container spacing={4}
    direction="row"
    justify="flex-start"
    alignItems="center">
        
            <Grid item xs = {1}></Grid>
              <Grid  item xs={10}>
        <img  className = "imagesmall"  src={props.image} alt='Profile'/>    
        <p className="namesmall">{props.personname}</p>
        <br />    
        <p className="titlesmall">{props.persontitle}</p>
        <p className="descsmall">{props.persondesc}</p>
            <Button variant="outlined" style={{
        
        color: "#2CE89A",borderColor:"#2CE89A"
            }} className="buttonuniv">Follow</Button>
                <a href = {props.twitterLink}><TwitterIcon /></a><a href = {props.facebookLink}><FacebookIcon  /></a><a href = {props.githubLink}><GitHubIcon /></a>
            </Grid>
            <Grid  item xs={2}>
            </Grid>
        </Grid>

        <br /><br />
        </div>
    );
}
  
};


const Profile1 = (props) => {
    return (
     <div>   
    <p className="coursename">{props.univname}</p>
    <p className="coursedesc">{props.univdesc}</p>
        </div>

        
         
       
    );
    
  };

  const Profile2 = (props) => {
  var a = [];
  a = props.tests;
   const Display = a.map((item,index) =>{

    
      return(
        
    
        <Grid item xs = {3}>       
    <h4 className="persontitle3">{item.score}</h4>
        <p className="persondesc3">{item.name}</p>
        </Grid>
       
    
    
      )
  })

    return (
        
    <div>    
     <Grid container spacing = {3}>
      <Grid item xs = {1}></Grid>
      
        {Display}
        
        
</Grid>
    
    
                <h3 className="headers">Timeline</h3>
        

         
             <ul>
        <li><div><p className="listhead">Heading</p>
            <p className="listtitle">Title</p>
            <p className="coursedesc">Description</p>
            </div></li>
            <li><div><p className="listhead">Heading</p>
            <p className="listtitle">Title</p>
            <p className = "coursedesc">Description</p>
            </div></li>
        
        
        </ul>
       </div>
    );
    
  };
  
  


const UniversityApplications = (props) => {

const a = props.acceptArray.map(item =>{

return(
  <div>
<Grid container spacing ={3} className="unis" style={{backgroundColor:"#FFFFFF"}}>
            <Grid item xs = {8}> <h3 className="univtitle">{item}</h3>
            <h5 className="coursename">{props.univtitle}</h5>
            <p className="coursedesc" >Description</p>
            <br />
            <p className="coursedesc">Date Applied</p>
            </Grid>
            <Grid item xs = {3}>
                <br /><br /><br /><br />
            <Button variant="outlined" style={{
        
        color: "#2CE89A",borderColor:"#2CE89A"
            }} className="buttonuniv">Accepted</Button>
            </Grid>
            <Grid item xs={1}></Grid>
            <br />
            </Grid>
            <br />
            <br />
            </div>
)     

});

const b = props.rejectArray.map(item=>{
return(
  <div>
<Grid container spacing ={3} className="unir" style={{backgroundColor:"#FFFFFF"}}>
            <Grid item xs = {8}> <h3 className="univtitle">{item}</h3>
            <h5 className="coursename">{props.univtitle}</h5>
            <p className="coursedesc" >Description</p>
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
            <br />
            </Grid>
            <br />
            <br />
            </div>


)

})

    return (
        
            <div>
            <br ></br>
            <br />
            {a}
            {b}
              </div>
    );
  
  };



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
    
    marginRight: theme.spacing(0),
    
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

  const getTagById = (id,ObjectArr) => {
	var name;
	ObjectArr.forEach((obj)=>{
		if(obj._id===id){
			name=obj.name;
		}
	})
	return name;
}




const [uniName,setUniName]=React.useState('');
   
    const[name,setName]=React.useState(null);
  const[bio,setBio]=React.useState('');
  const[dept,setDept]=React.useState('');
 
 const[rejects,setRejects]=React.useState([]);
  const[accName,setAccName]=React.useState([]);
  const[rejName,setRejName]=React.useState([]);
  const[accepts,setAccepts]=React.useState([]);
  const[facebook,setFacebook] = React.useState('');
   const[github,setGithub] = React.useState('');
    const[twitter,setTwitter] = React.useState('');
    const [loaded,setLoaded] = React.useState(false);
    const [loaded1,setLoaded1] = React.useState(false);
  const[univ,setUniv]=React.useState('');
  const[url,setUrl]=React.useState(null);
 const [test,setTest] = React.useState([]);
const params = useParams();
               
useEffect(() => {
    if(!loaded){
    axios.get(`api/users/${params.profileID}`, {
                headers: {
                  Authorization: token
                  
                }

              })
              .then(function (response) {
                
              setName(response.data.name);
              setBio(response.data.bio);
              setDept(response.data.department);
              setFacebook(response.data.facebookUrl);
              setGithub(response.data.githubUrl);
              setTwitter(response.data.twitterUrl);
              setUrl(`/api/users/${response.data._id}/avatar`);
              setLoaded1(true);
              setUniv(response.data.currentSchool);
              setRejects(response.data.rejects);
              setAccepts(response.data.accepts);
              setTest(response.data.testTimeline);
              
              setLoaded(true);
                          
      
              })
              .catch(function (error) {
                console.log("Invalid Request");
              });

   


  var tags = {universityArr:[],universityNames:[],tagArr:[],tagNames:[]};
  if(!tags.universityArr.length && !tags.tagArr.length){
  axios.get('/api/tags').then(function (res) {
                
                res.data.forEach((item)=>{
	  		if(item.isSchool){
	    		if(!tags.universityArr.includes(item)){
			      tags.universityArr.push(item)
	    		}
	    		if(!tags.universityNames.includes(item.name)){
			      tags.universityNames.push(item.name)
	    		}
	  		}
	  		else{
			    if(!tags.tagArr.includes(item)){
			      tags.tagArr.push(item)
			    }
			    if(!tags.tagNames.includes(item.name)){
			      tags.tagNames.push(item.name)
			    }
	  		}
		});
    console.log("working");
    
    var name1;
    name1 = getTagById(univ,tags.universityArr);
    setUniName(name1);
    var rejectName = [];
    var acceptName = [];
    rejects.forEach((item)=>{
		          var name = getTagById(item,tags.universityArr)
              rejectName.push(name);
	});
  accepts.forEach((item)=>{
		          var name2 = getTagById(item,tags.universityArr)
              acceptName.push(name2);
	});
  setAccName(acceptName);
  setRejName(rejectName)                          
              })
              .catch(function (error) {
                console.log("Not working");
              });
              
  
  }
    }
},[loaded1,loaded,accepts,rejects,univ,params.profileID]); 
  return (
    <div className={classes.root}>

     {loaded?  
     <CurrentDate 
     winwid = {window.innerWidth}
     personname={name} 
     persontitle={dept} 
    persondesc={bio} 
    facebookLink = {facebook}
    githubLink = {github}
    twitterLink = {twitter}
     image = {url}  />:
    <div><br/><br /><Grid container spacing = {3}><Grid item xs = {5}></Grid><Grid item xs = {3}><CircularProgress /></Grid>
    <Grid item xs = {4}></Grid></Grid><br /><br /></div>}
     <Divider  style={{color:'#2CE89A'}}/> 
      <div className={classes.demo1}>
          <Grid container spacing={2}>
          <Grid item xs = {1}></Grid>
          <Grid item xs = {10}>    
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab className="tabu" label="Profile" />
          <AntTab className="tabu" label="University" />
          
        </AntTabs></Grid></Grid>
        <Typography className={classes.padding} />
      </div>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Grid container spacing = {2}>
        <Grid item xs = {1}></Grid>
        <Grid item xs = {10}><p className="headers">Current University</p>
        {loaded?
        <Profile1 
        univname={uniName}
        univdesc="No Description"
         />:<div><Grid container spacing = {3}><Grid item xs = {5}></Grid><Grid item xs = {3}><CircularProgress /></Grid><Grid item xs = {4}></Grid></Grid></div>}
        <h3 className="headers">Other Details</h3>
        {loaded?
        <Profile2 
        
        
        tests = {test} />:<div><Grid container spacing = {3}><Grid item xs = {5}></Grid><Grid item xs = {3}><CircularProgress /></Grid><Grid item xs = {4}></Grid></Grid></div>}
        </Grid>
        <Grid item xs = {1}></Grid>
        </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <Grid container spacing = {2}> 
        <Grid item xs = {1}></Grid>
        <Grid item xs = {10}>
        <p className = "headers">University Applications</p>
        {loaded?
        <UniversityApplications winwid = {window.innerWidth} style={{backgroundColor:'#E5E5E5'}} acceptArray = {accName} rejectArray = {rejName} univtitle={dept} />
        :<div><Grid container spacing = {3}><Grid item xs = {5}></Grid><Grid item xs = {3}><CircularProgress /></Grid><Grid item xs = {4}></Grid></Grid></div>}
        </Grid>
        <Grid item xs = {1}></Grid>
        </Grid>
        </TabPanel>
       
       
      </SwipeableViews>
    </div>
  );
}
