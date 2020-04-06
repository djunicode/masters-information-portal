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
  dislike:{
    fontFamily:"arial",
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
  
  const [like, setLike] = useState(25);
  const[bg,setBg]=useState("disabled");
  const[bg1,setBg1]=useState("disabled");
    const [dislike,setDislike] = useState(7);
    const handleLike = e => {
      if(like==25)
      {
      const like1 = like +1; 
      setLike(like1);
      setBg("secondary");      
      }
      else
      {
        const like2=like-1;
        setLike(like2);
        setBg("disabled");
      }
    };
    const handleDislike = e => {
      if(dislike==7)
      {
        const dislike1 = dislike +1;  
        setDislike(dislike1);
        setBg1("secondary");
      }
      else{
        const dislike2=dislike-1;
        setDislike(dislike2)
        setBg1("disabled");
      }
      };
  
  // const [selected, setSelected] = React.useState(false);
  
  return (
    <div className={classes.root} align="center"> 
    <Paper className={classes.forumpage}>
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
      <IconButton onClick={handleLike} color={bg}>
          <ThumbUpIcon />
          
      </IconButton>
      <span className={classes.like}>{like}</span>
      <IconButton onClick={handleDislike} color={bg1}>
          <ThumbDownIcon/>
      </IconButton>
      <span className={classes.dislike}>{dislike}</span>
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
   
    
    
    </div>
    

  );
};


const  New=(props)=>{
  const classes=useStyles();
  
  const [like, setLike] = useState(15);
  const[bg,setBg]=useState("disabled");
  const[bg1,setBg1]=useState("disabled");
    const [dislike,setDislike] = useState(5);
    const handleLike = e => {
      if(like==15)
      {
      const like1 = like +1; 
      setLike(like1);
      setBg("secondary");
      }
      else
      {
        const like2=like-1;
        setLike(like2);
        setBg("disabled");
      }
    };
    const handleDislike = e => {
      if(dislike==5)
      {
        const dislike1 = dislike +1;  
        setDislike(dislike1);
        setBg1("secondary");
      }
      else{
        const dislike2=dislike-1;
        setDislike(dislike2)
        setBg1("disabled");
      }
      };
  
  // const [selected, setSelected] = React.useState(false);
  
  return (
    <div className={classes.root} align="center">
        
    
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
      <IconButton onClick={handleLike} color={bg}>
          <ThumbUpIcon />
          
      </IconButton>
      <span className={classes.like}>{like}</span>
      <IconButton onClick={handleDislike} color={bg1}>
          <ThumbDownIcon/>
      </IconButton>
      <span className={classes.dislike}>{dislike}</span>
      <IconButton  >
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
   
    
    
    </div>
    

  );
};

const  User=(props)=>{
  const classes=useStyles();
  
  const [like, setLike] = useState(32);
  const[bg,setBg]=useState("disabled");
  const[bg1,setBg1]=useState("disabled");
    const [dislike,setDislike] = useState(9);
    const handleLike = e => {
      if(like==32)
      {
      const like1 = like +1; 
      setLike(like1);
      setBg("secondary");
      }
      else
      {
        const like2=like-1;
        setLike(like2);
        setBg("disabled");
      }
    };
    const handleDislike = e => {
      if(dislike==9)
      {
        const dislike1 = dislike +1;  
        setDislike(dislike1);
        setBg1("secondary");
      }
      else{
        const dislike2=dislike-1;
        setDislike(dislike2)
        setBg1("disabled");
      }
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
      <IconButton onClick={handleLike} color={bg}>
          <ThumbUpIcon />
          
      </IconButton>
      <span className={classes.like} >{like}</span>
      <IconButton onClick={handleDislike} color={bg1}>
          <ThumbDownIcon/>
      </IconButton>
      <span className={classes.dislike}>{dislike}</span>
      <IconButton >
          <CommentIcon/>
      </IconButton>

      <IconButton  style={{marginRight:"150px"}}>
          <ShareIcon />
      </IconButton>
      <div style={{marginLeft:"auto"}}>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>Django</Button>
      <Button disabled className={classes.button1} style={{ color: "#123800",}}>Node</Button>
      </div>
        </CardActions>
    </Card>
    </Paper>
   
    
    
    </div>
    

  );
};
const  University=(props)=>{
  const classes=useStyles();
  
  const [like, setLike] = useState(71);
  const[bg,setBg]=useState("disabled");
  const[bg1,setBg1]=useState("disabled");
    const [dislike,setDislike] = useState(0);
    const handleLike = e => {
      if(like==71)
      {
      const like1 = like +1; 
      setLike(like1);
      setBg("secondary");
      }
      else
      {
        const like2=like-1;
        setLike(like2);
        setBg("disabled");
      }
    };
    const handleDislike = e => {
      if(dislike==0)
      {
        const dislike1 = dislike +1;  
        setDislike(dislike1);
        setBg1("secondary");
      }
      else{
        const dislike2=dislike-1;
        setDislike(dislike2)
        setBg1("disabled");
      }
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
      <IconButton onClick={handleLike} color={bg}>
          <ThumbUpIcon />
          
      </IconButton>
      <span className={classes.like}>{like}</span>
      <IconButton onClick={handleDislike} color={bg1}>
          <ThumbDownIcon/>
      </IconButton>
      <span className={classes.dislike}>{dislike}</span>
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
