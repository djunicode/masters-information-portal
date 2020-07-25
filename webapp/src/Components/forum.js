import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme ,withStyles} from '@material-ui/core/styles';
import {getUserInfo} from '../Helpers/fetchRequests.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Cookies from 'js-cookie';
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
      float:"left",
      display:"flex",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));




const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    
  },
  iconButton: {
    padding: 10,
  },

  forumpage:{
     
      padding:'5px',
      maxWidth:'1000px',
      margin:"15px",
  },
  content:
  {
    textAlign:"left",
    maxWidth:"930px",
    marginRight:"auto",
  },
  card:{
    margin:'10px',
  },
  cardcontent:{
    float:'left',
    minWidth:"1000px",
  },
  like:{
    textAlign:"left",
    color:"black",
    fontFamily:"arial",
    fontSize:"18px",
    marginLeft:"5px",
  },
  question:{
    fontSize:"24px",
    fontWeight:"bold",
    fontFamily:"Arial",
    color:"#333333"
  },
  username:{
    float:"left",
    fontSize:"18px",
    marginLeft:"5px",
    paddingTop:"8px",
    color:"#333333"
  },
  image:{
    float:"left",
  },
  button1:{
    color: "#123800",
    backgroundColor:"#8cd4af",
    fontWeight:"bold",
    marginLeft:"5px",
    marginTop:"5px",
    marginRight:"none",
    opacity:"0.9",
    borderRadius:"5px",
    fontSize:"12px",
    float:"right",
    minWidth:"100px"
  },
  link:{
    textDecoration:"none",
    color:"black",
  },

}));

