import React, { useState } from 'react';
import img from './Profile.png';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { Redirect } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
    textAlign: 'left',
    height: '100%',
    color: theme.palette.text.secondary,
    marginTop: 10,
    marginLeft: '5%',
    marginRight: '5%',
  },
  profile_img: {
    width: 70,
    borderRadius: 50,
  },
  profile_img_reply: {
    width: 50,
    borderRadius: 50,
  },
  main_ans: {
    fontSize: '20px',
  },
  button1: {
    color: '#123800',
    backgroundColor: '#8cd4af',
    fontWeight: 'bold',
    margin: '5px',
    opacity: '0.9',
    borderRadius: '5px',
    fontSize: '12px',
    minWidth: '100px',
  },
  like: {
    textAlign: 'left',
    color: 'black',
    fontFamily: 'arial',
    fontSize: '18px',
    marginLeft: '5px',
  },
  reply_para: {
    fontSize: '18px',
    marginTop: '0',
    marginBottom: '0px',
  },
  reply_box: {
    borderLeft: '5px solid #c3c7c4 ',
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '5px',
    marginTop: '0px',
  },
}));

function CustomLike(props) {
  const classes = useStyles();

  const [like, setLike] = useState(props.like);
  const [bg, setBg] = useState('disabled');
  const handleLike = (e) => {
    if (like === props.like) {
      const like1 = like + 1;
      setLike(like1);
      setBg('primary');
    } else {
      const like2 = like - 1;
      setLike(like2);
      setBg('disabled');
    }
  };
  return props.reply ? (
    <div>
      <IconButton onClick={handleLike} color={bg}>
        <ThumbUpIcon style={{ fontSize: '20px' }} />
        <div style={{ fontSize: '14px' }} className={classes.like}>
          {like}
        </div>
      </IconButton>
    </div>
  ) : (
    <div>
      <IconButton onClick={handleLike} color={bg}>
        <ThumbUpIcon />
        <div className={classes.like}>{like}</div>
      </IconButton>
    </div>
  );
}
function CustomDislike(props) {
  const classes = useStyles();

  const [dislike, setDislike] = useState(props.dislike);
  const [bg1, setBg1] = useState('disabled');
  const handleDislike = (e) => {
    if (dislike === props.dislike) {
      const dislike1 = dislike + 1;
      setDislike(dislike1);
      setBg1('secondary');
    } else {
      const dislike2 = dislike - 1;
      setDislike(dislike2);
      setBg1('disabled');
    }
  };
  return props.reply ? (
    <div>
      <IconButton onClick={handleDislike} color={bg1}>
        <ThumbDownIcon style={{ fontSize: '20px' }} />
        <div style={{ fontSize: '14px' }} className={classes.like}>
          {dislike}
        </div>
      </IconButton>
    </div>
  ) : (
    <div>
      <IconButton onClick={handleDislike} color={bg1}>
        <ThumbDownIcon />
        <div className={classes.like}>{dislike}</div>
      </IconButton>
    </div>
  );
}

