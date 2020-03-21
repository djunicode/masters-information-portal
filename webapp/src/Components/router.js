import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './login';
import Forum from './forum';
import NavBar from './navbar';
import EditProfile from './editProfile';
import Messenger from './MainMessenger/Messenger/index'
import List from './MainMessenger/List/List'
function RootRouter(props){

    const renderLogin = () => <Login loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/>;
    const renderEditProfile= () => <EditProfile loggedIn={props.loggedIn}/>;

    return (
        <Router>
            <NavBar loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/>
            <Switch>
                <Route exact path='/' />
                <Route exact path='/login' component={renderLogin}/>
                <Route exact path='/profile' />
                <Route exact path='/edit' component={renderEditProfile}/>
                <Route exact path='/forum' component={Forum} />
                <Route exact path='/chat' component={List} />
                <Route exact path='/chat/1' component={Messenger} />
            </Switch>
        </Router>
    );
}

export default RootRouter;
