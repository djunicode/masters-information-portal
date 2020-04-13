import React,{useState,Component} from 'react';
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
      margin:'5px',
      backgroundColor:"#F8F8F8",
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
  search:{
      borderRadius:'25px',
      width:'300px',

  },
  forumpage:{
      // marginTop:'10px',
      // minHeight:'500px',
      padding:'5px',
      maxWidth:'800px',
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
    marginTop:"5px"
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
    margin:"5px",
    opacity:"0.9",
    borderRadius:"5px",
    fontSize:"12px",
    minWidth:"100px"
  },

}));

function Trending() {
  const classes=useStyles();
    function CustomLike(props){
       const [like, setLike] = useState(props.like);
      const[bg,setBg]=useState("disabled");
    const handleLike = e => {

      if(like==props.like)
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

      if(dislike==props.dislike)
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
    <Paper className={classes.forumpage} >
        <Card className={classes.card} variant={"outlined"}>
      <CardContent className={classes.cardcontent}>
        <div>
          <Typography className={classes.question} color="initial" align="left" gutterBottom>
            What is better React or Angular?
          </Typography>
        </div>
        <div>
      <Avatar className={classes.image} alt="ABC" src="WP_Ironman-2560x1440_00000.jpg" align="left"/>
      <Typography className={classes.username}>ABC</Typography><br /><br />
      </div>
        <div className={classes.content}>
        <Typography variant="body1" align="left">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      </div>

      </CardContent>
      <CardActions disableSpacing>
      <CustomLike like={7} />
      <CustomDislike dislike={0} />
      <IconButton >
          <CommentIcon/>
      </IconButton>
      <IconButton style={{marginRight:"150px"}}>
          <ShareIcon />
      </IconButton>
      <div style={{marginLeft:"auto"}}>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>Javascript</Button>
      <Button  disabled className={classes.button1} style={{ color: "#123800",}}>React</Button>
      <Button  disabled className={classes.button1} style={{ color: "#123800",}}>Angular</Button>
      <Button  disabled className={classes.button1} style={{ color: "#123800",}}>Vue</Button>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>Material UI</Button>
      </div>
        </CardActions>
        
    </Card>
    </Paper>
    <Paper className={classes.forumpage}>
        <Card className={classes.card} variant={"outlined"}>
      <CardContent className={classes.cardcontent}>
        <div>
          <Typography className={classes.question} color="initial" align="left" gutterBottom>
            Is django the best backend framework?
          </Typography>
        </div>
        <div>
      <Avatar className={classes.image} alt="abc" src="WP_Ironman-2560x1440_00000.jpg" align="left"/>
      <Typography className={classes.username}>abc</Typography><br /><br />
      </div>
        <div className={classes.content}>
        <Typography variant="body1" align="left">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      </div>

      </CardContent>
      <CardActions disableSpacing>
      <CustomLike like={25} />
      <CustomDislike dislike={1} />
      <IconButton >
          <CommentIcon/>
      </IconButton>
      <IconButton style={{marginRight:"150px"}}>
          <ShareIcon />
      </IconButton>
      <div style={{marginLeft:"auto"}}>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>Django</Button>
      <Button  disabled className={classes.button1} style={{ color: "#123800",}}>Flask</Button>
      <Button  disabled className={classes.button1} style={{ color: "#123800",}}>Node</Button>
      </div>
        </CardActions>
        
    </Card>
    </Paper>
     <Paper className={classes.forumpage}>
        <Card className={classes.card} variant={"outlined"}>
      <CardContent className={classes.cardcontent}>
        <div>
          <Typography className={classes.question} color="initial" align="left" gutterBottom>
            Which code editor is best?
          </Typography>
        </div>
        <div>
      <Avatar className={classes.image} alt="XYZ" src="WP_Ironman-2560x1440_00000.jpg" align="left"/>
      <Typography className={classes.username}>XYZ</Typography><br /><br />
      </div>
        <div className={classes.content}>
        <Typography variant="body1" align="left">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      </div>

      </CardContent>
      <CardActions disableSpacing>
      <CustomLike like={101} />
      <CustomDislike dislike={45} />
      <IconButton >
          <CommentIcon/>
      </IconButton>
      <IconButton style={{marginRight:"150px"}}>
          <ShareIcon />
      </IconButton>
      <div style={{marginLeft:"auto"}}>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>Sublime</Button>
      <Button  disabled className={classes.button1} style={{ color: "#123800",}}>Vscode</Button>
      </div>
        </CardActions>
        
    </Card>
    </Paper>

    <Paper className={classes.forumpage} >
        <Card className={classes.card} variant={"outlined"}>
      <CardContent className={classes.cardcontent}>
        <div>
          <Typography className={classes.question} color="initial" align="left" gutterBottom>
            Will ML become an integral part of web development?
          </Typography>
        </div>
        <div>
      <Avatar className={classes.image} alt="ray" src="WP_Ironman-2560x1440_00000.jpg" align="left"/>
      <Typography className={classes.username}>ray</Typography><br /><br />
      </div>
        <div className={classes.content}>
        <Typography variant="body1" align="left">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      </div>

      </CardContent>
      <CardActions disableSpacing>
      <CustomLike like={90} />
      <CustomDislike dislike={12} />
      <IconButton >
          <CommentIcon/>
      </IconButton>
      <IconButton style={{marginRight:"150px"}}>
          <ShareIcon />
      </IconButton>
      <div style={{marginLeft:"auto"}}>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>Machine Learning</Button>
      <Button  disabled className={classes.button1} style={{ color: "#123800",}}>Web Development</Button>
      </div>
        </CardActions>
        
    </Card>
    </Paper>

    <Paper className={classes.forumpage}>
        <Card className={classes.card} variant={"outlined"}>
      <CardContent className={classes.cardcontent}>
        <div>
          <Typography className={classes.question} color="initial" align="left" gutterBottom>
              Scope of UI/UX?
          </Typography>
        </div>
        <div>
      <Avatar className={classes.image} alt="jake" src="WP_Ironman-2560x1440_00000.jpg" align="left"/>
      <Typography className={classes.username}>jake</Typography><br /><br />
      </div>
        <div className={classes.content}>
        <Typography variant="body1" align="left">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      </div>

      </CardContent>
      <CardActions disableSpacing>
      <CustomLike like={98} />
      <CustomDislike dislike={25} />
      <IconButton >
          <CommentIcon/>
      </IconButton>
      <IconButton style={{marginRight:"150px"}}>
          <ShareIcon />
      </IconButton>
      <div style={{marginLeft:"auto"}}>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>UI/UX</Button>
   
      </div>
        </CardActions>
        
    </Card>
    </Paper>
   
    <Paper className={classes.forumpage}>
        <Card className={classes.card} variant={"outlined"}>
      <CardContent className={classes.cardcontent}>
        <div>
          <Typography className={classes.question} color="initial" align="left" gutterBottom>
           Which is more important,competitive coding or web development?
          </Typography>
        </div>
        <div>
      <Avatar className={classes.image} alt="AMY" src="WP_Ironman-2560x1440_00000.jpg" align="left"/>
      <Typography className={classes.username}>AMY</Typography><br /><br />
      </div>
        <div className={classes.content}>
        <Typography variant="body1" align="left">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      </div>

      </CardContent>
      <CardActions disableSpacing>
      <CustomLike like={25} />
      <CustomDislike dislike={29} />
      <IconButton >
          <CommentIcon/>
      </IconButton>
      <IconButton style={{marginRight:"150px"}}>
          <ShareIcon />
      </IconButton>
      <div style={{marginLeft:"auto"}}>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>competitive coding</Button>
      <Button  disabled className={classes.button1} style={{ color: "#123800",}}>Web Development</Button>
      </div>
        </CardActions>
        
    </Card>
    </Paper>

     <Paper className={classes.forumpage} >
        <Card className={classes.card} variant={"outlined"}>
      <CardContent className={classes.cardcontent}>
        <div>
          <Typography className={classes.question} color="initial" align="left" gutterBottom>
            When will be our exams cancel?
          </Typography>
        </div>
        <div>
      <Avatar className={classes.image} alt="student" src="WP_Ironman-2560x1440_00000.jpg" align="left"/>
      <Typography className={classes.username}>Student</Typography><br /><br />
      </div>
        <div className={classes.content}>
        <Typography variant="body1" align="left">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      </div>

      </CardContent>
      <CardActions disableSpacing>
      <CustomLike like={120} />
      <CustomDislike dislike={2} />
      <IconButton >
          <CommentIcon/>
      </IconButton>
      <IconButton style={{marginRight:"150px"}}>
          <ShareIcon />
      </IconButton>
      <div style={{marginLeft:"auto"}}>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>COVID-19</Button>
      </div>
        </CardActions>
        
    </Card>
    </Paper>
     
    
    </div>
    

  );
};


const  New=(props)=>{
  const classes=useStyles();
  
  function CustomLike(props){
       const [like, setLike] = useState(props.like);
      const[bg,setBg]=useState("disabled");
    const handleLike = e => {

      if(like==props.like)
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

      if(dislike==props.dislike)
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
        What is the best frontend language to use in a hackathon?
        </Typography>

        </div>
        <div>
      <Avatar alt="def" className={classes.image}  src="WP_Ironman-2560x1440_00000.jpg" align="left"  />
      <Typography className={classes.username}>def</Typography><br /><br />
      </div>
        <Typography variant="body2" align="left" >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>

      </CardContent>
      <CardActions disableSpacing>
      <CustomLike like={55} />
      <CustomDislike dislike={2} />
      <IconButton>
          <CommentIcon/>
      </IconButton > 
      <IconButton  style={{marginRight:"150px"}}>
          <ShareIcon />
      </IconButton>
      <div style={{marginLeft:"auto"}}>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>HTML</Button>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>React</Button>
      
      </div>
        </CardActions>
    </Card>
    </Paper>

    <Paper className={classes.forumpage}>
        <Card className={classes.card} variant={"outlined"}>
      <CardContent className={classes.cardcontent}>
        <div>
        <Typography color="initial" align="left" className={classes.question} gutterBottom>
        What goes better with react,node or django?
        </Typography>

        </div>
        <div>
      <Avatar alt="DEF" className={classes.image}  src="WP_Ironman-2560x1440_00000.jpg" align="left"  />
      <Typography className={classes.username}>DEF</Typography><br /><br />
      </div>
        <Typography variant="body2" align="left" >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>

      </CardContent>
      <CardActions disableSpacing>
      <CustomLike like={70} />
      <CustomDislike dislike={19} />
      <IconButton>
          <CommentIcon/>
      </IconButton > 
      <IconButton  style={{marginRight:"150px"}}>
          <ShareIcon />
      </IconButton>
      <div style={{marginLeft:"auto"}}>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>Bootstrap</Button>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>Android</Button>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>React Native</Button>
      </div>
        </CardActions>
    </Card>
    </Paper>
   
    <Paper className={classes.forumpage}>
        <Card className={classes.card} variant={"outlined"}>
      <CardContent className={classes.cardcontent}>
        <div>
        <Typography color="initial" align="left" className={classes.question} gutterBottom>
          Can github be tedious to work on in a hackathon?
        </Typography>

        </div>
        <div>
      <Avatar alt="UVW" className={classes.image}  src="WP_Ironman-2560x1440_00000.jpg" align="left"  />
      <Typography className={classes.username}>UVW</Typography><br /><br />
      </div>
        <Typography variant="body2" align="left" >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>

      </CardContent>
      <CardActions disableSpacing>
      <CustomLike like={27} />
      <CustomDislike dislike={5} />
      <IconButton>
          <CommentIcon/>
      </IconButton > 
      <IconButton  style={{marginRight:"150px"}}>
          <ShareIcon />
      </IconButton>
      <div style={{marginLeft:"auto"}}>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>Github</Button>
      
      </div>
        </CardActions>
    </Card>
    </Paper>
    
    
    </div>
    

  );
};

const  User=(props)=>{
  const classes=useStyles();
    function CustomLike(props){
       const [like, setLike] = useState(props.like);
      const[bg,setBg]=useState("disabled");
    const handleLike = e => {

      if(like==props.like)
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

      if(dislike==props.dislike)
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
      <Avatar  className={classes.image} alt="GHI" src="WP_Ironman-2560x1440_00000.jpg" align="left"  />
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

      <IconButton  style={{marginRight:"150px"}}>
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
      <Avatar  className={classes.image} alt="ghi" src="WP_Ironman-2560x1440_00000.jpg" align="left"  />
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

      <IconButton  style={{marginRight:"150px"}}>
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

      if(like==props.like)
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

      if(dislike==props.dislike)
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
      <Avatar  className={classes.image}  alt="JKL" src="WP_Ironman-2560x1440_00000.jpg" align="left" />
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

      <IconButton  style={{marginRight:"150px"}}>
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
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

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
      <div className={classes.demo1}>
          <Grid>
          <Grid item xs = {5}></Grid>
          <Grid item xs = {7}>    
          <Typography align="left" style={{color:"#123800",fontWeight:"bold",fontSize:"25px"}}>Feed</Typography>
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
