import React from 'react';
import RootRouter from './Components/router';
import {MuiThemeProvider,createMuiTheme} from '@material-ui/core';
import {blue} from '@material-ui/core/colors';
import './App.css';

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
  return (
    <div className="App">
		  <MuiThemeProvider theme={theme}>
    		<RootRouter/>
    	</MuiThemeProvider>
    </div>
  );
}

export default App;
