import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from '../../Pages/Login and Sign-up/login';
import Forum from '../forum';
import NavBar from '../Navbar/navbar';
import EditProfile from '../../Pages/Edit Profile/editProfile';
import Resources from '../resources';
import Messages from '../Messages';
import FullWidthTabs from '../profpage3'
function RootRouter(props){

    const renderLogin = () => <Login loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/>;

    return (
        <Router>
            <NavBar loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/>
            <Switch>
                <Route exact path='/' />
                <Route exact path='/login' component={renderLogin}/>
                <Route exact path='/profile' component={FullWidthTabs}/>
                <Route exact path='/edit' component={EditProfile}/>
                <Route exact path='/resources' component={Resources} />
                <Route exact path='/forum' component={Forum} />
                <Route exact path='/chat' component={Messages} />
            </Switch>
        </Router>
    );
}

export default RootRouter;
