import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './login';
import Forum from './forum';
import NavBar from './navbar';
import Messenger from './MainMessenger/Messenger/index'
import List from './MainMessenger/List/List'
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
                    <Route exact path='/profile' />
                    <Route exact path='/forum' component={Forum} />
                    <Route exact path='/chat' component={List} />
                    <Route exact path='/chat/1' component={Messenger} />
                </Switch>
            </Router>
        );
    }
}

export default RootRouter;
