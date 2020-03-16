import React, { Component } from 'react';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';
import Compose from '../Compose/index'

import './MessageList.css';

class MessageList extends Component {

  state = {
    messages: [
      {
        id: 1,
        text: "hello"
      },
    ]
  }
  getText = (e) => {
    e.preventDefault()
    var text = document.getElementById('compose_input').value
    console.log(text)
    if (text != '') {
      const newMessage = {
        text: text,
        id: 2
      }
      this.setState({ messages: [...this.state.messages, newMessage] })
      document.getElementById('compose_input').value = ''
    }

  }

  render() {

    return (
      <div className="message-list">

        <h1><a className="name" href="/profile/" >Random Person</a></h1>
        <div className="icons" >
          <IconButton area-label="info">
            <InfoIcon fontSize='large' color='primary' />
          </IconButton>
          <IconButton aria-label="list" >
            <ListIcon fontSize='large' />
          </IconButton>
        </div>
        <br /><br /><br />
        <div >
          <div className="message" >
            <div className="bubble-container">
              <div className="bubble" >
                <p className="message received" >laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium</p>
                {this.state.messages.map((message) => (
                  <p className="message mine" > {message.text} </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Compose getText={this.getText} />

      </div>



    );
  }
}

export default MessageList