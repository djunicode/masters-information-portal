import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './login';
import NavBar from './navbar';
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
                </Switch>
            </Router>
        );
    }
}

export default RootRouter;
