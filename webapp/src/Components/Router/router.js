import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Login from '../../Pages/Login and Sign-up/login';
import Forum from '../forum';
import NavBar from '../Navbar/navbar';
import EditProfile from '../../Pages/Edit Profile/editProfile';
import Resources from '../resources';
import Messages from '../Messages';
import AddResource from '../AddResources';
import FullWidthTabs from '../profpage3';
import SearchProfiles from '../profile3';
import UniversityPage from '../universitypage'

function RootRouter(props){

    const renderLogin = () => <Login loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/>;
	const renderChat = () => <Messages loggedIn={props.loggedIn} />;
	const renderAddResource = () => <AddResource loggedIn={props.loggedIn} />;
	const invalidRoute = () => <Redirect to='/'/>;

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
				<Route exact path="/chat" component={renderChat} />
				<Route exact path="/add-resource" component={renderAddResource} />
	    <Route exact path='/search' component={SearchProfiles}/>
	    <Route exact path="/university" component={UniversityPage} />
				<Route component = {invalidRoute} />
            </Switch>
        </Router>
    );
}

export default RootRouter;
