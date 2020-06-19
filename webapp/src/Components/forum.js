import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme ,withStyles} from '@material-ui/core/styles';
import {getUserInfo} from '../Helpers/fetchRequests.js';
import axios from 'axios';
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
import checkLogin from '../Helpers/checkLogin';
// import ToggleButton from '@material-ui/lab/ToggleButton';
const token = Cookies.get('jwt');
let val = "";
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
    // backgroundColor:'#E5E5E5',
    flexGrow:1,
    // marginTop:0,
    
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  search:{
      // borderRadius:'25px',
      width:'300px',
      textAlign:"center",
      // margin:'5px',
      backgroundColor:"#F8F8F8",
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
    // maxWidth:1100,
    // float:'right',
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
      // marginTop:'10px',
      // minHeight:'500px',
      padding:'5px',
      maxWidth:'1000px',
      margin:"15px",
  },
  content:
  {
    textAlign:"left",

  },
  card:{
    margin:'10px',
  },
  cardcontent:{
    margin:"5px",
    float:'left',
    marginTop:"5px",
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
    marginTop:"5px",
    fontSize:"23px",
    fontWeight:"bold",
    fontFamily:"Arial"
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

}));

function Trending(props) {
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
    axios.get('/api/forum').then(json => setData(json.data))
  },[])
  

    function CustomLike(props){
      const [like, setLike] = useState(props.like);
      if(props.upvoters.includes(userid)==false)
      {
        var x = "disabled";
      }
      else
      {
        var x="secondary";
      }
      const[bg,setBg]=useState(x);
      const handleLike = e => {
      axios.post(`/api/forum/${props._id}/upvote`)
      .then(function(response){
        console.log("Like Uploaded!")
      })
      if( bg == "disabled" )
      {
      const like1 = like +1; 
      setLike(like1);
      setBg("secondary");
      }
      else
      {
        const like2 = like-1;
        setLike(like2);
        setBg("disabled");
      }
    }
      return(
        <div>
        <IconButton onClick={handleLike} color={bg}>
          <ThumbUpIcon />
          <div className={classes.like}>{like}</div>
      </IconButton>
    
    </div>
      )
    };
     function CustomDislike(props){
      const [dislike, setDislike] = useState(props.dislike);
      if(props.downvoters.includes(userid)==false)
      {
        var x = "disabled";
      }
      else
      {
        var x="secondary";
      }
      const[bg1,setBg1]=useState(x);
      const handleDislike = e => {
      axios.post(`/api/forum/${props._id}/downvote`)
      .then(function(response){
        console.log("DisLike Uploaded!")
      })
      if( bg1 == "disabled" )
      {
      const dislike1 = dislike +1; 
      setDislike(dislike1);
      setBg1("secondary");
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
        <IconButton onClick={handleDislike} color={bg1}>
          <ThumbDownIcon />
          <div className={classes.like}>{dislike}</div>
      </IconButton>
    </div>
      )
    };
  // const [selected, setSelected] = React.useState(false);
  
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
      <Avatar className={classes.image} alt="ABC" align="left"/>
      <Typography className={classes.username}>ABC</Typography><br /><br />
      </div>
        <div className={classes.content}>
        <Typography variant="body1" align="left">
      {forum.text}
      </Typography>
      </div>

      </CardContent>
      <CardActions disableSpacing>
      <CustomLike like={forum.upvoters.length} _id={forum._id} upvoters={forum.upvoters}/>
      <CustomDislike dislike={forum.downvoters.length} _id={forum._id} downvoters={forum.downvoters} />
      <IconButton >
          <CommentIcon/>
      </IconButton>
      <IconButton style={{marginRight:"auto"}}>
          <ShareIcon />
      </IconButton>
      <div style={{marginLeft:"auto"}}>
       {/* <Button disabled className={classes.button1} style={{ color: "#123800",}}>Javascript</Button>
      <Button  disabled className={classes.button1} style={{ color: "#123800",}}>React</Button>
      <Button  disabled className={classes.button1} style={{ color: "#123800",}}>Angular</Button>
      <Button  disabled className={classes.button1} style={{ color: "#123800",}}>Vue</Button>
      <Button  disabled className={classes.button1} style={{ color: "#123800",}}>{forum.tags.name}</Button>  */}
      {forum.tags.map(tag => {
        // <Button  disabled className={classes.button1} style={{ color: "#123800",}}>{tag.name}</Button>
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
function New(props) {
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
    axios.get('/api/forum').then(json => setData(json.data))
  },[])
  

    function CustomLike(props){
      const [like, setLike] = useState(props.like);
      if(props.upvoters.includes(userid)==false)
      {
        var x = "disabled";
      }
      else
      {
        var x="secondary";
      }
      const[bg,setBg]=useState(x);
      const handleLike = e => {
      axios.post(`/api/forum/${props._id}/upvote`)
      .then(function(response){
        console.log("Like Uploaded!")
      })
      if( bg == "disabled" )
      {
      const like1 = like +1; 
      setLike(like1);
      setBg("secondary");
      }
      else
      {
        const like2 = like-1;
        setLike(like2);
        setBg("disabled");
      }
    }
      return(
        <div>
        <IconButton onClick={handleLike} color={bg}>
          <ThumbUpIcon />
          <div className={classes.like}>{like}</div>
      </IconButton>
    
    </div>
      )
    };
     function CustomDislike(props){
      const [dislike, setDislike] = useState(props.dislike);
      if(props.downvoters.includes(userid)==false)
      {
        var x = "disabled";
      }
      else
      {
        var x="secondary";
      }
      const[bg1,setBg1]=useState(x);
      const handleDislike = e => {
      axios.post(`/api/forum/${props._id}/downvote`)
      .then(function(response){
        console.log("DisLike Uploaded!")
      })
      if( bg1 == "disabled" )
      {
      const dislike1 = dislike +1; 
      setDislike(dislike1);
      setBg1("secondary");
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
        <IconButton onClick={handleDislike} color={bg1}>
          <ThumbDownIcon />
          <div className={classes.like}>{dislike}</div>
      </IconButton>
    </div>
      )
    };
  // const [selected, setSelected] = React.useState(false);
  
   const displayForum =() =>
  {
    
     
  return data.map(forum =>{if(forum.author)
      {axios.get(`/api/users/${forum.author}`).then(response => response.json()).then((json) => {
        val = json.data
        console.log("data1",val.name)})
    }
        else
        {
          console.log("no author",forum._id);
        }
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
      <Avatar className={classes.image} alt="ABC" align="left"/>
    <Typography className={classes.username}>{val.name}</Typography><br /><br />
      </div>
        <div className={classes.content}>
        <Typography variant="body1" align="left">
      {forum.text}
      </Typography>
      </div>

      </CardContent>
      <CardActions disableSpacing>
      <CustomLike like={forum.upvoters.length} _id={forum._id} upvoters={forum.upvoters}/>
      <CustomDislike dislike={forum.downvoters.length} _id={forum._id} downvoters={forum.downvoters} />
      <IconButton >
          <CommentIcon/>
      </IconButton>
      <IconButton style={{marginRight:"auto"}}>
          <ShareIcon />
      </IconButton>
      <div style={{marginLeft:"auto"}}>
       {/* <Button disabled className={classes.button1} style={{ color: "#123800",}}>Javascript</Button>
      <Button  disabled className={classes.button1} style={{ color: "#123800",}}>React</Button>
      <Button  disabled className={classes.button1} style={{ color: "#123800",}}>Angular</Button>
      <Button  disabled className={classes.button1} style={{ color: "#123800",}}>Vue</Button>
      <Button  disabled className={classes.button1} style={{ color: "#123800",}}>{forum.tags.name}</Button>  */}
      {forum.tags.map(tag => {
        // <Button  disabled className={classes.button1} style={{ color: "#123800",}}>{tag.name}</Button>
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


// const  New=(props)=>{
//   const classes=useStyles();
  
//   function CustomLike(props){
//        const [like, setLike] = useState(props.like);
//       const[bg,setBg]=useState("disabled");
//     const handleLike = e => {

//       if(like===props.like)
//       {
//       const like1 = like +1; 
//       setLike(like1);
//       setBg("secondary");      
//       }
//       else
//       {
//         const like2 = like-1;
//         setLike(like2);
//         setBg("disabled");
//       }
//     }
//       return(
//         <div>
//         <IconButton onClick={handleLike} color={bg}>
//           <ThumbUpIcon />
//           <div className={classes.like}>{like}</div>
//       </IconButton>
    
//     </div>
//       )
//     };
//      function CustomDislike(props){
//        const [dislike, setDislike] = useState(props.dislike);
//       const[bg1,setBg1]=useState("disabled");
//     const handleDislike = e => {

//       if(dislike===props.dislike)
//       {
//       const dislike1 = dislike +1; 
//       setDislike(dislike1);
//       setBg1("secondary");      
//       }
//       else
//       {
//         const dislike2 = dislike-1;
//         setDislike(dislike2);
//         setBg1("disabled");
//       }
//     }
//       return(
//         <div>
//         <IconButton onClick={handleDislike} color={bg1}>
//           <ThumbDownIcon />
//          <div className={classes.like}>{dislike}</div>
//       </IconButton>
//     </div>
//       )
//     };
  
//   // const [selected, setSelected] = React.useState(false);
  
//   return (
//     <div className={classes.root} align="center">
        
    
//     <Paper className={classes.forumpage}>
//         <Card className={classes.card} variant={"outlined"}>
//       <CardContent className={classes.cardcontent}>
//         <div>
//         <Typography color="initial" align="left" className={classes.question} gutterBottom>
//         What is the best frontend language to use in a hackathon?
//         </Typography>

//         </div>
//         <div>
//       <Avatar alt="def" className={classes.image}  align="left"  />
//       <Typography className={classes.username}>def</Typography><br /><br />
//       </div>
//         <Typography variant="body2" align="left" >
//         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
//         unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
//         dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
//       </Typography>

//       </CardContent>
//       <CardActions disableSpacing>
//       <CustomLike like={55} />
//       <CustomDislike dislike={2} />
//       <IconButton>
//           <CommentIcon/>
//       </IconButton > 
//       <IconButton  style={{marginRight:"auto"}}>
//           <ShareIcon />
//       </IconButton>
//       <div style={{marginLeft:"auto"}}>
//       <Button disabled className={classes.button1} style={{ color: "#123800",}}>HTML</Button>
//       <Button disabled className={classes.button1} style={{ color: "#123800",}}>React</Button>
      
//       </div>
//         </CardActions>
//     </Card>
//     </Paper>

//     <Paper className={classes.forumpage}>
//         <Card className={classes.card} variant={"outlined"}>
//       <CardContent className={classes.cardcontent}>
//         <div>
//         <Typography color="initial" align="left" className={classes.question} gutterBottom>
//         What goes better with react,node or django?
//         </Typography>

//         </div>
//         <div>
//       <Avatar alt="DEF" className={classes.image}   align="left"  />
//       <Typography className={classes.username}>DEF</Typography><br /><br />
//       </div>
//         <Typography variant="body2" align="left" >
//         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
//         unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
//         dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
//       </Typography>

//       </CardContent>
//       <CardActions disableSpacing>
//       <CustomLike like={70} />
//       <CustomDislike dislike={19} />
//       <IconButton>
//           <CommentIcon/>
//       </IconButton > 
//       <IconButton  style={{marginRight:"auto"}}>
//           <ShareIcon />
//       </IconButton>
//       <div style={{marginLeft:"auto"}}>
//       <Button disabled className={classes.button1} style={{ color: "#123800",}}>Bootstrap</Button>
//       <Button disabled className={classes.button1} style={{ color: "#123800",}}>Android</Button>
//       <Button disabled className={classes.button1} style={{ color: "#123800",}}>React Native</Button>
//       </div>
//         </CardActions>
//     </Card>
//     </Paper>
   
//     <Paper className={classes.forumpage}>
//         <Card className={classes.card} variant={"outlined"}>
//       <CardContent className={classes.cardcontent}>
//         <div>
//         <Typography color="initial" align="left" className={classes.question} gutterBottom>
//           Can github be tedious to work on in a hackathon?
//         </Typography>

//         </div>
//         <div>
//       <Avatar alt="UVW" className={classes.image}  align="left"  />
//       <Typography className={classes.username}>UVW</Typography><br /><br />
//       </div>
//         <Typography variant="body2" align="left" >
//         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
//         unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
//         dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
//       </Typography>

//       </CardContent>
//       <CardActions disableSpacing>
//       <CustomLike like={27} />
//       <CustomDislike dislike={5} />
//       <IconButton>
//           <CommentIcon/>
//       </IconButton > 
//       <IconButton  style={{marginRight:"auto"}}>
//           <ShareIcon />
//       </IconButton>
//       <div style={{marginLeft:"auto"}}>
//       <Button disabled className={classes.button1} style={{ color: "#123800",}}>Github</Button>
      
//       </div>
//         </CardActions>
//     </Card>
//     </Paper>
    
    
//     </div>
    

//   );
// };

const  User=(props)=>{
  const classes=useStyles();
    function CustomLike(props){
       const [like, setLike] = useState(props.like);
      const[bg,setBg]=useState("disabled");
    const handleLike = e => {

      if(like===props.like)
      {
      const like1 = like +1; 
      setLike(like1);
      setBg("secondary");      
      }
      else
      {
        const like2 = like-1;
        setLike(like2);
        setBg("disabled");
      }
    }
      return(
        <div>
        <IconButton onClick={handleLike} color={bg}>
          <ThumbUpIcon />
          <div className={classes.like}>{like}</div>
      </IconButton>
    
    </div>
      )
    };
     function CustomDislike(props){
       const [dislike, setDislike] = useState(props.dislike);
      const[bg1,setBg1]=useState("disabled");
    const handleDislike = e => {

      if(dislike===props.dislike)
      {
      const dislike1 = dislike +1; 
      setDislike(dislike1);
      setBg1("secondary");      
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
        <IconButton onClick={handleDislike} color={bg1}>
          <ThumbDownIcon />
         <div className={classes.like}>{dislike}</div>
      </IconButton>
    </div>
      )
    };
  
  // const [selected, setSelected] = React.useState(false);
  
  return (
    <div className={classes.root} align="center">
        
    
    <Paper className={classes.forumpage}>
        <Card className={classes.card} variant={"outlined"}>
      <CardContent className={classes.cardcontent}>
        <div>
        <Typography color="initial" align="left"className={classes.question} gutterBottom>
        Will Iron Man return?
        </Typography>

        </div>
        <div>
      <Avatar  className={classes.image} alt="GHI" align="left"  />
      <Typography className={classes.username}>GHI</Typography><br /><br />
      </div>

        <Typography variant="body2" align="left" >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>

      </CardContent>
      <CardActions disableSpacing>
     <CustomLike like={50} />
     <CustomDislike dislike={16} />
      <IconButton >
          <CommentIcon/>
      </IconButton>

      <IconButton  style={{marginRight:"auto"}}>
          <ShareIcon />
      </IconButton>
      <div style={{marginLeft:"auto"}}>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>Mark 42</Button>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>Stark</Button>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>Endgame</Button>
      </div>
        </CardActions>
    </Card>
    </Paper>
        <Paper className={classes.forumpage}>
        <Card className={classes.card} variant={"outlined"}>
      <CardContent className={classes.cardcontent}>
        <div>
        <Typography color="initial" align="left"className={classes.question} gutterBottom>
          When will nova come in MCU?
        </Typography>

        </div>
        <div>
      <Avatar  className={classes.image} alt="ghi" align="left"  />
      <Typography className={classes.username}>ghi</Typography><br /><br />
      </div>

        <Typography variant="body2" align="left" >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>

      </CardContent>
      <CardActions disableSpacing>
     <CustomLike like={81} />
     <CustomDislike dislike={52} />
      <IconButton >
          <CommentIcon/>
      </IconButton>

      <IconButton  style={{marginRight:"auto"}}>
          <ShareIcon />
      </IconButton>
      <div style={{marginLeft:"auto"}}>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>MCU</Button>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>Nova</Button>
      </div>
        </CardActions>
    </Card>
    </Paper>
   
    
    
    </div>
    

  );
};
const  University=(props)=>{
  const classes=useStyles();
  function CustomLike(props){
       const [like, setLike] = useState(props.like);
      const[bg,setBg]=useState("disabled");
    const handleLike = e => {

      if(like===props.like)
      {
      const like1 = like +1; 
      setLike(like1);
      setBg("secondary");      
      }
      else
      {
        const like2 = like-1;
        setLike(like2);
        setBg("disabled");
      }
    }
      return(
        <div>
        <IconButton onClick={handleLike} color={bg}>
          <ThumbUpIcon />
          <div className={classes.like}>{like}</div>
      </IconButton>
    
    </div>
      )
    };
     function CustomDislike(props){
       const [dislike, setDislike] = useState(props.dislike);
      const[bg1,setBg1]=useState("disabled");
    const handleDislike = e => {

      if(dislike===props.dislike)
      {
      const dislike1 = dislike +1; 
      setDislike(dislike1);
      setBg1("secondary");      
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
        <IconButton onClick={handleDislike} color={bg1}>
          <ThumbDownIcon />
          <div className={classes.like}>{dislike}</div>
      </IconButton>
    </div>
      )
    };
  
  // const [selected, setSelected] = React.useState(false);
  
  return (
    <div className={classes.root} align="center">
        
    
    <Paper className={classes.forumpage}>
        <Card className={classes.card} variant={"outlined"}>
      <CardContent className={classes.cardcontent}>
        <div>
        <Typography color="initial" align="left" className={classes.question} gutterBottom>
        Is it that hard to make money?
        </Typography>

        </div>
        <div >
      <Avatar  className={classes.image}  alt="JKL" align="left" />
      <Typography className={classes.username}>JKL</Typography><br /><br />
      </div>

        <Typography variant="body2" align="left">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>

      </CardContent>
      <CardActions disableSpacing>
      <CustomLike like={99} />
      <CustomDislike dislike={12} />
      <IconButton >
          <CommentIcon/>
      </IconButton>

      <IconButton  style={{marginRight:"auto"}}>
          <ShareIcon />
      </IconButton>
      <div style={{marginLeft:"auto"}}>
      <Button disabled className={classes.button1}style={{ color: "#123800",}}>Python</Button>
     
      </div>
        </CardActions>
    </Card>
    </Paper>
    </div>
    

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
      <div className={classes.demo1}>
       
          <Grid>
          <Grid item xs = {3}></Grid>
          <Grid item xs = {9}>    
          <Typography align="left" style={{color:"#123800",fontWeight:"bold",fontSize:"30px",marginLeft:"10px"}}>Feed</Typography>
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
          <AntTab className="tabu" label="Trending" />
          <AntTab className="tabu" label="New" />
          <AntTab className="tabu" label="User" />
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
        <Trending />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <New style={{backgroundColor:'#E5E5E5'}} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
       <User />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
       <University />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
