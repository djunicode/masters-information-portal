import React from 'react';
import Register from './register.js';
import LoginSVGLogo from './loginLogo.js';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Formik,Form} from 'formik';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
//Individual Imports to reduce bundle size

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
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

export default function LoginPage(){
	const classes = useStyles();
	const [showPassword, setShowPassword] = React.useState(0);
	function togglePassword(){
		showPassword===0?setShowPassword(1):setShowPassword(0);
	}
	const [register,setRegister] = React.useState(0);
    return (
		<div className={classes.root}>
    		{register===0?
		      <Grid container alignItems="center" style={{marginTop: 40}} justify="center">
		      	<Grid item md={6}>
		      		<LoginSVGLogo/>
		      	</Grid>
		      	<Grid item md={6}>
		      	<Typography variant="h4"><b>Login</b></Typography>
		        <Formik 
		        	initialValues={{ username: '', password: '' }}
		        	validate={values => {
			        const errors = {};
			        if (!values.username) {
			        	errors.username = "Required"
			        }
			        if (!values.password){
			        	errors.password = 'Required';
			        }
			        return errors;
			      }}
			      onSubmit={(values, { setSubmitting }) => {
			        setTimeout(() => {
			          setSubmitting(false);
			        }, 1000);
			        console.log(values);
			        //@Backend submit func for login
			    }}>
			    {({ isSubmitting ,handleChange,handleBlur,touched,errors}) => (
			    	<Form autoComplete="off"> 
			        	<TextField 
			        		name="username"
			        		label="Username/Email" 
			        		style = {{width: 300}}
			        		color="secondary" 
			        		variant="filled" 
			        		className={classes.textf}
			        		placeholder="Username or Email"
			        		onChange={handleChange}
			        		onBlur={handleBlur}
			        		helperText={touched.username?errors.username:''}
			        		error={!!errors.username&&touched.username}
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
	        	New User? <Button onClick={()=>setRegister(1)}><Typography><b>Register</b></Typography></Button>
	        </Typography>
	        </Grid>
	      </Grid>
	      :
	      <React.Fragment>
	      	<Register/>
        	<br/><Typography>Already have an account? <Button onClick={()=>setRegister(0)}><b>Sign In</b></Button></Typography>
	      </React.Fragment>

	  }
    </div>
    );
}

