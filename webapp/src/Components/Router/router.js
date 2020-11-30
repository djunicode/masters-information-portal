import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Login from '../../Pages/Login and Sign-up/login';
import Register from '../../Pages/Login and Sign-up/register';
import Forum from '../forum';
import NavBar from '../Navbar/navbar';
import EditProfile from '../../Pages/Edit Profile/editProfile';
import Resources from '../resources';
import Messages from '../../Pages/Messages/Messages';
import AddResource from '../../Pages/AddResource/AddResources';
import AddForum from '../AddForum';
import FullWidthTabs from '../../Pages/Profile Pages/ProfilePage';
import Home from '../../Pages/Homepage/home.js';
import SearchProfiles from '../../Pages/Search Page/SearchPage';
import UniversityPage from '../../Pages/University Page/UniversityPage';
import QuestionReply from '../QuestionReply';
import UserProfile from '../../Pages/Profile Pages/ProfileDetail';
import Singleforum from '../singleForum';

function RootRouter(props) {
  const [homepage, setHomepage] = React.useState(false);
  const renderLogin = () => <Login loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} />;
  const renderChat = () => <Messages loggedIn={props.loggedIn} />;
  const renderAddResource = () => <AddResource loggedIn={props.loggedIn} />;
  const renderAddForum = () => <AddForum loggedIn={props.loggedIn} />;
  const renderQuestionReply = () => <QuestionReply loggedIn={props.loggedIn} />;
  const renderHome = () => <Home setHomepage={setHomepage} />;
  const invalidRoute = () => <Redirect to="/" />;

  return (
    <Router>
      <NavBar
        loggedIn={props.loggedIn}
        setLoggedIn={props.setLoggedIn}
        homepage={homepage}
        setHomepage={setHomepage}
      />
      <Switch>
        <Route exact path="/" component={renderHome} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={renderLogin} />
        <Route exact path="/profile" component={FullWidthTabs} />
        <Route exact path="/edit" component={EditProfile} />
        <Route exact path="/resources" component={Resources} />
        <Route exact path="/forum" component={Forum} />
        <Route exact path="/single-forum/:id" component={Singleforum} />
        <Route exact path="/chat" component={renderChat} />
        <Route exact path="/add-forum" component={renderAddForum} />
        <Route exact path="/add-resource" component={renderAddResource} />
        <Route exact path="/search" component={SearchProfiles} />
         <Route exact path="/university/:uniName" component={UniversityPage} />
        <Route exact path="/question-reply" component={renderQuestionReply} />
        <Route exact path="/:profileID" component={UserProfile} />
        <Route component={invalidRoute} />
      </Switch>
    </Router>
  );
}

export default RootRouter;
