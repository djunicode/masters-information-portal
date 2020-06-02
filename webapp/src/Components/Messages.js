import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MoodIcon from '@material-ui/icons/Mood';
import IconButton from '@material-ui/core/IconButton';
import Profileimg from './Profile.png';
import Typography from '@material-ui/core/Typography';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InputBase from '@material-ui/core/InputBase';
import SendIcon from '@material-ui/icons/Send';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import SearchIcon from '@material-ui/icons/Search';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import Modal from '@material-ui/core/Modal';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const axios = require('axios');
var io = require('socket.io-client');
var socket;
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    height: 630,
    color: theme.palette.text.secondary,
    margin: 0,
    overflowY: 'auto',
  },
  anch: {
    textDecoration: 'none',
    color: 'black',
    margin: 0,
  },
  search_form: {
    marginBottom: '30px',
    backgroundColor: '#eff0e9',
    padding: '5px',
    borderRadius: 5,
  },
  search: {
    marginLeft: '20px',
  },
  search_icon: {
    marginLeft: 10,
    marginTop: 2,
  },
  profile_img: {
    width: 70,
    borderRadius: 50,
    float: 'left',
    marginRight: 20,
  },
  chat_block: {
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: 90,
  },
  conversation: {
    height: 460,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    overflow: 'auto',
  },
  input_form: {
    backgroundColor: '#eff0e9',
    padding: 3,
    marginTop: 10,
    width: '100%',
    borderRadius: 5,
  },
  icon: {
    padding: 10,
    marginLeft: 5,
    fontSize: '20px',
  },
  input: {
    padding: 5,
    marginLeft: 5,
    width: '78%',
  },
  my_mess: {
    backgroundColor: '#e8effa',
    padding: '10px',
    borderRadius: 10,
    alignSelf: 'flex-end',
    width: '80%',
    wordWrap: 'break-word',
    margin: '4px',
  },
  recieved: {
    backgroundColor: '#eff0e9',
    padding: '10px',
    borderRadius: 10,
    width: '80%',
    wordWrap: 'break-word',
    margin: '4px',
  },
  info: {
    fontSize: '15px',
    marginLeft: '15px',
    fontWeight: 'bold',
  },
  time: {
    float: 'right',
    fontSize: '10px',
  },
}));

