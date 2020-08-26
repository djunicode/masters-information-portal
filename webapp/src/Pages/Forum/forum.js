import React, { useState, useEffect } from 'react';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { getUserInfo } from '../../Helpers/fetchRequests.js';
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

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3DA876',
      contrastText: '#fff',
    },
  },
});
theme = responsiveFontSizes(theme);

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
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  search: {
    width: '250px',
    textAlign: 'center',
    backgroundColor: '#F8F8F8',
    float: 'left',
    display: 'flex',
    marginLeft: '20px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const useStyles = makeStyles((theme) => ({
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

  forumpage: {
    padding: '5px',
    maxWidth: '1000px',
    margin: '15px',
  },
  content: {
    textAlign: 'left',
    marginRight: 'auto',
  },

  card: {
    margin: '10px',
  },
  like: {
    textAlign: 'left',
    color: 'black',
    fontFamily: 'arial',
    fontSize: '18px',
    marginLeft: '5px',
  },
  question: {
    fontWeight: 'bold',
    fontFamily: 'Arial',
    color: '#333333',
  },
  username: {
    float: 'left',
    marginLeft: '5px',
    paddingTop: '8px',
    color: '#333333',
  },
  image: {
    float: 'left',
  },
  button1: {
    backgroundColor: '#8cd4af',
    marginLeft: '5px',
    marginTop: '5px',
    marginRight: 'none',
    opacity: '0.9',
    borderRadius: '5px',
    float: 'right',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
}));

