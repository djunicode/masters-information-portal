import React, { Component } from 'react';
import './List.css';
import img from './Profile.png'

class List extends Component {

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

    render() {

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
                <div id="chat_content" >
                    {this.state.chatList.map((chat) => (
                        <div className="each_conversation" >
                            <img className="profile-img" src={img} alt="eh" />
                            <a href="1" className="conversation-title" >{chat.name}</a>
                            <p className="conversation-snippet" >{chat.text}</p>
                            <br />
                            <hr />
                        </div>
                    ))}
                </div>

            </div>
        );
    }
}

export default List