function Recommended(props) {
  const classes=useStyles();
  const[userid,setUserid]=useState(null);
  const [data, setData] = useState([])
  
  useEffect(() => {
    
    async function setDetails(){
        var storedUserData = await getUserInfo(null,null);
        try{
            setUserid(storedUserData.id);
           }
        catch(error){
            console.log(error)
        }
    }
    setDetails();
    axios.get('/api/forum/recommended',{
      headers:{
        Authorization : token
      }
    }).then(async(json) => {
    let mydata = json.data
    for (let forum of mydata){
      if(forum.author){
        const response = await fetch(`/api/users/${forum.author}`,{});
        const json1 = await response.json();
        forum.authorName = json1.name;
        forum.Avatar = json1.avatarUrl;
      }
      else{
        forum.authorName = null
      }
    }
    setData(mydata)
  })
},[])
  

function ToggleLike(props){
  const[like,setLike]=useState(props.like);
  const[dislike,setDislike]=useState(props.dislike);
  if(props.upvoters.includes(userid)===false && props.downvoters.includes(userid)===false)
  {
    var x ="disabled";
    var y="disabled";
  }
  else if(props.upvoters.includes(userid)===true && props.downvoters.includes(userid)===false)
  {
     x = "primary";
     y = "disabled";
  }
  else if(props.upvoters.includes(userid)===false && props.downvoters.includes(userid)===true)
  {
     x = "disabled";
     y= "primary";
  }
  else
  {
    console.log("error");

  }
  const[bg,setBg]=useState(x);
  const[bg1,setBg1]=useState(y);
  const handleLike = e => {
      axios.post(`/api/forum/${props._id}/upvote`)
      .then(function(response){
        console.log("Like Uploaded!")
      })
      if( bg === "disabled" )
      {
        if(bg1 === "primary")
          {
            setBg1("disabled");
            setDislike(dislike-1);
          }
          else
          {
            console.log("dislike was already disabled")
          }
      const like1 = like +1; 
      setLike(like1);
      setBg("primary");
      }
      else
      {
        const like2 = like-1;
        setLike(like2);
        setBg("disabled");
      }
    }
    const handleDislike = e => {
        axios.post(`/api/forum/${props._id}/downvote`)
        .then(function(response){
          console.log("DisLike Uploaded!")
        })
        if( bg1 === "disabled" )
        {
          if(bg === "primary")
          {
            setBg("disabled");
            setLike(like-1);
          }
          else{
            console.log("bg was already disabled");
          }
        const dislike1 = dislike +1; 
        setDislike(dislike1);
        setBg1("primary");
        }
        else
        {
          const dislike2 = dislike-1;
          setDislike(dislike2);
          setBg1("disabled");
        }
      }
 
  return(
        <div>
        <IconButton onClick={handleLike} color={bg}>
          <ThumbUpIcon />
          <div className={classes.like}>{like}</div>
      </IconButton>
      <IconButton  onClick= {handleDislike} color={bg1}>
          <ThumbDownIcon />
          <div className={classes.like}>{dislike}</div>
      </IconButton>
    
    </div>
      )
}
    const displayForum =() =>
    {
    return data.map(forum =>{
      if (forum.isAnswer==false)
      {
      return(
      <div className={classes.root} align="center"> 
      <Paper className={classes.forumpage} >
          <Card className={classes.card} variant={"outlined"}>
        <CardContent className={classes.cardcontent}>
          <div>
            <Typography className={classes.question} color="initial" align="left" gutterBottom>
              {forum.title}
            </Typography>
          </div>
          <div>
        <Avatar className={classes.image} alt={forum.authorName} src={forum.Avatar} align="left"/>
      <Typography className={classes.username}>{forum.authorName}</Typography><br /><br />
        </div>
          <div className={classes.content}>
          <Typography  variant="body1" align="left">
        {forum.text}
        </Typography>
        </div>
  
        </CardContent>
        <CardActions disableSpacing>
        <ToggleLike like={forum.upvoters.length} dislike={forum.downvoters.length} _id={forum._id} upvoters={forum.upvoters} downvoters={forum.downvoters}/>
        <Link classes={classes.link} to={`/single-forum/${forum._id}`} style={{ textDecoration: 'none' }}><IconButton><CommentIcon /> <div className={classes.like}>{forum.answers.length}</div></IconButton></Link>
        <IconButton style={{marginRight:"auto"}}>
            <ShareIcon />
        </IconButton>
        <div style={{marginLeft:"auto"}}>
        {forum.tags.map(tag => {
        return(
          <Button  disabled className={classes.button1} style={{ color: "#123800",}}>{tag.name}</Button>
        )
        })}
        </div>
          </CardActions>
          
      </Card>
      </Paper>
      </div>
      )
      }
      else
      {
        return null
      }
    }
    )}

  return(

    <div>
    {displayForum()}
    </div>
  )
}
function Latest(props) {
  const classes=useStyles();
  const[userid,setUserid]=useState(null);
  const [data, setData] = useState([])
  
  useEffect(() => {
    
    async function setDetails(){
        var storedUserData = await getUserInfo(null,null);
        try{
            setUserid(storedUserData.id);
            console.log(storedUserData.id);
           }
        catch(error){
            console.log(error)
        }
    }
    setDetails();
    axios.get('/api/forum?latest=10').then(async(json) => {
    let mydata = json.data
    for (let forum of mydata){
      if(forum.author){
        const response = await fetch(`/api/users/${forum.author}`,{});
        const json1 = await response.json();
        forum.authorName = json1.name;
        forum.Avatar = json1.avatarUrl;
      }
      else{
        forum.authorName = null
      }
    }
    console.log("test")
    console.log(mydata)
    setData(mydata)
  })
},[])

  function ToggleLike(props){
    const[like,setLike]=useState(props.like);
    const[dislike,setDislike]=useState(props.dislike);
    if(props.upvoters.includes(userid)===false && props.downvoters.includes(userid)===false)
    {
      var x ="disabled";
      var y="disabled";
    }
    else if(props.upvoters.includes(userid)===true && props.downvoters.includes(userid)===false)
    {
       x = "primary";
       y = "disabled";
    }
    else if(props.upvoters.includes(userid)===false && props.downvoters.includes(userid)===true)
    {
       x = "disabled";
       y= "primary";
    }
    else
    {
      console.log("error1");

    }
    const[bg,setBg]=useState(x);
    const[bg1,setBg1]=useState(y);
    const handleLike = e => {
        axios.post(`/api/forum/${props._id}/upvote`)
        .then(function(response){
          console.log("Like Uploaded!")
        })
        if( bg === "disabled" )
        {
          if(bg1 === "primary")
            {
              setBg1("disabled");
              setDislike(dislike-1);
            }
            else
            {
              console.log("dislike was already disabled")
            }
        const like1 = like +1; 
        setLike(like1);
        setBg("primary");
        }
        else
        {
          const like2 = like-1;
          setLike(like2);
          setBg("disabled");
        }
      }
      const handleDislike = e => {
          axios.post(`/api/forum/${props._id}/downvote`)
          .then(function(response){
            console.log("DisLike Uploaded!")
          })
          if( bg1 === "disabled" )
          {
            if(bg === "primary")
            {
              setBg("disabled");
              setLike(like-1);
            }
            else{
              console.log("bg was already disabled");
            }
          const dislike1 = dislike +1; 
          setDislike(dislike1);
          setBg1("primary");
          }
          else
          {
            const dislike2 = dislike-1;
            setDislike(dislike2);
            setBg1("disabled");
          }
        }
   
    return(
          <div>
          <IconButton onClick={handleLike} color={bg}>
            <ThumbUpIcon />
            <div className={classes.like}>{like}</div>
        </IconButton>
        <IconButton  onClick= {handleDislike} color={bg1}>
            <ThumbDownIcon />
            <div className={classes.like}>{dislike}</div>
        </IconButton>
      
      </div>
        )
  }
  
   const displayForum =() =>
  {
  return data.map(forum =>{
    
    return(
    <div className={classes.root} align="center"> 
    <Paper className={classes.forumpage} >
        <Card className={classes.card} variant={"outlined"}>
      <CardContent className={classes.cardcontent}>
        <div>
          <Typography className={classes.question} color="initial" align="left" gutterBottom>
            {forum.title}
          </Typography>
        </div>
        <div>
      <Avatar className={classes.image} alt={forum.authorName} src={forum.Avatar} align="left"/>
    <Typography className={classes.username}>{forum.authorName}</Typography><br /><br />
      </div>
        <div className={classes.content}>
        <Typography variant="body1" align="left">
      {forum.text}
      </Typography>
      </div>

      </CardContent>
      <CardActions disableSpacing>
      <ToggleLike like={forum.upvoters.length} dislike={forum.downvoters.length} _id={forum._id} upvoters={forum.upvoters} downvoters={forum.downvoters}/>
      <Link classes={classes.link} to={`/single-forum/${forum._id}`} style={{ textDecoration: 'none' }}><IconButton><CommentIcon /> <div className={classes.like}>{forum.answers.length}</div></IconButton></Link>
      <IconButton style={{marginRight:"auto"}}>
          <ShareIcon />
      </IconButton>
      <div style={{marginLeft:"auto"}}>
      {forum.tags.map(tag => {
      return(
        <Button  disabled className={classes.button1} style={{ color: "#123800",}}>{tag.name}</Button>
      )
      })}
      </div>
        </CardActions>
        
    </Card>
    </Paper>
    </div>
    )
  }
  )}

  return(

    <div>
    {displayForum()}
    </div>
  )
}

