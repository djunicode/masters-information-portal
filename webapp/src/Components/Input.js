import React, { Component } from 'react'
import './style.css'
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';


class Input extends Component {


    render() {
        return (
            <div className="input_div" >
                <form onSubmit={this.props.getText} noValidate autoComplete="off">
                    
                    <TextField className="input" id="outlined-basic" label="Enter Text" variant="outlined" />
                    <IconButton aria-label="send">
                    <SendIcon onClick={this.props.getText} fontSize="large" />
                    </IconButton>
                    
                </form>
            </div>
        )
    }
}

export default Input