function Questions_Detail(props) {
  const classes = useStyles();

  return props.loggedIn ? (
    <div>
      <Paper className={classes.paper}>
        <h1 style={{ marginBottom: '20px' }}>Question Question</h1>
        <Grid container spacing={1}>
          <Grid sm={1}>
            <img className={classes.profile_img} src={img} alt="eh" />
          </Grid>
          <Grid style={{ marginLeft: '2%' }} sm={4}>
            <h3 style={{ marginTop: '1px', marginBottom: '1px' }}>Lorem Ipsum</h3>
            <p style={{ marginTop: '1px' }}>March 1</p>
          </Grid>
        </Grid>
        <p className={classes.main_ans}>
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print,
          graphic or web designs. The passage is attributed to an unknown typesetter in the 15th
          century Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out
          print, graphic or web designs. The passage is attributed to an unknown typesetter in the
          15th century Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying
          out print, graphic or web designs. The passage is attributed to an unknown typesetter in
          the 15th century. The passage is attributed to an unknown typesetter in the 15th century
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print,
          graphic or web designs. The passage is attributed to an unknown typesetter in the 15th
          century.
        </p>
        <Grid spacing={1} style={{ marginTop: '30px' }} container>
          <Grid md={1}>
            <img className={classes.profile_img} src={img} alt="eh" />
          </Grid>
          <Grid style={{ marginLeft: '2%' }} md={8}>
            <TextField
              id="reply_text"
              multiline
              style={{
                width: '100%',
                marginBottom: '20px',
                borderRadius: '10px',
              }}
              rows={4}
              placeholder="Type something here"
              variant="filled"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid sm={2}>
            <Button variant="contained">Reply</Button>
          </Grid>
          <CustomLike reply={false} like={7} />
          <CustomDislike reply={false} dislike={0} />
          <IconButton>
            <CommentIcon />
          </IconButton>
          <IconButton style={{ marginRight: '150px' }}>
            <ShareIcon />
          </IconButton>
          <div>
            <Button disabled className={classes.button1} style={{ color: '#123800' }}>
              Javascript
            </Button>
            <Button disabled className={classes.button1} style={{ color: '#123800' }}>
              React
            </Button>
            <Button disabled className={classes.button1} style={{ color: '#123800' }}>
              Angular
            </Button>
            <Button disabled className={classes.button1} style={{ color: '#123800' }}>
              Vue
            </Button>
            <Button disabled className={classes.button1} style={{ color: '#123800' }}>
              Material UI
            </Button>
          </div>
        </Grid>

        {/*Reply Section*/}
        <hr />
        <div id="question_reply">
          <Grid style={{ marginTop: '30px', marginBottom: '5px' }} container>
            <Grid sm={1}>
              <img className={classes.profile_img_reply} src={img} alt="eh" />
            </Grid>
            <Grid sm={4}>
              <h4 style={{ marginTop: '1px', marginBottom: '1px' }}>Lorem Ipsum</h4>
              <p style={{ marginTop: '1px' }}>March 1</p>
            </Grid>
          </Grid>
          <p className={classes.reply_para} style={{}}>
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print,
            graphic or web designs. The passage is attributed to an unknown typesetter in the 15th
            century Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying
            out print, graphic or web designs. The passage is attributed to an unknown typesetter in
            the 15th century Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
            laying out print, graphic or web designs. The passage is attributed to an unknown
            typesetter in the 15th century. The passage is attributed to an unknown typesetter in
            the 15th century Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
            laying out print, graphic or web designs. The passage is attributed to an unknown
            typesetter in the 15th century.
          </p>

          <CardActions style={{ marginTop: '0', marginBottom: '0' }} disableSpacing>
            <Button>Reply</Button>
            <h3>3h</h3>
            <CustomLike reply={true} like={7} />
            <CustomDislike reply={true} dislike={0} />
          </CardActions>
        </div>

        <div class={classes.reply_box}>
          <div style={{ marginLeft: '5%' }}>
            <Grid style={{ marginTop: '30px', marginBottom: '5px' }} container>
              <Grid sm={1}>
                <img className={classes.profile_img_reply} src={img} alt="eh" />
              </Grid>
              <Grid sm={4}>
                <h4 style={{ marginTop: '1px', marginBottom: '1px' }}>Lorem Ipsum</h4>
                <p style={{ marginTop: '1px' }}>March 1</p>
              </Grid>
            </Grid>
            <p style={{ fontSize: '18px', marginTop: '0', marginBottom: '0' }}>
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out
              print, graphic or web designs. The passage is attributed to an unknown typesetter in
              the 15th century Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
              in laying out print, graphic or web designs. The passage is attributed to an unknown
              typesetter in the 15th century Lorem ipsum, or lipsum as it is sometimes known, is
              dummy text used in laying out print, graphic or web designs. The passage is attributed
              to an unknown typesetter in the 15th century. The passage is attributed to an unknown
              typesetter in the 15th century Lorem ipsum, or lipsum as it is sometimes known, is
              dummy text used in laying out print, graphic or web designs. The passage is attributed
              to an unknown typesetter in the 15th century.
            </p>
            <CardActions style={{ marginTop: '0', marginBottom: '0' }} disableSpacing>
              <Button>Reply</Button>
              <h3>3h</h3>
              <CustomLike reply={'true'} like={7} />
              <CustomDislike reply={'true'} dislike={0} />
            </CardActions>
          </div>
          <div style={{ marginLeft: '5%' }}>
            <Grid style={{ marginTop: '30px', marginBottom: '5px' }} container>
              <Grid sm={1}>
                <img className={classes.profile_img_reply} src={img} alt="eh" />
              </Grid>
              <Grid sm={4}>
                <h4 style={{ marginTop: '1px', marginBottom: '1px' }}>Lorem Ipsum</h4>
                <p style={{ marginTop: '1px' }}>March 1</p>
              </Grid>
            </Grid>
            <p style={{ fontSize: '18px', marginTop: '0', marginBottom: '0' }}>
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out
              print, graphic or web designs. The passage is attributed to an unknown typesetter in
              the 15th century Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
              in laying out print, graphic or web designs. The passage is attributed to an unknown
              typesetter in the 15th century Lorem ipsum, or lipsum as it is sometimes known, is
              dummy text used in laying out print, graphic or web designs. The passage is attributed
              to an unknown typesetter in the 15th century. The passage is attributed to an unknown
              typesetter in the 15th century Lorem ipsum, or lipsum as it is sometimes known, is
              dummy text used in laying out print, graphic or web designs. The passage is attributed
              to an unknown typesetter in the 15th century.
            </p>
            <CardActions style={{ marginTop: '0', marginBottom: '0' }} disableSpacing>
              <Button>Reply</Button>
              <h3>3h</h3>
              <CustomLike reply={'true'} like={7} />
              <CustomDislike reply={'true'} dislike={0} />
            </CardActions>
          </div>
        </div>
      </Paper>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default Questions_Detail;
