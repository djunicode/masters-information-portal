import React, { Component} from 'react';

import './ConversationList.css';


class ConversationList extends Component {

  state = {
    chatList: [
      {
        name: "Nimit",
        text: "Hello world! This is a long message that needs to be truncated."
      },
      {
        name: "Nimit",
        text: "Hello world! This is a long message that needs to be truncated."
      },
      {
        name: "Nimit",
        text: "Hello world! This is a long message that needs to be truncated."
      },
      {
        name: "Nimit",
        text: "Hello world! This is a long message that needs to be truncated."
      },
    ]
  }
 
  render(){
  
    return (
      <div className="conversation-list">
        
        <h1 className="toolbar-title">Chats</h1>
        <div className="conversation-search">
        <input
          type="search"
          className="conversation-search-input"
          placeholder="Search Messages"
        />
      </div>
        
        {this.state.chatList.map((chat) => (
          <div className="each_conversation" >
              <p className="conversation-title" >{chat.name}</p>
              <p className="conversation-snippet" >{chat.text}</p>
              </div>
        ))}
         
      </div>
    );
  }
}

export default ConversationList