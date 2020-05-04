import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: 10,
    width: '70%',
    marginLeft: '15%',
  },
  textField: {
    width: '100%',
    marginBottom: '20px',
    borderRadius: '5px',
  },
  width: {
    width: '80%',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 42,
    borderRadius: 25,
    backgroundColor: '#46BC99',
  },
}));

export default function AddResources(props) {
  const classes = useStyles();
  const isMobileView = useMediaQuery('(min-width:450px)');

  return (
    <div>
      {props.loggedIn ? null : <Redirect to="/" />}

      <Paper className={classes.paper}>
        <h1 className={classes.header}>Add Resources</h1>
        <br />
        <hr className={classes.width} />
        <br />
        <Grid container spacing={1}>
          <Grid alignItems="center" classes={classes.width} item xs={6}>
            <h2>Details</h2>
          </Grid>
          <Grid classes={classes.width} item xs={6}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                className={classes.textField}
                id="filled-basic"
                label="Title"
                variant="filled"
              />
              <br />

              <TextField
                className={classes.textField}
                id="filled-multiline-static"
                label="Description"
                multiline
                rows={7}
                variant="filled"
              />
              <br />
              <TextField
                className={classes.textField}
                id="filled-basic"
                label="Link"
                variant="filled"
              />
              <br />

              <TextField
                className={classes.textField}
                id="filled-basic"
                label="Type"
                variant="filled"
              />
              <br />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <IconButton aria-label="upload picture" component="span">
                  <CloudUploadOutlinedIcon style={{ height: '80px', width: '80px' }} />
                </IconButton>
              </label>
              <br />
              <Button type="submit" variant="contained" className={classes.button}>
                Add
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
