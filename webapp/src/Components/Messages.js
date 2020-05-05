import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MoodIcon from '@material-ui/icons/Mood';
import IconButton from '@material-ui/core/IconButton';
import img from './Profile.png';
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

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    height: 690,
    color: theme.palette.text.secondary,
    marginTop: 10,
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
    height: 520,
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
  },
  recieved: {
    backgroundColor: '#eff0e9',
    padding: '10px',
    borderRadius: 10,
  },
  info: {
    fontSize: '25px',
    marginLeft: '15px',
  },
}));

function Messages(props) {
  useEffect(() => {
    console.log(props.loggedIn);
  });

  const classes = useStyles();
  const [text, setText] = useState('');
  const [open, setOpen] = React.useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [people, setPeople] = useState([
    {
      name: 'John Philips',
    },
    {
      name: 'John Philips',
    },
    {
      name: 'Smith Wade',
    },
  ]);
  const [message, setMessage] = useState([
    {
      text: 'Hello',
      class: 'received',
    },
    {
      text: 'hey there',
      class: 'my_mess',
    },
    {
      text:
        'About Company: Pehchan is a one-stop solution for all your requirements of business gifts, recognition gifts, customizedt-shirts, uniforms, and all other promotional gift items. At Pehchan, we strive for ultimate customer satisfaction through high quality and prompt services. Our efforts are reflected inthe long-standing business relationship with our clients.',
      class: 'my_mess',
    },
  ]);

  async function getText(e) {
    e.preventDefault();
    console.log(message);
    var newtext = document.getElementById('compose_input').value;
    console.log(text);
    if (newtext !== '') {
      const newMessage = {
        text: newtext,
        class: 'my_mess',
      };
      await setMessage((message) => [...message, newMessage]);
      document.getElementById('compose_input').value = '';
      console.log(message);
    }
    await document.getElementById('box').lastChild.scrollIntoView(false);
  }
  const onEmojiClick = (e, emojiObject) => {
    console.log('pressed');
    setChosenEmoji(emojiObject);
    if (chosenEmoji) {
      setText(text + chosenEmoji.emoji);
    } else {
      setText(text);
    }
    // console.log(emoji);
    // setChosenEmoji(emojiObject.emoji);
    // setText(text.concat(chosenEmoji));

    console.log(text);
  };
  function handleChange(e) {
    var newText = e.target.value;
    setText(newText);
    console.log(text);
  }

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

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
        <Grid container spacing={1}>
          <Grid xs={6} item md={3}>
            <Paper className={classes.paper}>
              <div style={{ textAlign: 'center' }}>
                <img style={{ width: '225px' }} src={img} alt="eh" />
                <h2>UI/UX Designer</h2>
              </div>
              <hr />
              <div>
                <h2>Information</h2>
                <div style={{ margin: '5px' }}>
                  <LinkedInIcon />
                  <span className={classes.info}>John</span>
                </div>
                <div style={{ margin: '5px' }}>
                  <GitHubIcon />
                  <span className={classes.info}>John98</span>
                </div>
                <div style={{ margin: '5px' }}>
                  <MailOutlineIcon />
                  <span className={classes.info}>john@gmail.com</span>
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
                {people.map((each) => (
                  <div className={classes.chat_block}>
                    <img className={classes.profile_img} src={img} alt="eh" />
                    <h3 className={classes.anch}>
                      <a className={classes.anch} href="1">
                        {each.name}
                      </a>
                    </h3>
                    <p>This is a sample message.This is a sample message.</p>
                  </div>
                ))}
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <h1>John Philips</h1>
              <hr />
              <div id="box" className={classes.conversation}>
                {message.map((mess) =>
                  mess.class === 'my_mess' ? (
                    <p className={classes.my_mess}>{mess.text}</p>
                  ) : (
                    <p className={classes.recieved}>{mess.text}</p>
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
                <InputBase
                  id="compose_input"
                  className={classes.input}
                  placeholder="Write a message"
                  onChange={handleChange}
                />
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

                <IconButton onClick={handleOpen} className={classes.icon}>
                  <MoodIcon />
                </IconButton>

                <IconButton type="submit" onClick={getText} className={classes.icon}>
                  <SendIcon />
                </IconButton>
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
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default Messages;
