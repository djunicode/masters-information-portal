import React,{useEffect} from 'react';
import {getObjectId,getTag} from '../../Helpers/fetchRequests.js';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Autocomplete,{createFilterOptions} from '@material-ui/lab/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import { Formik, Form, FieldArray } from 'formik';
import Stepper from '@material-ui/core/Stepper';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {Redirect,Link} from 'react-router-dom';
import Cookies from 'js-cookie';
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
      paddingBottom: 20,
      flexGrow: 1
    },
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

const axios = require('axios');
const filter = createFilterOptions();
function getSteps() {
    return ['Core Details', 'Other Details'];
}

export default function Register() {

  const [componentDidMount]=React.useState(0);
  const [redirect,setRedirect]=React.useState(false);
  const [universityArr,setUniversityArr]=React.useState([]);
  const [universityNames,setUniversityNames]=React.useState([]);
  const [tagArr,setTagArr]=React.useState([]);
  const [tagNames,setTagNames]=React.useState([]);  

  useEffect(()=>{
    if(!componentDidMount){
      async function fetchData(){
        var tags = await getTag()
        setUniversityArr(tags.universityArr)
        setUniversityNames(tags.universityNames)
        setTagArr(tags.tagArr)
        setTagNames(tags.tagNames)
      }
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[componentDidMount])
 // eslint-disable-next-line
  React.useEffect(()=>{
    if(!!Cookies.get('jwt')){
      setRedirect(true);
    }
  })

  const submitAxios = () => {
    axios.post('/api/users/register', {
      name: user.name,
      email: user.email,
      password: user.password,
      graduationDate: user.gradDate,
      currentSchool: user.university,
      department: user.department,

      /* -------------- Optional Fields below: ------------------ */
      bio: user.bio,
      domains: user.domain,
      testTimeline: user.tests,
      linkedinUrl: user.linkedIn,
      githubUrl: user.github,
      facebookUrl: user.facebook,
      twitterUrl: user.twitter,
      accepts: user.accepts,
      rejects: user.rejects
    })
    .then(function (response) {
      console.log("Registration Successful");
      setRegistered(true)
    })
    .catch(function (error) {
      console.log("Registration Failed");
    });
  }

  const [user] = React.useState({
      name: '',
      email: '',
      password: '',
      university: '',
      department: '',
      gradDate: '2020-01-01',
      bio: '',
      domain: [],
      tests: [{ name: '', date: '2020-01-01', score: '' }],
      facebook: '',
      twitter: '',
      linkedIn: '',
      github: '',
      uniApplied: [{ name: '', status: '' }],
      accepts: [],
      rejects: []
    });
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
    const [registered,setRegistered]=React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const handleOpenMsg = () => {
        setShowSuccess(true);
    };
    const handleCloseMsg = () => {
        setShowSuccess(false);
    };
    const departments = ["Computers", "IT", "Mechanical", "Bio-Med", "Production", "Electronics", "EXTC", "Chemical", "Civil", "Aeronautical", "Mining", "Agricultural", "Metallurgical"];
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
      <div className={classes.root} style={{paddingTop:'45px'}}>
      {registered?<Redirect to='/login'/>:null}
      {redirect?<Redirect to='/'/>:null}
      <Typography variant="h4" className={classes.header}><b>Register</b></Typography>
      <Grid container>
        <Grid item md={3}/>
        <Grid item md={6}>
        <div align="center">
          <Stepper activeStep={activeStep} orientation={window.outerWidth<500?'vertical':'horizontal'}>
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
          </Grid>
        </Grid>
        <Divider/>
        <Box className={classes.box}>
        {activeStep===0?
          <Formik 
          validateOnChange={true}
          initialValues={{
            name:user.name,
            fname:!!user.name?user.name.slice(0,user.name.indexOf(' ')):'' ,
            lname:!!user.name?user.name.slice(user.name.indexOf(' ')+1,user.name.length):'',
            email:user.email,
            password:'',
            password_confirm:'',
            university: user.university,
            department: user.department,
            gradDate: user.gradDate 
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
            if (!values.password_confirm){
              errors.password_confirm = 'Fill this field';
            }
            else if(values.password!==values.password_confirm){
              errors.password_confirm = 'Password not matching';
            }
            if (!values.fname){
              errors.fname = "Fill this field"
            }
            if (!values.lname){
              errors.lname = "Fill this field"
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
          onSubmit={(values, { setSubmitting }) => {  //Submit First page of form
            values.name=values.fname+" "+values.lname;
            user.name=values.name;
            user.email=values.email;
            user.password=values.password;
            user.university=values.university;
            user.department=values.department;
            user.gradDate=values.gradDate;
            handleOpenMsg();
            setTimeout(() => {
              setSubmitting(false);
              handleNext();
            }, 1000);
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
                    value={values.fname}
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
                    value={values.lname}
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    fullWidth
                    error={!!errors.lname&&touched.lname}
                    helperText={touched.lname?errors.lname:''}
                   />
                </Grid> 
             </Grid> 
            <TextField 
              name="email"
              type="email" 
              fullWidth
              value={values.email}
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
              error={!!errors.password_confirm&&touched.password_confirm}
              helperText={touched.password_confirm?errors.password_confirm:''}
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
         <Autocomplete
              options={universityNames} 
              disableClearable
              inputValue={!!values.university?values.university:''}
              name="university"
              onChange={(e, value) => {
                setFieldValue("university", value)
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                if (params.inputValue !== '' && !filtered.includes("Other")) {
                  filtered.push("Other");
                 }
                  return filtered;
              }}
              onBlur={handleBlur}
              className={classes.textf}
              renderInput={params => (
                <TextField 
                  {...params} 
                  name='university' 
                  value={values.university} 
                  onChange={handleChange} 
                  onBlur={()=>(values.university=universityNames.includes(values.university)||values.university===''?values.university:"Other")} 
                  error={!!errors.university&&touched.university} 
                  helperText={!!touched.university?errors.university:''} 
                  label="University" 
                  margin="normal" 
                  variant="filled" 
                  fullWidth 
                />
              )}
            />
          <Autocomplete
              freeSolo
              disableClearable
              options={departments}
              inputValue={!!values.department?values.department:''}
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
            value={values.gradDate}
            type="date"
            label="Graduation Date" 
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
            bio:user.bio,
            domain: user.domain,
            tests: user.tests,
            facebook: user.facebook,
            twitter: user.twitter,
            linkedIn: user.linkedIn,
            github: user.github, 
            uniApplied: user.uniApplied,
            addDomain: '',
          }}
          onSubmit={async (values, { setSubmitting }) => {
            user.bio=values.bio;
            user.tests=values.tests;
            user.facebook=values.facebook;
            user.twitter=values.twitter;
            user.linkedIn=values.linkedIn;
            user.github=values.github;
            user.uniApplied=values.uniApplied;
            const accepts = values.uniApplied.filter(uni => uni.status==="Accepted");
            const rejects = values.uniApplied.filter(uni => uni.status==="Rejected");
            user.university= await getObjectId(universityNames,universityArr,user.university,true);
            accepts.forEach(async (item,index)=>
              user.accepts[index]=await getObjectId(universityNames,universityArr,item.name,true)
            )
            rejects.forEach(async (item,index)=>
              user.rejects[index]=await getObjectId(universityNames,universityArr,item.name,true)
            )
            values.domain.forEach(async (item,index)=>
              user.domain[index]=await getObjectId(tagNames,tagArr,item,false)
            )
            submitAxios();  //Submit function for signup
        }}
        >
        {({ isSubmitting ,handleChange,handleBlur,values,setFieldValue}) => (
      <Form> 
        <Snackbar 
              open={showSuccess} 
              autoHideDuration={750} 
              onClose={handleCloseMsg}
            >
              <Alert variant="filled" severity="success">
                Changes Saved!
              </Alert>
            </Snackbar>
        <Grid container className={classes.container}>
            <Grid item md={6}>
              <Typography variant="h5"> Biography </Typography>
            </Grid>
            <Grid item md={6}>
          <TextField 
            name="bio"
            label="Bio"
            value={values.bio}
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
            <Grid item md={6}>
              <Typography variant="h5"> Domains </Typography>
            </Grid>
            <Grid item md={6}>
              <Grid container>
                <Grid item xs={10}>
                  <Autocomplete
                  options={tagNames}
                  disableClearable
                  inputValue={!!values.addDomain?values.addDomain:''}
                  autoHighlight
                  getOptionDisabled={option => values.domain.includes(option)}
                  name="addDomain"
                  onChange={(e, value) => {
                    setFieldValue("addDomain", value)
                  }}
                  onBlur={handleBlur}
                  renderInput={params => (
                    <TextField 
                      {...params} 
                      name='addDomain'
                      value={values.addDomain}
                      label="Domains"
                      placeholder="eg:Machine Learning, IOT"
                      fullWidth
                      variant="filled"
                      helperText="Press Enter key or hit the '+' icon after adding each domain" 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                            if (values.addDomain.trim()&&tagNames.includes(values.addDomain)&&!values.domain.includes(values.addDomain)){
                              setFieldValue('domain',[...values.domain,values.addDomain]);
                              setFieldValue('addDomain','');
                            }
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  onClick={()=>{
                    if (values.addDomain.trim()&&tagNames.includes(values.addDomain)&&!values.domain.includes(values.addDomain)){
                        setFieldValue('domain',[...values.domain,values.addDomain]);
                      setFieldValue('addDomain','');
                    }
                  }}
                >
                  <AddIcon/>
                </IconButton>
              </Grid>
            </Grid>
            <br/>
            <br/>
            {values.domain.map((item,index)=>(
              <Chip 
                key={index}
                label={item}
                color="primary"
                variant="outlined"
                deleteIcon={<CloseIcon />}
                style={{backgroundColor:'#E7F3EF',color:'#496961',marginRight:10,borderColor:'#E7F3EF',fontWeight:'bold'}}
                onDelete={()=>setFieldValue('domain',values.domain.filter((domainName)=>domainName !==item))}
              />
            ))}
          </Grid>
        </Grid>
        <Divider/>
        <Grid container className={classes.container}>
            <Grid item md={6}>
              <Typography variant="h5" style={{marginTop: 20}}> Timeline of Tests </Typography>
            </Grid>
            <Grid item md={6}>
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
                          <Grid item md={6}>
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
                          <Grid item md={6}>
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
                  <Grid item md={6} style={{alignItems:'right'}}>
                    <Button aria-label="add" variant="outlined" style={{color:'green'}} onClick={() => arrayHelpers.insert(index+1, {name:'',date:'2020-01-01',score:''})}>
                          <AddIcon /> Add Test
                    </Button>
                  </Grid>
                  :
                  <Grid item md={3}></Grid>
                  }
                  <Grid item md={6}>
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
            <Grid item md={6}>
              <Typography variant="h5"> Social Links </Typography>
            </Grid>
            <Grid item md={6}>
              <div>
            <TextField 
              name="facebook" 
              label="Facebook"
              fullWidth
              variant="filled"
              value={values.facebook}
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
              value={values.twitter}
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
              value={values.github}
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
              value={values.linkedIn}
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
            <Grid item md={6}>
              <Typography variant="h5" style={{marginTop: 20}}> University Applications </Typography>
            </Grid>
            <Grid item md={6}>
          <FieldArray
                  name="uniApplied"
                  render={arrayHelpers => (
                    <React.Fragment>
                    {values.uniApplied && values.uniApplied.length>0?(
                      values.uniApplied.map((value,index) => (
                        <React.Fragment key={index}>
                          <div>
                          <Autocomplete
                            options={universityNames} 
                            key={index}
                            disableClearable
                            inputValue={!!value.name?value.name:''}
                            name={`uniApplied.${index}.name`}
                            onChange={(e, value) => {
                              setFieldValue(`uniApplied.${index}.name`, value)
                            }}
                            filterOptions={(options, params) => {
                              const filtered = filter(options, params);
                              if (params.inputValue !== ''&& !filtered.includes("Other")) {
                              filtered.push("Other");
                               }
                                return filtered;
                            }}
                            onBlur={handleBlur}
                            renderInput={params => (
                              <TextField {...params} 
                                name={`uniApplied.${index}.name`} 
                                value={value.name} 
                                onChange={handleChange} 
                                onBlur={()=>(value.name=universityNames.includes(value.name)||value.name===''?value.name:"Other")}
                                label="University Name" 
                                margin="normal" 
                                variant="filled" 
                                fullWidth 
                              />
                            )}
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
                          </TextField>
                       </div><br/>
                      <Grid container spacing={2}>
                  {index===values.uniApplied.length-1?
                  <Grid item md={6} style={{alignItems:'right'}}>
                    <Button aria-label="add" variant="outlined" style={{color:'green'}} onClick={() => arrayHelpers.insert(index+1, {name:'',status:''})}>
                          <AddIcon /> Add Application
                    </Button>
                  </Grid>
                  :
                  <Grid item md={3}></Grid>
                  }
                  <Grid item md={6}>
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
                    <Button aria-label="add" style={{color:'green'}}  variant="outlined" onClick={() => arrayHelpers.insert(0, {name:'',status:''})}>
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
        <Button disabled={activeStep === 0} className={classes.button}
          onClick={()=>{
            handleBack();
            user.bio=values.bio;
            user.domain=values.domain;
            user.tests=values.tests;
            user.facebook=values.facebook;
            user.twitter=values.twitter;
            user.linkedIn=values.linkedIn;
            user.github=values.github;
            user.uniApplied=values.uniApplied;
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{width:295,height:42,borderRadius:25}}
        >
          Register
        </Button>
      </Form>
    )}
    </Formik>
  </div>
  }
  <br/><Typography>Already have an account? <Link to='/login' style={{color:'#496961'}}> <b>Sign In</b></Link></Typography>
  </Box> 
  </div>
  );
}