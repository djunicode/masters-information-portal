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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Cookies from 'js-cookie';
import { Link,Redirect } from 'react-router-dom';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
const token = Cookies.get('jwt');

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  root1:{
    flexGrow: 1,
    marginBottom:"10px",
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
  icon:{
    float:"left",
    marginTop:"135px",
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
    marginTop:"10px",
    color:"#4F4F4F"
  },
  textField: {
    width: '60%',
    borderRadius: '5px',
    float:"left",
    marginLeft:"10px",
    backgroundColor:"#F2F2F2",
  },
  card:{
    margin:'10px',
  },
  card1:{
    marginTop:"10px",
    marginLeft:"20px",
    marginRight:"20px"
  },
  cardcontent:{
    float:'left',
    minWidth:"1000px",
  },
  like:{
    textAlign:"left",
    color:"black",
    fontFamily:"arial",
    fontSize:"20px",
    marginLeft:"5px",
  },
  question:{
    fontSize:"32px",
    fontWeight:"bold",
    fontFamily:"Arial",
    color:"#333333"
  },
  username:{
    float:"left",
    fontSize:"16px",
    marginLeft:"5px",
    paddingTop:"8px",
    color:"#333333"
  },
  image:{
    float:"left",
  },
  usercomment:{
    marginTop:"20px"
  },
  replies:{
    float:"left",
    marginLeft:"10px",
    color:"#333333",
    marginTop:"5px",
    fontSize:"20px"
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

export default function Singleforum(props) {
  const classes=useStyles();
  const[userid,setUserid]=useState(null);
  const[user,setUser]=useState();
  const[comment,setComment]=useState([]);
  const[text1,setText1]=useState("");
  const[url,setUrl]=React.useState(null);
  const parent = props.match.params.id;
  let array =[];
  const [data, setData] = useState([])
  
  useEffect(() => {
    
    async function setDetails(){
        var storedUserData = await getUserInfo(null,null);
        try{
            setUserid(storedUserData.id);
            setUser(storedUserData);
            setUrl(`/api/users/${storedUserData.id}/avatar`);
           }
        catch(error){
            console.log(error)
        }
    }
    setDetails();
    axios.get(`/api/forum/${props.match.params.id}`)
    .then(async(json) => {
      let forum = json.data
      if(forum.author){
        const response = await fetch(`/api/users/${forum.author}`,{});
        const json1 = await response.json();
        forum.authorName = json1.name;
        forum.Avatar = json1.avatarUrl;
      }
      else{
        forum.authorName = null
      }
      setData([forum]);
      
      return forum
    })
    .then(async(response2)=> {
        const promises = response2.answers.map(val =>
        axios.get(`/api/forum/${val}`, {})
    );
        const results = await axios.all(promises)
        let mydata = results
        for (let forum of mydata){
          if(forum.data.author){
            const response = await fetch(`/api/users/${forum.data.author}`,{});
            const json1 = await response.json();
            forum.data.authorName = json1.name;
            forum.data.Avatar = json1.avatarUrl;
          }
          else{
            forum.authorName = null
          }
        }
        let mydata1 = mydata.reverse()
        setComment(mydata1); 
    }
        )  
      // .then(async(response2) => {response2.answers.map( val =>{
      //   axios.get(`/api/forum/${val}`)
      //     .then(async(response1) =>  {
      //       let forum = response1.data
      //       if(forum.author){
      //               const response = await fetch(`/api/users/${forum.author}`,{});
      //               const json1 = await response.json();
      //               forum.authorName = json1.name;
      //               forum.Avatar = json1.avatarUrl;
      //             }
      //       else{
      //               forum.authorName = null
      //       }          
      //       return (forum)
      //     })
      //     .then(response2 => array.push(response2)) 
      //   } 
      // )
      //   return (array)
      //   })
      // .then(response3 => setComment(response3))
      
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
 
  // const Author=(props)=>{
  // const response =  fetch(`/api/users/${props}`,{}).then(response1 => response1.json()).then(val => {
  //         return (
  //           <Typography className={classes.username}>{val.name}</Typography>
  //         )
  //       })
  // console.log(response)
  // }


  const displayComment=()=>
  {if(comment.length!=0)
    {
   return comment.map(forum=>{
      return(
        <div className={classes.root1} align="center"> 
          <Card className={classes.card1} variant="outlined" elevation={0}>
        <CardContent className={classes.cardcontent}>
          <div>
        <Avatar className={classes.image} align="left"/>
      <Typography className={classes.username}>{forum.data.authorName}</Typography><br /><br />
        </div>
        <div className={classes.content}>
        <Typography  variant="body1" align="left">
        {forum.data.text}
        </Typography>
        </div>
        </CardContent>
        <CardActions >
        <ToggleLike like={forum.data.upvoters.length} dislike={forum.data.downvoters.length} _id={forum.data._id} upvoters={forum.data.upvoters} downvoters={forum.data.downvoters}/>
        {/* <Link classes={classes.link} to={`/single-forum/${forum.data._id}`}><IconButton><CommentIcon /></IconButton></Link>  */}
        <IconButton onClick={event =>  window.location.href=`/single-forum/${forum.data._id}`}><CommentIcon /><div className={classes.like}>{forum.data.answers.length}</div></IconButton>
        <IconButton style={{marginRight:"auto"}}>
            <ShareIcon />
        </IconButton>
          </CardActions>
          
      </Card>
      </div>
      )
    })
  }
  else{
    return (
      <Typography variant="h6">No Comments Posted</Typography>
    )
  }
  }
  const handleText = (event) =>{
    setText1(event.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(text1);
    console.log(user.id);
    console.log(parent);
    axios.post('/api/forum', {
      parentId:parent,
      text:text1,
      isAnswer:true,
      author:userid
    },{
      headers:{
        Authorization : token
      }
    })
      .then(function (response) {
          console.log(response);
          window.location.reload(true);
        })
      .catch(function (error) {
          console.log(error)
      }) 
  }

    const displayForum =() =>
    { 
      return data.map(forum =>{
      return(
      <div className={classes.root} align="center"> 
      <Paper className={classes.forumpage} >
          <Card className={classes.card} elevation={0}>
        <CardContent className={classes.cardcontent}>
          <div>
            <Typography className={classes.question}  align="left" gutterBottom>
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
        <div className={classes.usercomment}>
        <Avatar className={classes.image} src={url} alt={user.name} align="left"/>
        <form className={classes.root}  autoComplete="off" onSubmit={handleSubmit}>
        <TextField
                  className={classes.textField}
                  required
                  id="outlined-multiline-static"
                  placeholder="Type Your Comment Here!"
                  multiline
                  onChange={handleText}
                  rows={7}
                  variant="outlined"
                />
         <IconButton type="submit" color="primary" className={classes.icon}><SendRoundedIcon /></IconButton>
         </form>
        </div>
        </CardContent>
        <CardActions disableSpacing>
        <ToggleLike like={forum.upvoters.length} dislike={forum.downvoters.length} _id={forum._id} upvoters={forum.upvoters} downvoters={forum.downvoters}/>
          <IconButton>  <CommentIcon color="primary"/><div className={classes.like}>{forum.answers.length}</div></IconButton>
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
          <Divider variant="middle" />
      <Typography className={classes.replies}>Comments</Typography>
      </Card>
     
      <div>{displayComment()}</div>
      </Paper>
      </div>
      )})
    }
    


  return(

    <div>
    {displayForum()}
    </div>
  )
}
