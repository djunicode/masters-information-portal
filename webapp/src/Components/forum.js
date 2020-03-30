import React from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
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
import ToggleButton from '@material-ui/lab/ToggleButton';





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
      marginTop:'10px',
      // minHeight:'500px',
      padding:'5px',
      maxWidth:'800px',
  },
  card:{
    margin:'10px',
  },
  cardcontent:{
    margin:"5px",
    float:'left',
  },
}));

export default function Forum() {
  
  const classes = useStyles();
  
  const [selected, setSelected] = React.useState(false);
  
  return (
    <div className={classes.root} align="center">
        
        
    <Paper component="form" className={classes.search}>
      <InputBase
        className={classes.input}
        placeholder="Search A Forum"
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
    <Paper className={classes.forumpage}>
        <Card className={classes.card} variant={"outlined"}>
      <CardContent className={classes.cardcontent}>
        <div className={classes.image} align="left">
          <Avatar alt="ABC" src="WP_Ironman-2560x1440_00000.jpg" />
        </div>

        <Typography color="initial" align="left"  gutterBottom>
          ABC
        </Typography>
        <Typography variant="body2" align="left">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>

      </CardContent>
      <CardActions disableSpacing>
      <ToggleButton
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
    >
      <ThumbUpIcon />
    </ToggleButton>
    
      <IconButton >
          <CommentIcon/>
      </IconButton>

      <IconButton>
          <ShareIcon />
      </IconButton>
        </CardActions>
    </Card>
    <Card className={classes.card} variant={"outlined"}>
      <CardContent className={classes.cardcontent}>
        <div className={classes.image} align="left">
          <Avatar alt="DEF" src="WP_Ironman-2560x1440_00000.jpg" />
        </div>

        <Typography color="initial" align="left"  gutterBottom>
          DEF
        </Typography>
        <Typography variant="body2" align="left">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>

      </CardContent>
      <CardActions disableSpacing>
      <ToggleButton
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
    >
      <ThumbUpIcon />
    </ToggleButton>
    
      <IconButton >
          <CommentIcon/>
      </IconButton>

      <IconButton>
          <ShareIcon />
      </IconButton>
        </CardActions>
    </Card>
    <Card className={classes.card} variant={"outlined"}>
      <CardContent className={classes.cardcontent}>
        <div className={classes.image} align="left">
          <Avatar alt="GHI" src="WP_Ironman-2560x1440_00000.jpg" />
        </div>

        <Typography color="initial" align="left"  gutterBottom>
          GHI
        </Typography>
        <Typography variant="body2" align="left">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>

      </CardContent>
      <CardActions disableSpacing>
      <ToggleButton
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
    >
      <ThumbUpIcon />
    </ToggleButton>
    
      <IconButton >
          <CommentIcon/>
      </IconButton>

      <IconButton>
          <ShareIcon />
          
      </IconButton>
        </CardActions>
    </Card>
    </Paper>
    </div>
    

  );
}
