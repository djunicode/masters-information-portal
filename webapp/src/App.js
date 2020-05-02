import React from 'react';
import RootRouter from './Components/router';
import Hidden from '@material-ui/core/Hidden';
import {MuiThemeProvider,createMuiTheme} from '@material-ui/core';
import {blue} from '@material-ui/core/colors';
import Cookies from 'js-cookie';
import './App.css';
const axios = require('axios');

const theme = createMuiTheme({
  palette: {
    primary: {
    	main: '#46BC99',
    	contrastText: '#fff'
    },
    secondary: blue,
  },
});

function App() {

  const [loggedIn, setLoggedIn] = React.useState(1);

  //Function to be called while Refreshing a token
  const handleTokenRefresh = () => {
    const refToken = Cookies.get('refreshToken')
    if(!refToken){
      setLoggedIn(0);
      return
    }
    else{
    console.log(1)
      axios.post('/api/users/refresh/',{
        refreshToken: refToken
      })
      .then(function(response){
        Cookies.set('jwt',response.data.token,{expires: 1});
        setLoggedIn(1);
      })
      .catch(function(error){
        setLoggedIn(0);
      });
    }
  };

  React.useEffect(()=>{
        const token = Cookies.get('jwt')
        if(!!token){
          axios.get('api/users/me/', {
            headers: {
              Authorization: token
            }
          })
          .then(function (response) {
            setLoggedIn(1);
          })
          .catch(function (error) {
            setLoggedIn(0);
          }); 
        }
        else{
            handleTokenRefresh();
        }
    },[loggedIn])

  return (
    <div className="App">
		  <MuiThemeProvider theme={theme}>
        <Hidden smDown implementation="css">
          <div style={{marginLeft:250}}>
    		    <RootRouter loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          </div>
        </Hidden>
        <Hidden smUp implementation="css">
          <RootRouter loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        </Hidden>
    	</MuiThemeProvider>
    </div>
  );
}

export default App;