function All(props) {
  const classes=useStyles();
  const[userid,setUserid]=useState(null);
  const [data, setData] = useState([])
  
  useEffect(() => {
    
    async function setDetails(){
        var storedUserData = await getUserInfo(null,null);
        try{
            setUserid(storedUserData.id);
           }
        catch(error){
            console.log(error)
        }
    }
    setDetails();
    axios.get('/api/forum').then(async(json) => {
    let mydata = json.data
    for (let forum of mydata){
      if(forum.author){
        const response = await fetch(`/api/users/${forum.author}`,{});
        const json1 = await response.json();
        forum.authorName = json1.name;
        forum.Avatar = json1.avatarUrl;
      }
      else{
        forum.authorName = null
      }
    }
    console.log("test")
    console.log(mydata)
    setData(mydata)
  })
},[])
  
function ToggleLike(props){
  const[like,setLike]=useState(props.like);
  const[dislike,setDislike]=useState(props.dislike);
  if(props.upvoters.includes(userid)===false && props.downvoters.includes(userid)===false)
  {
    var x ="disabled";
    var y="disabled";
  }
  else if(props.upvoters.includes(userid)===true && props.downvoters.includes(userid)===false)
  {
     x = "primary";
     y = "disabled";
  }
  else if(props.upvoters.includes(userid)===false && props.downvoters.includes(userid)===true)
  {
     x = "disabled";
     y= "primary";
  }
  else
  {
    console.log("error");

  }
  const[bg,setBg]=useState(x);
  const[bg1,setBg1]=useState(y);
  const handleLike = e => {
      axios.post(`/api/forum/${props._id}/upvote`)
      .then(function(response){
        console.log("Like Uploaded!")
      })
      if( bg === "disabled" )
      {
        if(bg1 === "primary")
          {
            setBg1("disabled");
            setDislike(dislike-1);
          }
          else
          {
            console.log("dislike was already disabled")
          }
      const like1 = like +1; 
      setLike(like1);
      setBg("primary");
      }
      else
      {
        const like2 = like-1;
        setLike(like2);
        setBg("disabled");
      }
    }
    const handleDislike = e => {
        axios.post(`/api/forum/${props._id}/downvote`)
        .then(function(response){
          console.log("DisLike Uploaded!")
        })
        if( bg1 === "disabled" )
        {
          if(bg === "primary")
          {
            setBg("disabled");
            setLike(like-1);
          }
          else{
            console.log("bg was already disabled");
          }
        const dislike1 = dislike +1; 
        setDislike(dislike1);
        setBg1("primary");
        }
        else
        {
          const dislike2 = dislike-1;
          setDislike(dislike2);
          setBg1("disabled");
        }
      }
 
  return(
        <div>
        <IconButton onClick={handleLike} color={bg}>
          <ThumbUpIcon />
          <div className={classes.like}>{like}</div>
      </IconButton>
      <IconButton  onClick= {handleDislike} color={bg1}>
          <ThumbDownIcon />
          <div className={classes.like}>{dislike}</div>
      </IconButton>
    
    </div>
      )
}
   const displayForum =() =>
  {
  return data.map(forum =>{
    if(forum.isAnswer==false)
    {
    return(
    <div className={classes.root} align="center"> 
    <Paper className={classes.forumpage} >
        <Card className={classes.card} variant={"outlined"}>
      <CardContent className={classes.cardcontent}>
        <div>
          <Typography className={classes.question} color="initial" align="left" gutterBottom>
            {forum.title}
          </Typography>
        </div>
        <div>
      <Avatar className={classes.image} alt={forum.authorName} src={forum.Avatar} align="left"/>
    <Typography className={classes.username}>{forum.authorName}</Typography><br /><br />
      </div>
        <div className={classes.content}>
        <Typography variant="body1" align="left">
      {forum.text}
      </Typography>
      </div>

      </CardContent>
      <CardActions disableSpacing>
      <ToggleLike like={forum.upvoters.length} dislike={forum.downvoters.length} _id={forum._id} upvoters={forum.upvoters} downvoters={forum.downvoters}/>
          {/* <CommentIcon /> */}
      <Link classes={classes.link} to={`/single-forum/${forum._id}`} style={{ textDecoration: 'none' }}><IconButton><CommentIcon /> <div className={classes.like}>{forum.answers.length}</div></IconButton></Link>
      <IconButton style={{marginRight:"auto"}}>
          <ShareIcon />
      </IconButton>
      <div style={{marginLeft:"auto"}}>
      {forum.tags.map(tag => {
      return(
        <Button  disabled className={classes.button1} style={{ color: "#123800",}}>{tag.name}</Button>
      )
      })}
      </div>
        </CardActions>
        
    </Card>
    </Paper>
    </div>
    

    )
    }
    else{
      return null
    }
  }
  )}

  return(

    <div>
    {displayForum()}
    </div>
  )
}
// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     'aria-controls': `full-width-tabpanel-${index}`,
//   };
// }

const AntTabs = withStyles({
  root: {
    borderBottom: '0px solid #124034',
    marginLeft:"80px"
  },
  indicator: {
    backgroundColor: '#124034',
  },
})(Tabs);


const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    marginLeft:"20px",
    fontSize:20,
    marginTop:10,
    // marginLeft:"100px",
    
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
      color: '#124034',
      opacity: 1,
    },
    '&$selected': {
      color: '#124034',
      fontWeight: theme.typography.fontWeightBold,
    },
    '&:focus': {
      color: '#124034',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

export default function Forum() {
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
    <Grid container spacing={1}> 
    <Grid item xs={4}>
          <Typography align="left" style={{color:"#124034",fontWeight:"bold",fontSize:"30px",float:"left",marginLeft:"100px"}}>Feed</Typography>
    </Grid>
    <Grid item xs={8}>
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
    </Grid>
    <div>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example" >
          <AntTab className="tabu" label="All" />
          <AntTab className="tabu" label="Recommended" />
          <AntTab className="tabu" label="Latest" />
        </AntTabs>
        <Typography className={classes.padding} />
      </div>
      </Grid>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <All />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <Recommended />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
       <Latest />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
