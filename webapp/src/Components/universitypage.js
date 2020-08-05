import React,{useState} from 'react';
import './mystyles.css';
import PropTypes from 'prop-types';
import { makeStyles} from '@material-ui/core/styles';
import ScreenShareTwoToneIcon from '@material-ui/icons/ScreenShareTwoTone';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import LanguageIcon from '@material-ui/icons/Language';

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
  ];
  
  
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
        <Avatar className="avatar"  />      
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
         <Grid container spacing = {2}>
         <Grid item xs = {8}>
         <p className = "un ">University Name</p>

         </Grid>
         <Grid item xs = {4}>
         <br />
         <br />
         <br />
          <Button variant="outlined" style={{
        
        color: "#2CE89A",borderColor:"#2CE89A"
            }} className="buttonuniv">Follow</Button>
                <TwitterIcon /><FacebookIcon /><MailOutlineRoundedIcon />
         </Grid>
         </Grid>
         <p className = "ud">This is some description.This is some description.</p>
           <br />
           <Grid container spacing = {2}>
           <Grid item xs = {4}>
           <LocationOnIcon /><p>Some Address</p>
           </Grid>
          <Grid item xs = {4}>
           <PhoneIcon /><p>Phone Number</p>
           
           </Grid>
           
           </Grid>
           <LanguageIcon /><p>Web address</p>
     <p className = "search">Other Details</p>
           
     <Grid container spacing = {1}>
          
    <Grid item xs = {4}><h4 className="unidet">$10,000</h4>
        <p className="persondesc3">Average fees/year</p></Grid>
    <Grid item xs = {4}><h4 className="unidet">320</h4>
        <p className="persondesc3">Average GRE Score</p></Grid>
    <Grid item xs = {4}><h4 className="unidet">115</h4>
        <p className="persondesc3">Average TOEFL Score</p></Grid>
        
        </Grid>   
         

    <p className = "search">Related Questions</p>
    <br />    
            </Grid>
    <Grid item xs = {2}></Grid>
    
      </Grid>
      {displayQuestions}
      </div>
)
  
}

/*
function Sid() {

  const something = [
      {
          author: "Leonardo DiCaprio",
          
          display: 0,
          

          
      },
      {
          author: "Richard Rogers",
          
          display: 0,
          
          
      },
      {
          author: "Steve Rogers",
          
          display: 0,
          
          
      },
      {
          author: "Natasha Romanoff",
          
          display: 0,
          
          
      },
      {
          author: "Name1",
          
          display: 0,
          
          
      },
      {
          author: "Name2",
          
          display: 0,
          
          
      },
      {
          author: "Name3",
          
          display: 0,
          
          
      }
  ]


var value1 = 0;
var dis = [{
          author: "",
          
          display: 1,
          
          
      }];
      
function d(){
  var i = value1;
  while(i<(value1+3))
  {
    if(i<something.length){
     if(something[i].display == 0){
       dis.push(something[i]);
       something[i].display = 1;
       i++;
     }
    }

  }
  value1 = i;
  console.log(dis);
  
}
const Pls = dis.map((item)=>{
  return(
    <p>{item.author}</p>
  )
})
    
    return (
      <div>
      {Pls}
      <button onClick={d}>Click Here</button>
      
      
      </div>
     
    );
  };

*/


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


function UniversityPage() {

 const classes = useStyles();
  
    return (


    <div className={classes.root}>
    
    
    <Ques />
    
    </div>
  );
}
export default UniversityPage;