function Recommended(props) {
  const classes = useStyles();
  const [userid, setUserid] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function setDetails() {
      var storedUserData = await getUserInfo(null, null);
      try {
        setUserid(storedUserData.id);
        console.log(storedUserData.id);
      } catch (error) {
        console.log(error);
      }
    }
    setDetails();
    axios
      .get('/api/forum/recommended', {
        headers: {
          Authorization: token,
        },
      })
      .then(async (json) => {
        let mydata = json.data;
        for (let forum of mydata) {
          if (!forum.author) {
            forum.author = { name: '' };
            forum.avatar = '';
          } else {
            if (!forum.author.avatar) {
              forum.avatar = '';
            } else {
              forum.avatar = `/api/users/${forum.author._id}/avatar`;
            }
          }
        }
        console.log('test');
        console.log(mydata);
        setData(mydata);
      });
  }, []);

  function ToggleLike(props) {
    const [like, setLike] = useState(props.like);
    const [dislike, setDislike] = useState(props.dislike);
    if (props.upvoters.includes(userid) === false && props.downvoters.includes(userid) === false) {
      var x = 'disabled';
      var y = 'disabled';
    } else if (
      props.upvoters.includes(userid) === true &&
      props.downvoters.includes(userid) === false
    ) {
      x = 'primary';
      y = 'disabled';
    } else if (
      props.upvoters.includes(userid) === false &&
      props.downvoters.includes(userid) === true
    ) {
      x = 'disabled';
      y = 'primary';
    } else {
      console.log('error1');
    }
    const [bg, setBg] = useState(x);
    const [bg1, setBg1] = useState(y);
    const handleLike = (e) => {
      axios.post(`/api/forum/${props._id}/upvote`).then(function (response) {
        console.log('Like Uploaded!');
      });
      if (bg === 'disabled') {
        if (bg1 === 'primary') {
          setBg1('disabled');
          setDislike(dislike - 1);
        } else {
          console.log('dislike was already disabled');
        }
        const like1 = like + 1;
        setLike(like1);
        setBg('primary');
      } else {
        const like2 = like - 1;
        setLike(like2);
        setBg('disabled');
      }
    };
    const handleDislike = (e) => {
      axios.post(`/api/forum/${props._id}/downvote`).then(function (response) {
        console.log('DisLike Uploaded!');
      });
      if (bg1 === 'disabled') {
        if (bg === 'primary') {
          setBg('disabled');
          setLike(like - 1);
        } else {
          console.log('bg was already disabled');
        }
        const dislike1 = dislike + 1;
        setDislike(dislike1);
        setBg1('primary');
      } else {
        const dislike2 = dislike - 1;
        setDislike(dislike2);
        setBg1('disabled');
      }
    };

    return (
      <React.Fragment>
        <IconButton onClick={handleLike} color={bg}>
          <ThumbUpIcon />
          <div className={classes.like}>{like}</div>
        </IconButton>
        <IconButton onClick={handleDislike} color={bg1}>
          <ThumbDownIcon />
          <div className={classes.like}>{dislike}</div>
        </IconButton>
      </React.Fragment>
    );
  }

  const displayForum = () => {
    return data.map((forum) => {
      return (
        <div className={classes.root} align="center">
          <Paper className={classes.forumpage}>
            <Card className={classes.card} variant={'outlined'}>
              <ThemeProvider theme={theme}>
                <CardContent className={classes.cardcontent}>
                  <div>
                    <Typography
                      className={classes.question}
                      color="initial"
                      align="left"
                      variant="h5"
                      gutterBottom
                    >
                      {forum.title}
                    </Typography>
                  </div>
                  <div>
                    <Avatar
                      className={classes.image}
                      alt={forum.author.name}
                      src={forum.avatar}
                      align="left"
                    />
                    <Typography className={classes.username} variant="h6">
                      {forum.author.name}
                    </Typography>
                    <br />
                    <br />
                  </div>
                  <Typography className={classes.content} variant="body1" align="left">
                    {forum.text}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <ToggleLike
                    like={forum.upvoters.length}
                    dislike={forum.downvoters.length}
                    _id={forum._id}
                    upvoters={forum.upvoters}
                    downvoters={forum.downvoters}
                  />
                  <Link
                    classes={classes.link}
                    to={`/single-forum/${forum._id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <IconButton>
                      <CommentIcon /> <div className={classes.like}>{forum.answers.length}</div>
                    </IconButton>
                  </Link>
                  <IconButton>
                    <ShareIcon />
                  </IconButton>

                  <div style={{ marginLeft: 'auto' }}>
                    {forum.tags.map((tag) => {
                      return (
                        <Button disabled className={classes.button1} style={{ color: '#123800' }}>
                          <Typography variant="caption" style={{ fontWeight: 'bold' }}>
                            {tag.name}
                          </Typography>
                        </Button>
                      );
                    })}
                  </div>
                </CardActions>
              </ThemeProvider>
            </Card>
          </Paper>
        </div>
      );
    });
  };

  return <div>{displayForum()}</div>;
}

function Latest(props) {
  const classes = useStyles();
  const [userid, setUserid] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function setDetails() {
      var storedUserData = await getUserInfo(null, null);
      try {
        setUserid(storedUserData.id);
        console.log(storedUserData.id);
      } catch (error) {
        console.log(error);
      }
    }
    setDetails();
    axios.get('/api/forum?latest=5').then(async (json) => {
      let mydata = json.data;
      for (let forum of mydata) {
        if (!forum.author) {
          forum.author = { name: '' };
          forum.avatar = '';
        } else {
          if (!forum.author.avatar) {
            forum.avatar = '';
          } else {
            forum.avatar = `/api/users/${forum.author._id}/avatar`;
          }
        }
      }
      console.log('test');
      console.log(mydata);
      setData(mydata);
    });
  }, []);

  function ToggleLike(props) {
    const [like, setLike] = useState(props.like);
    const [dislike, setDislike] = useState(props.dislike);
    if (props.upvoters.includes(userid) === false && props.downvoters.includes(userid) === false) {
      var x = 'disabled';
      var y = 'disabled';
    } else if (
      props.upvoters.includes(userid) === true &&
      props.downvoters.includes(userid) === false
    ) {
      x = 'primary';
      y = 'disabled';
    } else if (
      props.upvoters.includes(userid) === false &&
      props.downvoters.includes(userid) === true
    ) {
      x = 'disabled';
      y = 'primary';
    } else {
      console.log('error1');
    }
    const [bg, setBg] = useState(x);
    const [bg1, setBg1] = useState(y);
    const handleLike = (e) => {
      axios.post(`/api/forum/${props._id}/upvote`).then(function (response) {
        console.log('Like Uploaded!');
      });
      if (bg === 'disabled') {
        if (bg1 === 'primary') {
          setBg1('disabled');
          setDislike(dislike - 1);
        } else {
          console.log('dislike was already disabled');
        }
        const like1 = like + 1;
        setLike(like1);
        setBg('primary');
      } else {
        const like2 = like - 1;
        setLike(like2);
        setBg('disabled');
      }
    };
    const handleDislike = (e) => {
      axios.post(`/api/forum/${props._id}/downvote`).then(function (response) {
        console.log('DisLike Uploaded!');
      });
      if (bg1 === 'disabled') {
        if (bg === 'primary') {
          setBg('disabled');
          setLike(like - 1);
        } else {
          console.log('bg was already disabled');
        }
        const dislike1 = dislike + 1;
        setDislike(dislike1);
        setBg1('primary');
      } else {
        const dislike2 = dislike - 1;
        setDislike(dislike2);
        setBg1('disabled');
      }
    };

    return (
      <React.Fragment>
        <IconButton onClick={handleLike} color={bg}>
          <ThumbUpIcon />
          <div className={classes.like}>{like}</div>
        </IconButton>
        <IconButton onClick={handleDislike} color={bg1}>
          <ThumbDownIcon />
          <div className={classes.like}>{dislike}</div>
        </IconButton>
      </React.Fragment>
    );
  }

  const displayForum = () => {
    return data.map((forum) => {
      return (
        <div className={classes.root} align="center">
          <Paper className={classes.forumpage}>
            <Card className={classes.card} variant={'outlined'}>
              <ThemeProvider theme={theme}>
                <CardContent className={classes.cardcontent}>
                  <div>
                    <Typography
                      className={classes.question}
                      color="initial"
                      align="left"
                      variant="h5"
                      gutterBottom
                    >
                      {forum.title}
                    </Typography>
                  </div>
                  <div>
                    <Avatar
                      className={classes.image}
                      alt={forum.author.name}
                      src={forum.avatar}
                      align="left"
                    />
                    <Typography className={classes.username} variant="h6">
                      {forum.author.name}
                    </Typography>
                    <br />
                    <br />
                  </div>
                  <Typography className={classes.content} variant="body1" align="left">
                    {forum.text}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <ToggleLike
                    like={forum.upvoters.length}
                    dislike={forum.downvoters.length}
                    _id={forum._id}
                    upvoters={forum.upvoters}
                    downvoters={forum.downvoters}
                  />
                  <Link
                    classes={classes.link}
                    to={`/single-forum/${forum._id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <IconButton>
                      <CommentIcon /> <div className={classes.like}>{forum.answers.length}</div>
                    </IconButton>
                  </Link>
                  <IconButton>
                    <ShareIcon />
                  </IconButton>

                  <div style={{ marginLeft: 'auto' }}>
                    {forum.tags.map((tag) => {
                      return (
                        <Button disabled className={classes.button1} style={{ color: '#123800' }}>
                          <Typography variant="caption" style={{ fontWeight: 'bold' }}>
                            {tag.name}
                          </Typography>
                        </Button>
                      );
                    })}
                  </div>
                </CardActions>
              </ThemeProvider>
            </Card>
          </Paper>
        </div>
      );
    });
  };

  return <div>{displayForum()}</div>;
}

function All(props) {
  const classes = useStyles();
  const [userid, setUserid] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function setDetails() {
      var storedUserData = await getUserInfo(null, null);
      try {
        setUserid(storedUserData.id);
        console.log(storedUserData.id);
      } catch (error) {
        console.log(error);
      }
    }
    setDetails();
    axios.get('/api/forum').then(async (json) => {
      let mydata = json.data;
      for (let forum of mydata) {
        if (!forum.author) {
          forum.author = { name: '' };
          forum.avatar = '';
        } else {
          if (!forum.author.avatar) {
            forum.avatar = '';
          } else {
            forum.avatar = `/api/users/${forum.author._id}/avatar`;
          }
        }
      }
      console.log('test');
      console.log(mydata);
      setData(mydata);
    });
  }, []);

  function ToggleLike(props) {
    const [like, setLike] = useState(props.like);
    const [dislike, setDislike] = useState(props.dislike);
    if (props.upvoters.includes(userid) === false && props.downvoters.includes(userid) === false) {
      var x = 'disabled';
      var y = 'disabled';
    } else if (
      props.upvoters.includes(userid) === true &&
      props.downvoters.includes(userid) === false
    ) {
      x = 'primary';
      y = 'disabled';
    } else if (
      props.upvoters.includes(userid) === false &&
      props.downvoters.includes(userid) === true
    ) {
      x = 'disabled';
      y = 'primary';
    } else {
      console.log('error1');
    }
    const [bg, setBg] = useState(x);
    const [bg1, setBg1] = useState(y);
    const handleLike = (e) => {
      axios.post(`/api/forum/${props._id}/upvote`).then(function (response) {
        console.log('Like Uploaded!');
      });
      if (bg === 'disabled') {
        if (bg1 === 'primary') {
          setBg1('disabled');
          setDislike(dislike - 1);
        } else {
          console.log('dislike was already disabled');
        }
        const like1 = like + 1;
        setLike(like1);
        setBg('primary');
      } else {
        const like2 = like - 1;
        setLike(like2);
        setBg('disabled');
      }
    };
    const handleDislike = (e) => {
      axios.post(`/api/forum/${props._id}/downvote`).then(function (response) {
        console.log('DisLike Uploaded!');
      });
      if (bg1 === 'disabled') {
        if (bg === 'primary') {
          setBg('disabled');
          setLike(like - 1);
        } else {
          console.log('bg was already disabled');
        }
        const dislike1 = dislike + 1;
        setDislike(dislike1);
        setBg1('primary');
      } else {
        const dislike2 = dislike - 1;
        setDislike(dislike2);
        setBg1('disabled');
      }
    };

    return (
      <React.Fragment>
        <IconButton onClick={handleLike} color={bg}>
          <ThumbUpIcon />
          <div className={classes.like}>{like}</div>
        </IconButton>
        <IconButton onClick={handleDislike} color={bg1}>
          <ThumbDownIcon />
          <div className={classes.like}>{dislike}</div>
        </IconButton>
      </React.Fragment>
    );
  }

  const displayForum = () => {
    return data.map((forum) => {
      if (forum.isAnswer === false) {
        return (
          <div className={classes.root} align="center">
            <Paper className={classes.forumpage}>
              <Card className={classes.card} variant={'outlined'}>
                <ThemeProvider theme={theme}>
                  <CardContent className={classes.cardcontent}>
                    <div>
                      <Typography
                        className={classes.question}
                        color="initial"
                        align="left"
                        variant="h5"
                        gutterBottom
                      >
                        {forum.title}
                      </Typography>
                    </div>
                    <div>
                      <Avatar
                        className={classes.image}
                        alt={forum.author.name}
                        src={forum.avatar}
                        align="left"
                      />
                      <Typography className={classes.username} variant="h6">
                        {forum.author.name}
                      </Typography>
                      <br />
                      <br />
                    </div>
                    <Typography className={classes.content} variant="body1" align="left">
                      {forum.text}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <ToggleLike
                      like={forum.upvoters.length}
                      dislike={forum.downvoters.length}
                      _id={forum._id}
                      upvoters={forum.upvoters}
                      downvoters={forum.downvoters}
                    />
                    <Link
                      classes={classes.link}
                      to={`/single-forum/${forum._id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <IconButton>
                        <CommentIcon /> <div className={classes.like}>{forum.answers.length}</div>
                      </IconButton>
                    </Link>
                    <IconButton>
                      <ShareIcon />
                    </IconButton>

                    <div style={{ marginLeft: 'auto' }}>
                      {forum.tags.map((tag) => {
                        return (
                          <Button disabled className={classes.button1} style={{ color: '#123800' }}>
                            <Typography variant="caption" style={{ fontWeight: 'bold' }}>
                              {tag.name}
                            </Typography>
                          </Button>
                        );
                      })}
                    </div>
                  </CardActions>
                </ThemeProvider>
              </Card>
            </Paper>
          </div>
        );
      } else {
        return null;
      }
    });
  };

  return <div>{displayForum()}</div>;
}
const AntTabs = withStyles({
  root: {
    borderBottom: '0px solid #124034',
    marginTop: '20px',
  },
  indicator: {
    backgroundColor: '#124034',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    marginLeft: 20,
    fontSize: 20,
    marginTop: 10,

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
}))((props) => <Tab disableRipple {...props} />);

export default function Forum() {
  const classes = useStyles1();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root} align="center">
      <Grid container spacing={1}>
        <Grid item md={1} xs={1}></Grid>
        <Grid item md={3}>
          <Typography
            align="left"
            style={{
              color: '#124034',
              fontWeight: 'bold',
              fontSize: '30px',
              float: 'left',
            }}
          >
            Feed
          </Typography>
        </Grid>
        <Grid item md={8}>
          <Paper elevation={0} variant="outlined" component="form" className={classes.search}>
            <InputBase className={classes.input} placeholder="Search A Forum" color="secondary" />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
      <div>
        <Grid>
          <Grid item md={1}></Grid>
          <Grid item md={11}>
            <AntTabs value={value} onChange={handleChange} aria-label="ant example">
              <AntTab className="tabu" label="All" />
              <AntTab className="tabu" label="Recommended" />
              <AntTab className="tabu" label="Latest" />
            </AntTabs>
          </Grid>
        </Grid>
      </div>

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
