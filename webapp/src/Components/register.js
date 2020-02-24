import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';  
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import {Formik,Form,FieldArray} from 'formik';
import Stepper from '@material-ui/core/Stepper';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
const useStyles = makeStyles(theme => ({
  textf: {
  	marginTop: 20
  },
  box: {
  	marginLeft: 55,
  	marginRight: 55,
  },
  container: {
    paddingTop: 40,
    paddingBottom: 20,
  }
}));

function getSteps() {
  return ['Core Details', 'Other Details',];
}


export default function Register() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [skipped, setSkipped] = React.useState(new Set());
  const isStepOptional = step => {
    return step === 1;
  };
  const isStepSkipped = step => {
    return skipped.has(step);
  };
  const [showSuccess, setShowSuccess] = React.useState(false);
    const handleOpenMsg = () => {
      setShowSuccess(true);
  };
  const handleCloseMsg = () => {
    setShowSuccess(false);
  };
  const departments = ["Computers","IT","Mechanical","Bio-Med","Production","Electronics","EXTC","Chemical","Civil","Aeronautical","Mining","Agricultural","Metallurgical"];
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  
  return (
    <div className="App" style={{paddingTop:'45px'}}>
    	<Typography variant="h4" className={classes.header}><b>Register</b></Typography>
	    <div align="center">
		    <Stepper activeStep={activeStep} style={{width:500}}>
		        {steps.map((label, index) => {
		          const stepProps = {};
		          const labelProps = {};
		          if (isStepOptional(index)) {
		            labelProps.optional = <Typography variant="caption">Optional</Typography>;
		          }
		          if (isStepSkipped(index)) {
		            stepProps.completed = false;
		          }
		          return (
		            <Step key={label} {...stepProps}>
		              <StepLabel {...labelProps}>{label}</StepLabel>
		            </Step>
		          );
		        })}
		      </Stepper>
	      </div>
	      <Divider/>
	      <Box className={classes.box}>
    		{activeStep===0?
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
            university: '',
            department: '',
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
            if (!values.university){
              errors.university = "Fill this field"
            }
            if (!values.department){
              errors.department = "Fill this field"
            }
            if (!values.gradDate){
              errors.gradDate = "Fill this field"
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleOpenMsg();
            setTimeout(() => {
              setSubmitting(false);
              handleNext();
            }, 1000);
            values.name=values.fname+" "+values.lname;
            console.log(values);
            //@Backend Submit Function for Sign-Up
        }}
        >
        {({ isSubmitting ,handleChange,handleBlur,values,errors,touched,setFieldValue}) => (
          <Form autoComplete="off">
          <Snackbar 
          open={showSuccess} 
          autoHideDuration={750} 
          onClose={handleCloseMsg}
        >
        <Alert variant="filled" severity="success">
        Changes Saved!
      </Alert>
      </Snackbar>
          <Grid container>
            <Grid item md={6}>
              <Typography variant="h5" style={{paddingTop:40}}> Account </Typography>
            </Grid>
            <Grid item md={6}>
            <Grid container spacing={2} style={{paddingTop:30}}>
                <Grid item md={6}>
                  <TextField 
                    name="fname" 
                    label="First Name"
                variant="filled"
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    fullWidth
                    error={!!errors.fname&&touched.fname}
                    helperText={touched.fname?errors.fname:''}
                  /> 
                </Grid>
                <Grid item md={6}>
              <TextField 
                name="lname" 
                variant="filled"
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
            variant="filled"
            label="Username" 
            placeholder="Enter your Username"
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
            variant="filled"
            label="Email" 
            placeholder="example@domain.com" 
            className={classes.textf}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.email&&touched.email}
                helperText={touched.email?errors.email:''}
          /> 
          <TextField 
            name="password"
            type="password"  
            label="Password" 
            fullWidth
            variant="filled" 
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
            label="Confirm Password" 
            fullWidth
            variant="filled" 
            placeholder="Re-Enter your password" 
                onChange={handleChange}
                onBlur={handleBlur}
            className={classes.textf}
          /> 
        </Grid>
      </Grid>
      <br/>
      <Divider/>
      <Grid container>
            <Grid item md={6}>
              <Typography variant="h5" style={{paddingTop:40}}> Current University</Typography>
            </Grid>
            <Grid item md={6}>
          <TextField 
            name="university"
            variant="filled"
            label="University Name" 
            fullWidth
            placeholder="Enter your MS University name" 
                onChange={handleChange}
                onBlur={handleBlur}
            className={classes.textf}
            error={!!errors.university&&touched.university}
            helperText={touched.university?errors.university:''}
          /> 
          <Autocomplete
              freeSolo
              options={departments}
              name="department"
              onChange={(e, value) => {
                setFieldValue("department", value)
              }}
                onBlur={handleBlur}
            className={classes.textf}
              renderInput={params => (
                <TextField {...params} name='department' value={values.department} onChange={handleChange} error={!!errors.department&&touched.department} helperText={touched.department?errors.department:''}  label="Department" margin="normal" variant="filled" fullWidth />
              )}
            />
          <TextField 
            name="gradDate" 
            variant="filled"
            type="date"
            label="Graduation Date" 
            defaultValue="2020-01-01" //Default value is needed here
            fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
            className={classes.textf}
            error={!!errors.gradDate&&touched.gradDate}
            helperText={touched.gradDate?errors.gradDate:''}
          /> 
          <br/>
        </Grid>
      </Grid>
      <Button disabled={activeStep === 0} className={classes.textf}  onClick={handleBack}>
        Back
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting} 
        className={classes.textf} 
        variant="contained" 
        color="primary"
      >
        Next
      </Button>
    </Form>
    )}
        </Formik>
          :
         <div className="App">
      <Divider/>
      <Formik 
          validateOnChange={true}
          initialValues={{
            bio:'',
            domain: [],
            tests: [{name:'',date:'2020-01-01',score:''}],
            facebook: '',
            twitter: '',
            linkedIn: '',
            github: '', 
            uniApplied: [{name:'',course:'',status:''}],
            addDomain: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
            }, 1000);
            console.log(values);
            //@Backend Submit Function for Sign-Up
        }}
        >
        {({ isSubmitting ,handleChange,handleBlur,values,setFieldValue}) => (
      <Form> 
        <Grid container className={classes.container}>
            <Grid item xs={6}>
              <Typography variant="h5"> Biography </Typography>
            </Grid>
            <Grid item xs={6}>
          <TextField 
            name="bio"
            label="Bio"
            placeholder="Describe Yourself"
            fullWidth
            multiline
            rows={4}
            variant="filled"
                onChange={handleChange}
                onBlur={handleBlur}
            />
          </Grid>
        </Grid>
        <Divider/>
        <Grid container className={classes.container}>
            <Grid item xs={6}>
              <Typography variant="h5"> Domains </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField 
                name='addDomain'
                value={values.addDomain}
            label="Domains"
            placeholder="eg:Machine Learning, IOT"
            fullWidth
            variant="filled"
            helperText="Press enter after adding each domain" 
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        if (values.addDomain.trim()){
                          setFieldValue('domain',[...values.domain,values.addDomain]);
                          setFieldValue('addDomain','');
                        }
                    }
              }}
          />
            <br/>
            <br/>
            {values.domain.map((item,index)=>(
              <Chip 
                key={index}
                label={item}
                color="primary"
                style={{marginRight:10}}
                onDelete={()=>setFieldValue('domain',values.domain.filter((domainName)=>domainName !==item))}
              />
            ))}
          </Grid>
        </Grid>
        <Divider/>
        <Grid container className={classes.container}>
            <Grid item xs={6}>
              <Typography variant="h5" style={{marginTop: 20}}> Timeline of Tests </Typography>
            </Grid>
            <Grid item xs={6}>
          <FieldArray
                  name="tests"
                  render={arrayHelpers => (
                    <React.Fragment>
                    {values.tests && values.tests.length>0?(
                      values.tests.map((value,index) => (
                        <React.Fragment key={index}>
                          <div>
                          <TextField 
                            name={`tests.${index}.name`}
                            value={value.name}
                            key={index}
                            fullWidth
                            type="text" 
                            variant="filled"
                            label="Test Name" 
                            placeholder="Enter the name" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div><br/>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <TextField
                              type="date" 
                              label="Date"
                              name={`tests.${index}.date`} 
                              key={index}
                              value={value.date}
                              fullWidth
                              variant="filled" 
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              type="number" 
                              label="Score"
                              value={value.score}
                              name={`tests.${index}.score`} 
                              key={index}
                              fullWidth
                              variant="filled"  
                              placeholder="Score" 
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid> 
                       
                      
                  {index===values.tests.length-1?
                  <Grid item xs={6} style={{alignItems:'right'}}>
                    <Button aria-label="add" variant="outlined" style={{color:'green'}} onClick={() => arrayHelpers.insert(index+1, {name:'',date:'2020-01-01',score:''})}>
                          <AddIcon /> Add Test
                    </Button>
                  </Grid>
                  :
                  <Grid item xs={3}></Grid>
                  }
                  <Grid item xs={6}>
                  <Button 
                        key={index}
                        className={classes.btn}
                        variant="outlined"
                        style={{color:'red'}} 
                        aria-label="remove" 
                        onClick={() => arrayHelpers.remove(index)}>
                        <RemoveIcon /> Remove
                  </Button><br/>
                  </Grid>
                   </Grid><br/>
                  </React.Fragment>
                ))
                )
                  
                :
                  <div>
                    <Button aria-label="add" style={{color:'green'}}  variant="outlined" onClick={() => arrayHelpers.insert(0, {name:'',date:'2020-01-01',score:null})}>
                          <AddIcon /> Add Test
                    </Button><br/>
                  </div>
                }
                </React.Fragment>
            )}
              />
          </Grid>
        </Grid>
        <Divider/>
        <Grid container className={classes.container}>
            <Grid item xs={6}>
              <Typography variant="h5"> Social Links </Typography>
            </Grid>
            <Grid item xs={6}>
              <div>
            <TextField 
              name="facebook" 
              label="Facebook"
              fullWidth
              variant="filled"
              placeholder="Your Facebook Profile URL" 
                  onChange={handleChange}
                  onBlur={handleBlur}
              InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FacebookIcon />
                      </InputAdornment>
                    ),
                  }}
            /> 
          </div><br/>
          <div>
            <TextField 
              name="twitter" 
              label="Twitter"
              fullWidth
              variant="filled"
              placeholder="Your Twitter Profile URL" 
                  onChange={handleChange}
                  onBlur={handleBlur}
              InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TwitterIcon />
                      </InputAdornment>
                    ),
                  }}
            /> 
          </div><br/>
              <div>
            <TextField 
              name="github" 
              label="Github"
              fullWidth
              variant="filled"
              placeholder="Your Github Profile URL" 
                  onChange={handleChange}
                  onBlur={handleBlur}
              InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GitHubIcon />
                      </InputAdornment>
                    ),
                  }}
            /> 
          </div><br/>
          <div>
            <TextField 
              name="linkedIn"
              label="LinkedIn"
              variant="filled"
              fullWidth
              placeholder="Your LinkedIn Profile URL" 
                  onChange={handleChange}
                  onBlur={handleBlur}
              InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkedInIcon />
                      </InputAdornment>
                    ),
                  }}
            /> 
          </div>
        </Grid>
      </Grid>
      <Divider/>
       <Grid container className={classes.container}>
            <Grid item xs={6}>
              <Typography variant="h5" style={{marginTop: 20}}> University Applications </Typography>
            </Grid>
            <Grid item xs={6}>
          <FieldArray
                  name="uniApplied"
                  render={arrayHelpers => (
                    <React.Fragment>
                    {values.uniApplied && values.uniApplied.length>0?(
                      values.uniApplied.map((value,index) => (
                        <React.Fragment key={index}>
                          <div>
                          <TextField 
                            name={`uniApplied.${index}.name`}
                            value={value.name}
                            key={index}
                            fullWidth
                            type="text" 
                            variant="filled"
                            label="University Name" 
                            placeholder="Enter the name" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div><br/>
                        <div>
                          <TextField 
                            label="Course"
                            name={`uniApplied.${index}.course`} 
                            placeholder="Course Name"
                            key={index}
                            value={value.course}
                            fullWidth
                            variant="filled" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                      </div><br/>
                      <div>
                          <TextField 
                            select
                            label="Status"
                            value={value.status}
                            name={`uniApplied.${index}.status`} 
                            key={index}
                            fullWidth
                            variant="filled"  
                            placeholder="Score" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <MenuItem value="Accepted">Accepted</MenuItem>
                            <MenuItem value="Rejected">Rejected</MenuItem>
                            <MenuItem value="Prefer not to disclose">Prefer not to disclose</MenuItem>
                          </TextField>
                       </div><br/>
                      <Grid container spacing={2}>
                  {index===values.uniApplied.length-1?
                  <Grid item xs={6} style={{alignItems:'right'}}>
                    <Button aria-label="add" variant="outlined" style={{color:'green'}} onClick={() => arrayHelpers.insert(index+1, {name:'',course:'',status:''})}>
                          <AddIcon /> Add Application
                    </Button>
                  </Grid>
                  :
                  <Grid item xs={3}></Grid>
                  }
                  <Grid item xs={6}>
                  <Button 
                        key={index}
                        className={classes.btn}
                        variant="outlined"
                        style={{color:'red'}} 
                        aria-label="remove" 
                        onClick={() => arrayHelpers.remove(index)}>
                        <RemoveIcon /> Remove
                  </Button><br/>
                  </Grid>
                   </Grid><br/>
                  </React.Fragment>
                ))
                )
                  
                :
                  <div>
                    <Button aria-label="add" style={{color:'green'}}  variant="outlined" onClick={() => arrayHelpers.insert(0, {name:'',course:'',status:''})}>
                          <AddIcon /> Add University
                    </Button><br/>
                  </div>
                }
                </React.Fragment>
            )}
              />
          </Grid>
        </Grid>
        <Divider/><br/>
        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting} 
        variant="contained" 
        color="primary"
      >
        Sign Up
      </Button>
    </Form>
    )}
        </Formik>
    </div>
        }
      	 </Box>
    </div>
  );
}
