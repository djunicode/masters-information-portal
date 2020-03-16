import React, { Component } from 'react';
import './Compose.css';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

class Compose extends Component {
  render() {
    return (
      <div className="compose">
        <form onSubmit={this.props.getText} noValidate autoComplete="off" >
          <TextField className="input" id="compose_input" label="Enter Text" variant="outlined" />
          <div className="icons" >
            <IconButton onClick={this.props.getText} aria-label="send">
              <SendIcon fontSize="large" />
            </IconButton>
          </div>
        </form>
      </div>
    );
  }
}
export default Compose