import React from 'react';
import {ReactComponent as LoginSVGLogo} from '../../assets/svg/loginLogo.svg';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Formik,Form} from 'formik';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {Redirect,Link} from 'react-router-dom';
import Cookies from 'js-cookie';
//Individual Imports to reduce bundle size

const axios = require('axios');

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
    maxWidth: 1111,
    minHeight: 440,
    margin: 'auto',
    marginTop: 20,
    paddingTop: 10,
    marginBottom: 20,
    flexGrow: 1
  },
  textf: {
  	marginTop: 20
  }
}));

export default function LoginPage(props){
	const classes = useStyles();
	const [showPassword, setShowPassword] = React.useState(0);
	function togglePassword(){
		showPassword===0?setShowPassword(1):setShowPassword(0);
	}
    const [showWarning, setShowWarning] = React.useState(false);
    return (
		<div className={classes.root}>
			{props.loggedIn?<Redirect to='/' />:null}
	      <Grid container alignItems="center" style={{marginTop: 40}} justify="center">
	      	<Grid item md={6}>
	      		<LoginSVGLogo/>
	      	</Grid>
	      	<Grid item md={6}>
	      	<Typography variant="h4"><b>Login</b></Typography>
	        <Formik 
	        	initialValues={{ email: '', password: '' }}
	        	validate={values => {
		        const errors = {};
		        if (!values.email) {
		        	errors.email = "Required"
		        }
		        if (!values.password){
		        	errors.password = 'Required';
		        }
		        return errors;
		      }}
		      onSubmit={(values, { setSubmitting }) => {
		      	//Submit Function for login
		        axios.post('/api/users/login', {
			      email: values.email,
			      password: values.password
				  })
				  .then(function (response) {
				    Cookies.set('jwt',response.data.token,{expires: 1});
				    Cookies.set('refreshToken',response.data.refreshToken,{expires: 7})
				    props.setLoggedIn(1);
				  })
				  .catch(function (error) {
			        setTimeout(() => {
			          setSubmitting(false);
			        }, 1000);
				    setShowWarning(true);

				  });  
		    }}>
		    {({ isSubmitting ,handleChange,handleBlur,touched,errors}) => (
		    	<Form autoComplete="off"> 
		    		<Snackbar 
		              open={showWarning} 
		              autoHideDuration={750} 
		              onClose={()=>setShowWarning(false)}
		            >
		              <Alert variant="filled" severity="error">
					  	Invalid Email or Password
					  </Alert>
		            </Snackbar>
		        	<TextField 
		        		name="email"
		        		label="Email" 
		        		type="email"
		        		style = {{width: 300}}
		        		color="secondary" 
		        		variant="filled" 
		        		className={classes.textf}
		        		placeholder="Email"
		        		onChange={handleChange}
		        		onBlur={handleBlur}
		        		helperText={touched.email?errors.email:''}
		        		error={!!errors.email&&touched.email}
		        	/> <br/>
		        	<TextField 
		        		name="password" 
		        		type={showPassword ? 'text' : 'password'}
		        		color="secondary" 
		        		style = {{width: 300}}
		        		label="Password" 
		        		variant="filled" 
		        		placeholder="Enter your password" 
		        		className={classes.textf}
		        		onChange={handleChange}
		        		onBlur={handleBlur}
		        		error={!!errors.password&&touched.password}
		        		helperText={touched.password?errors.password:''}
		        		InputProps={{
				          endAdornment: (
				            <InputAdornment position="end">
				            	<IconButton
				                  aria-label="toggle password visibility"
				                  onClick={togglePassword}
				                >
				              	{showPassword ? <Visibility /> : <VisibilityOff />}
				              	</IconButton>
				            </InputAdornment>
				          ),
				        }}
		        	/> <br/><br/>
		        	<Button 
		        		type="submit" 
		        		disabled={isSubmitting}
		        		variant="contained" 
		        		color="primary" 
		        		style={{width:295,height:42,borderRadius:25}}
		        	> 
		        		Log In 
		        	</Button>
	        	</Form>
    		)}
	        </Formik><br/>	
	        <Typography>
	        	New User? <Link to='/register' style={{color:'#496961'}}><b>Register</b></Link>
	        </Typography>
        </Grid>
      </Grid>
    </div>
    );
}

