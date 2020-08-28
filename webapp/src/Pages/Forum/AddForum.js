import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getUserInfo } from '../../Helpers/fetchRequests.js';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
const token = Cookies.get('jwt');
const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
    color: '#124034',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    marginTop: 10,
    width: '70%',
    marginLeft: '15%',
  },
  textField: {
    width: '80%',
    marginBottom: '20px',
    borderRadius: '5px',
  },
  width: {
    width: '80%',
    textAlign: 'center',
  },
  title: {
    width: '50%',
    color: '#496961',
    float: 'left',
  },
  buttontext: {
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    width: '30%',
    marginLeft: '35%',
    height: 42,
    borderRadius: 25,
  },
}));

export default function AddForum(props) {
  const classes = useStyles();
  const [userid, setUserid] = useState(null);
  const [title1, setTitle1] = useState('');
  const [text1, setText1] = useState('');
  const [tags, setTags] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [tags1, setTags1] = useState([]);
  useEffect(() => {
    async function setDetails() {
      var storedUserData = await getUserInfo(null, null);
      try {
        setUserid(storedUserData.id);
      } catch (error) {
        console.log(error);
      }
    }
    setDetails();
    fetch('/api/tags')
      .then((data) => data.json())
      .then((val) => setTags(val));
  }, []);

  const handleTitle = (event) => {
    setTitle1(event.target.value);
  };
  const handleText = (event) => {
    setText1(event.target.value);
  };
  const handleTags = (event, values) => {
    for (let val of values) {
      setTags1([...tags1, val._id]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        '/api/forum',
        {
          title: title1,
          text: text1,
          isAnswer: false,
          author: userid,
          tags: tags1,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        setRedirect(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      {redirect ? <Redirect to="/forum" /> : null}
      {props.loggedIn ? (
        <Paper elevation={3} className={classes.paper}>
          <h1 className={classes.header}>Add Question</h1>
          <br />
          <br />

          <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={0}>
              <Grid classes={classes.title} item xs={4}>
                <h2>Title</h2>
              </Grid>
              <Grid classes={classes.width} item xs={7}>
                <TextField
                  className={classes.textField}
                  required
                  id="filled-basic"
                  label="Title"
                  variant="filled"
                  onChange={handleTitle}
                />
              </Grid>
              <hr className={classes.width} />
              <Grid classes={classes.title} item xs={4}>
                <h2>Description</h2>
              </Grid>
              <Grid classes={classes.width} item xs={7}>
                <TextField
                  className={classes.textField}
                  required
                  id="filled-multiline-static"
                  label="Description"
                  multiline
                  rows={7}
                  onChange={handleText}
                  variant="filled"
                />
              </Grid>
              <hr className={classes.width} />
              <Grid classes={classes.title} item xs={4}>
                <h2>Tags</h2>
              </Grid>
              <Grid classes={classes.width} item xs={7}>
                <Autocomplete
                  multiple
                  id="tags-filled"
                  options={tags}
                  getOptionLabel={(option) => option.name}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip color="primary" label={option.name} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="filled"
                      className={classes.textField}
                      label="Tags"
                      placeholder=""
                      multiline
                      rows={2}
                    />
                  )}
                  onChange={handleTags}
                />
              </Grid>

              <Button type="submit" color="primary" variant="contained" className={classes.button}>
                <Typography className={classes.buttontext}>ADD</Typography>
              </Button>
            </Grid>
          </form>
        </Paper>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}
