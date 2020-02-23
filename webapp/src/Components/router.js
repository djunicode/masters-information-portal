import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './login';
import NavBar from './navbar';
import MessageList from './MainMessenger/List/List'
import Messages from './MainMessenger/Messenger/index'

class RootRouter extends React.Component {
    state = {
        user: null,
        isLoggedIn: false
    };

    render() {
        return (
            <Router>
                <NavBar />
                <Switch>
                    <Route exact path='/' />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/chats' component={MessageList} />
                    <Route exact path='/chats/1' component={Messages} />
                </Switch>
            </Router>
        );
    }
}

export default RootRouter;