function Messages(props) {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [open, setOpen] = React.useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [users, setUsers] = useState([]);
  const [id, setId] = useState('1');
  const [messages, setMessages] = useState([]);
  const [activate, setActivate] = useState(true);
  const [info, setInfo] = useState();
  const [t, setT] = useState(false);

  useEffect(() => {
    socket = io.connect('http://localhost:3000');

    const token = Cookies.get('jwt');
    const headers = {
      Authorization: token,
    };
    axios
      .get('http://localhost:3000/api/chats', {
        headers: headers,
      })
      .then(async (res) => {
        console.log(res);
        await res.data.map((rec) => {
          console.log(rec);
          setUsers((users) => [
            ...users,
            {
              key: users.length,
              email: rec.profile.email,
              github: rec.profile.githubUrl,
              linkedin: rec.profile.linkedinUrl,
              name: rec.profile.name,
              id: rec.chatModel._id,
              bio: rec.profile.bio,
              img: `/api/users/${rec.profile._id}/avatar`,
              last: rec.chatModel.messages.slice(-1).pop(),
            },
          ]);
        });
      });

    var item = JSON.parse(localStorage.getItem('userDetails'));
    setId(item._id);
  }, []);

  useEffect(() => {
    var executed = false;
    if (!executed) {
      executed = true;
      console.log(t);
      socket.on('message', function (msg) {
        console.log('entered');
        console.log(msg);
        setMessages((messages) => [
          ...messages,
          {
            message: msg.message,
            sender_id: msg.sender,
            time: msg.time.substr(11, 5),
          },
        ]);
        console.log(messages);
        document.getElementById('compose_input').value = '';
        document.getElementById('box').lastChild.scrollIntoView(false);
      });
    }
  }, [t]);

  const getText = async (e) => {
    e.preventDefault();

    var text = document.getElementById('compose_input').value;
    if (text !== '') {
      const newMessage = text;
      socket.emit('message', newMessage);
      console.log('emmited');
      setT(!t);
      socket.on('status', (status) => {
        console.log(status);
      });

      console.log(id);
    }
  };

  const onEmojiClick = async (e, emojiObject) => {
    console.log('pressed');
    console.log(emojiObject.emoji);
    setChosenEmoji(emojiObject);
    await setText(emojiObject.emoji);
    // console.log(emoji);
    // setChosenEmoji(emojiObject.emoji);
    // setText(text.concat(chosenEmoji));

    console.log(text);
  };
  function handleChange(e) {
    var newText = e.target.value;
    setText(newText);
  }

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  const activateChat = async (e) => {
    socket.emit('disconnect');
    setMessages([]);
    console.log(id);
    console.log(messages);
    setActivate(false);
    const u = users.filter((u) => u.name === e.target.text)[0];
    setInfo({
      email: u.email,
      github: u.github,
      linkedin: u.linkedin,
      name: u.name,
      bio: u.bio,
      img: u.img,
      last: u.last,
    });
    console.log(info);
    const token = Cookies.get('jwt');

    //WEBSOCKET
    socket.emit('authenticate', token);
    socket.emit('open chat', u.id);

    if (messages.length >= 1) {
      console.log('present');
      var text = messages.slice(-1).pop();
      console.log(text);
    } else {
      console.log('msg hist');
      await socket.on('msg hist', (msg) => {
        msg.map((mess) => {
          setMessages((messages) => [
            ...messages,
            {
              message: mess.message,
              sender_id: mess.sender,
              time: mess.time.substr(11, 5),
            },
          ]);
        });
        setT(!t);

        document.getElementById('box').lastChild.scrollIntoView(false);
      });
    }

    console.log(messages);
  };

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      {props.loggedIn ? (
        activate ? (
          <Grid item xs={12} md={12}>
            <Paper className={classes.paper}>
              <div className={classes.search_form}>
                <SearchIcon className={classes.search_icon} />
                <InputBase className={classes.search} placeholder="Search" />
              </div>

              <div style={{ overflowX: 'auto' }}>
                {users.map((user) => (
                  <div className={classes.chat_block}>
                    <img
                      className="img"
                      className={classes.profile_img}
                      src={user.img}
                      onError={(user) => {
                        document.getElementsByClassName('img').src = Profileimg;
                      }}
                      alt="Avatar"
                    />

                    <h3 className={classes.anch}>
                      <a
                        id={user.key}
                        key={user.key}
                        onClick={activateChat}
                        className={classes.anch}
                        href="#"
                      >
                        {user.name}
                      </a>
                    </h3>
                    <Typography>
                      <span className={classes.time}>{user.last.time}</span>
                      <p style={{ width: '50%', overflow: 'hidden' }}>{user.last.message}</p>
                    </Typography>
                    <hr />
                  </div>
                ))}
              </div>
            </Paper>
          </Grid>
        ) : (
          <Grid container spacing={1}>
            <Grid xs={6} item md={3}>
              <Paper className={classes.paper}>
                <div style={{ textAlign: 'center' }}>
                  <img style={{ width: '225px' }} src={Profileimg} alt="eh" />
                  <h2>{Infinity.bio}</h2>
                </div>
                <hr />
                <div>
                  <h2>Information</h2>
                  <div style={{ margin: '5px' }}>
                    <LinkedInIcon />
                    <span className={classes.info}>{info.linkedin}</span>
                  </div>
                  <div style={{ margin: '5px' }}>
                    <GitHubIcon />
                    <span className={classes.info}>{info.github}</span>
                  </div>
                  <div style={{ margin: '5px' }}>
                    <MailOutlineIcon />
                    <span className={classes.info}>{info.email}</span>
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
              <Paper className={classes.paper}>
                <div className={classes.search_form}>
                  <SearchIcon className={classes.search_icon} />
                  <InputBase className={classes.search} placeholder="Search" />
                </div>

                <div style={{ overflowX: 'auto' }}>
                  {users.map((user) => (
                    <div className={classes.chat_block}>
                      <img className={classes.profile_img} src={user.img} alt="Avatar" />

                      <h3 className={classes.anch}>
                        <a
                          id={user.key}
                          key={user.key}
                          onClick={activateChat}
                          className={classes.anch}
                          href="#"
                        >
                          {user.name}
                        </a>
                      </h3>
                      <p>{user.last.message}</p>
                    </div>
                  ))}
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <h1>{info.name}</h1>
                <hr />
                <div id="box" className={classes.conversation}>
                  {messages.map((mess) =>
                    mess.sender_id == id ? (
                      <div className={classes.my_mess}>
                        <Typography>
                          {mess.message}
                          <span className={classes.time}>{mess.time}</span>
                        </Typography>
                      </div>
                    ) : (
                      <div className={classes.recieved}>
                        <Typography>
                          {mess.message}
                          <span className={classes.time}>{mess.time}</span>
                        </Typography>
                      </div>
                    )
                  )}
                </div>
                <form
                  className={classes.input_form}
                  onSubmit={getText}
                  noValidate
                  autoComplete="off"
                  style={{ float: 'right' }}
                >
                  <Grid container spacing={1}>
                    <Grid sm={9}>
                      <InputBase
                        id="compose_input"
                        className={classes.input}
                        placeholder="Write a message"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid sm={1}>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="icon-button-file"
                        type="file"
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton aria-label="upload picture" component="span">
                          <AttachFileIcon />
                        </IconButton>
                      </label>
                    </Grid>
                    <Grid sm={1}>
                      <IconButton onClick={handleOpen} className={classes.icon}>
                        <MoodIcon />
                      </IconButton>
                    </Grid>
                    <Grid sm={1}>
                      <IconButton type="submit" onClick={getText} className={classes.icon}>
                        <SendIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </form>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={open}
                  onClose={handleClose}
                >
                  <div>
                    <Picker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK} />]
                  </div>
                </Modal>
              </Paper>
            </Grid>
          </Grid>
        )
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default Messages;
