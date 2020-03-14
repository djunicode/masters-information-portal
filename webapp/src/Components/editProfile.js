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
import { Formik, Form, FieldArray } from 'formik';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

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

function EditProfile() {
    const [user, setUser] = React.useState({
    	pic: '',
        name: '',
        username: '',
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
        uniApplied: [{ name: '', course: '', status: '' }]
    });
    const classes = useStyles();
    const [showSuccess, setShowSuccess] = React.useState(false);
    const handleOpenMsg = () => {
        setShowSuccess(true);
    };
    const handleCloseMsg = () => {
        setShowSuccess(false);
    };
    const departments = ["Computers", "IT", "Mechanical", "Bio-Med", "Production", "Electronics", "EXTC", "Chemical", "Civil", "Aeronautical", "Mining", "Agricultural", "Metallurgical"];
    var fileReader = new FileReader();
    var url;
    const handleFileChange = (event) =>{
		event.currentTarget.files[0].size>2097152?	//2MB max size
	    	alert("Image size must be under 2MB")
	    	:
	    	user.pic=event.currentTarget.files[0]
	    url= fileReader.readAsDataURL(user.pic);
	    console.log(url)
	    console.log(fileReader.result)
    }
    return (
		<React.Fragment>
		  <div className="App" style={{paddingTop:'45px'}}>
      		<Typography variant="h4" className={classes.header}><b>Edit Profile</b></Typography>
        		<Box className={classes.box}>
		            <Formik 
			          validateOnChange={true}
			          initialValues={{
			          	pic:null,
			            email:user.email,
			            password:'',
			            password_confirm:'',
			            university: user.university,
			            department: user.department,
			            gradDate: user.gradDate,
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
			          validate={values => {
			          const errors = {};
			            if (
			              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
			            ) {
			              errors.email = 'Invalid email address';
			            }
			            return errors;
			          }}
			          onSubmit={(values, { setSubmitting }) => {
			          	user.pic=values.pic;
			            user.email=values.email;
			            user.university=values.university;
			            user.department=values.department;
			            user.gradDate=values.gradDate;
			            user.bio=values.bio;
			            user.domain=values.domain;
			            user.tests=values.tests;
			            user.facebook=values.facebook;
			            user.twitter=values.twitter;
			            user.linkedIn=values.linkedIn;
			            user.github=values.github;
			            user.uniApplied=values.uniApplied;
			            setUser(user);
			            handleOpenMsg();
			            setTimeout(() => {
		                setSubmitting(false);
			            }, 1000);
			            console.log(user);
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
		        </Grid>
		      </Grid>
		      <br/>
		      <Divider/><Grid container>
	              <Grid item md={6}>
	                <Typography variant="h5" style={{paddingTop:40}}> Profile Image </Typography>
	              </Grid>
	              <Grid item md={6}>
		          <TextField 
		            name="pic"
		            type="file" 
		            variant="outlined"
		            multiple="false"
		            fullWidth
		            className={classes.textf}
		            onChange={handleFileChange}
		            error={!!errors.pic&&touched.pic}
		            helperText={touched.pic?errors.pic:''}
		          /> 
		          <br/>
		          <img src={url} height={300} width={300}/>
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
	            value={values.university}
	            onChange={handleChange}
	            onBlur={handleBlur}
	            className={classes.textf}
	          /> 
	          <Autocomplete
	              freeSolo
	              options={departments}
	              defaultValue={values.department}
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
	          /> 
	          <br/>
	        </Grid>
	      </Grid>
	      <Divider/>
        <Grid container className={classes.container}>
            <Grid item xs={6}>
              <Typography variant="h5"> Biography </Typography>
            </Grid>
            <Grid item xs={6}>
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
		  )
		  }
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
        <Divider/> <br/> 
		<Button
			variant = "contained"
			disabled = { isSubmitting }
			color = "primary"
			type = "submit"
			style = { { width: 295, height: 42, borderRadius: 25 } } 
		>
	 	Update Info 
	 	</Button>
 		</Form>
		)
		} 
		</Formik>
 	  </Box> 
   </div> 
 </React.Fragment>
);
}

export default EditProfile;