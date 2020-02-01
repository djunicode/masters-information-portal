import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Formik,Form} from 'formik';
import InputAdornment from '@material-ui/core/InputAdornment';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
//Individual Imports to reduce bundle size

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 500,
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
			        		variant="outlined" 
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
			        		variant="outlined" 
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
			        	/> <br/>
			        	<Button 
			        		type="submit" 
			        		disabled={isSubmitting}
			        		variant="contained" 
			        		color="primary" 
			        		className={classes.textf}
			        	> 
			        		Log In 
			        	</Button>
		        	</Form>
		        	)}
		        </Formik>
		      </TabPanel>
		      <TabPanel value={value} index={1}>
		      <Formik 
		      	validateOnChange={true}
		      	initialValues={{
	      			name:'',
	      			fname:'' ,
	      			lname:'',
	      			username:'', 
	      			email:'',
	      			password:'',
	      			password_confirm:'',
	      			loginAs:'Student',
	      			linkedIn: '',
	      			github: '',
	      			university: '',
	      			gradDate: '2020-01-01' 
	      		}}
		      	validate={values => {
		      	const errors = {};
			        if (!values.email) {
			          errors.email = 'Required';
			        } else if (
			          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
			        ) {
			          errors.email = 'Invalid email address';
			        }
			        if (!values.password){
			        	errors.password = 'Fill this field';
			        }
			        else if (values.password.length<8){
			        	errors.password = 'Password is too Short'
			        }
			        else if(values.password!==values.password_confirm && values.password_confirm!==''){
			        	errors.password = 'Password not matching';
			        }
			        if (!values.fname){
			        	errors.fname = "Fill this field"
			        }
			        if (!values.lname){
			        	errors.lname = "Fill this field"
			        }
			        if (!values.username){
			        	errors.username = "Fill this field"
			        }
			        if (!values.university&&values.loginAs==='Alumni'){
			        	errors.university = "Fill this field"
			        }
			        if (!values.gradDate&&values.loginAs==='Alumni'){
			        	errors.gradDate = "Fill this field"
			        }
			        if (values.linkedIn!==""&&!values.linkedIn.includes("linkedin")){
			        	errors.linkedIn = "Unrecognized LinkedIn link"
			        }
			        if (values.github!==""&&!values.github.includes("github")){
			        	errors.github = "Unrecognized Github link"
			        }
			        return errors;
			      }}
			      onSubmit={(values, { setSubmitting }) => {
			        setTimeout(() => {
			          setSubmitting(false);
			        }, 1000);
			        values.name=values.fname+" "+values.lname;
			        console.log(values);
			        //@Backend Submit Function for Sign-Up
			    }}
		      >
		      {({ isSubmitting ,handleChange,handleBlur,values,errors,touched}) => (
		      	<Form autoComplete="off">
			      <Grid container spacing={2}>
				      	<Grid item xs={6}>
				      		<TextField 
					      		name="fname" 
					      		color="secondary" 
					      		label="First Name"
					      		onChange={handleChange} 
					      		onBlur={handleBlur} 
					      		fullWidth
					      		error={!!errors.fname&&touched.fname}
					      		helperText={touched.fname?errors.fname:''}
					      	/> 
			      	</Grid>
		      		<Grid item xs={6}>
						<TextField 
							name="lname" 
							color="secondary" 
							label="Last Name"
							 onChange={handleChange} 
							 onBlur={handleBlur} 
							 fullWidth
							 error={!!errors.lname&&touched.lname}
							 helperText={touched.lname?errors.lname:''}
						 />
					</Grid>		
				</Grid>	 
				<TextField 
					name="username"
					fullWidth
					label="Username" 
					placeholder="Enter your Username" 
					color="secondary"
					className={classes.textf}
	        		onChange={handleChange}
	        		onBlur={handleBlur}
	        		error={!!errors.username&&touched.username}
	        		helperText={touched.username?errors.username:''}
				/> 
				<TextField 
					name="email"
					type="email" 
					fullWidth
					label="Email" 
					placeholder="example@domain.com" 
					color="secondary"
					className={classes.textf}
	        		onChange={handleChange}
	        		onBlur={handleBlur}
	        		error={!!errors.email&&touched.email}
	        		helperText={touched.email?errors.email:''}
				/> 
				<TextField 
					name="password"
					type="password" 
					color="secondary" 
					label="Password" 
					fullWidth
					variant="outlined" 
					placeholder="Enter your password" 
	        		onChange={handleChange}
	        		onBlur={handleBlur}
					className={classes.textf}
					error={!!errors.password&&touched.password}
					helperText={touched.password?errors.password:'Minimum 8 charecters'}
				/> 
				<TextField 
					name="password_confirm"
					type="password" 
					color="secondary" 
					label="Confirm Password" 
					fullWidth
					variant="outlined" 
					placeholder="Re-Enter your password" 
	        		onChange={handleChange}
	        		onBlur={handleBlur}
					className={classes.textf}
				/> 
				<br/>
				<Grid container className={classes.textf}>
					<Grid item xs={4}>
						<Typography>Join as: </Typography>
					</Grid>
					<Grid item xs={8}>
						<TextField 
							select 
							value={values.loginAs} 
							color="secondary" 
							name="loginAs" 
							onChange={handleChange} 
							onBlur={handleBlur} 
							fullWidth
						>
							<MenuItem value="Student">Student</MenuItem>
							<MenuItem value="Alumni">Alumni</MenuItem>
						</TextField><br/>
					</Grid>
				</Grid>
				{values.loginAs==='Alumni'?
					<React.Fragment>
						<TextField 
							name="university"
							color="secondary" 
							label="University" 
							fullWidth
							placeholder="Enter your MS University name" 
			        		onChange={handleChange}
			        		onBlur={handleBlur}
							className={classes.textf}
							error={!!errors.university&&touched.university}
							helperText={touched.university?errors.university:''}
						/> 
						<TextField 
							name="gradDate"
							color="secondary" 
							type="date"
							label="Graduation Date" 
							defaultValue="2020-01-01"	//Default value is needed here
							fullWidth
			        		onChange={handleChange}
			        		onBlur={handleBlur}
							className={classes.textf}
							error={!!errors.gradDate&&touched.gradDate}
							helperText={touched.gradDate?errors.gradDate:''}
						/> 
						<br/>
					</React.Fragment>
				:
					<React.Fragment>
					</React.Fragment>
				}
				<TextField 
					name="github"
					color="secondary"  
					fullWidth
					placeholder="Your Github Profile URL" 
	        		onChange={handleChange}
	        		onBlur={handleBlur}
					className={classes.textf}
					error={!!errors.github&&touched.github}
					helperText={touched.github?errors.github:"Optional Field"}
					InputProps={{
			          startAdornment: (
			            <InputAdornment position="start">
			              <GitHubIcon />
			            </InputAdornment>
			          ),
			        }}
				/> 
				<TextField 
					name="linkedIn"
					color="secondary" 
					fullWidth
					placeholder="Your LinkedIn Profile URL" 
	        		onChange={handleChange}
	        		onBlur={handleBlur}
					className={classes.textf}
					error={!!errors.linkedIn&&touched.linkedIn}
					helperText={touched.linkedIn?errors.linkedIn:"Optional Field"}
					InputProps={{
			          startAdornment: (
			            <InputAdornment position="start">
			              <LinkedInIcon />
			            </InputAdornment>
			          ),
			        }}
				/> 
				<Button 
					type="submit" 
					disabled={isSubmitting} 
					className={classes.textf} 
					variant="contained" 
					color="primary"
				>
					Sign Up
				</Button>
			</Form>
			)}
	        </Formik>
	      </TabPanel>
	    </div>
	</div>
    );
}

