import React, { Component } from 'react'
import './style.css'

class Messages extends Component {
    render() {
        return (
            <div className="mess_div" >
                  <div class="wrapper">
                 <div class="message-content">
                 <ul>
                     <li class="received">
                         <p>Hello</p>
                     </li>
                {this.props.messages.map((message) => (
              
                     <li class="sent">
                         <p>{message.text}</p>
                     </li>
                     ))} 
                </ul>
                </div>
                </div>
                
                    
            </div>
        )
    }
}

export default Messages
