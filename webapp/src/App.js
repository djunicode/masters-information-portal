import React from 'react';
import RootRouter from './Components/router';
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

  const [loggedIn, setLoggedIn] = React.useState(0);

  //Function to be called while Refreshing a token
  const handleTokenRefresh = () => {
    const refreshToken = Cookies.get('refreshToken')
    if(!refreshToken){
      return
    }
    else{
      axios.get('/api/users/refresh/',{
        headers: {
          Authorization: refreshToken
        }
      })
      .then(function(response){
        Cookies.set('jwt',response.data.token,{expires: 1});
        setLoggedIn(1);
      })
      .catch(function(error){
        console.log(error);
      });
    }
  }

  React.useEffect(()=>{
        const token = Cookies.get('jwt');
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
            console.log(error);
            setLoggedIn(0);
          }); 
        }
        else{
            setLoggedIn(0);
            handleTokenRefresh();
        }
    })

  return (
    <div className="App">
		  <MuiThemeProvider theme={theme}>
    		<RootRouter loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    	</MuiThemeProvider>
    </div>
  );
}

export default App;
