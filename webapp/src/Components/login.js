import React from 'react';
import Register from './register.js';
import LoginSVGLogo from './loginLogo.js';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
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
    minHeight: 526,
    margin: 'auto',
    flexGrow: 1
  },
  textf: {
  	marginTop: 20
  }
}));

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
}


export default function LoginPage(){
	const classes = useStyles();
  	const [value, setValue] = React.useState(0);
  	const handleTabChange = (event, newValue) => {
    	setValue(newValue);
	};
	const [showPassword, setShowPassword] = React.useState(0);
	function togglePassword(){
		showPassword===0?setShowPassword(1):setShowPassword(0);
	}
	function handleRegisterClick(){
		setValue(1);
	}
    return (
    	<div>
    		<div className={classes.root}>
        		<AppBar position="static">
		        <Tabs 
		        	value={value} 
		        	TabIndicatorProps={{
					    style: {
					      backgroundColor: "#FFFFFF",
					      height: '5px'
					    }
					}} 
					variant="fullWidth" 
					onChange={handleTabChange} 
					aria-label="simple tabs example"
				>
		          <Tab label="Log In" {...a11yProps(0)} />
		          <Tab label="Sign Up" {...a11yProps(1)} />
		        </Tabs>
		      </AppBar>
		      <TabPanel value={value} index={0}>
		      <Grid container alignItems="center" >
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
	        	New User? <Button onClick={handleRegisterClick}><Typography><b>Register</b></Typography></Button>
	        </Typography>
	        </Grid>
	      </Grid>
	      </TabPanel>
	      <TabPanel value={value} index={1}>
		      <Register/>
	      </TabPanel>
	    </div>
	</div>
    );
}

