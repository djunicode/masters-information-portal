import React,{useEffect} from 'react';
import {getTagById,getObjectId,getTag,getUserInfo} from '../../Helpers/fetchRequests.js';
import CheckLogin from '../../Helpers/checkLogin.js'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete,{createFilterOptions} from '@material-ui/lab/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import { Formik, Form, FieldArray } from 'formik';
import CloseIcon from '@material-ui/icons/Close';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import ImageUploader from 'react-images-upload';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Cookies from 'js-cookie';
const axios = require('axios');
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
    },
    box: {
        marginLeft: '10vw',
        marginRight: '10vw',
        marginTop: 10
    },
    container: {
        paddingTop: 40,
        paddingBottom: 30,
        paddingLeft: 40
    },
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));
const filter = createFilterOptions();
function EditProfile(props) {

	const [user,setUser] = React.useState({
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
        tests: [],
        facebook: '',
        twitter: '',
        linkedIn: '',
        github: '',
        uniApplied: []
    });

	const [mounted,setMounted] = React.useState(false);
	const [universityArr,setUniversityArr]=React.useState([]);
    const [universityNames,setUniversityNames]=React.useState([]);
    const [tagArr,setTagArr]=React.useState([]);
    const [tagNames,setTagNames]=React.useState([]);  
	const[token1,setToken1]=React.useState(null);
	useEffect(()=>{
		//Fetch data function definition
		async function fetchData(){
			const token = Cookies.get('jwt');
			setToken1(token)
			if(!mounted){
				var tags = await getTag()
				setUniversityArr(tags.universityArr)
			   	setUniversityNames(tags.universityNames)
			   	setTagArr(tags.tagArr)
			   	setTagNames(tags.tagNames)
				if(!!token){
			 		var userInfo = await getUserInfo(token,tags.tagArr,tags.universityArr)
			 		setUser(userInfo)
					setMounted(true);
			  	} 
			  	else{
			  		setMounted(true)
			  	}
			}
		}
		fetchData();	//Calling fetchData function
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

    const[pic,setPic]=React.useState(null)
    const handleImage = (picture) => {
    	setPic(picture)
    }
    const classes = useStyles();
    const [showSuccess, setShowSuccess] = React.useState(false);
    const handleOpenMsg = () => {
        setShowSuccess(true);
    };
    const handleCloseMsg = () => {
        setShowSuccess(false);
    };
    const departments = ["Computers", "IT", "Mechanical", "Bio-Med", "Production", "Electronics", "EXTC", "Chemical", "Civil", "Aeronautical", "Mining", "Agricultural", "Metallurgical"];
    return (
		<React.Fragment>
		  <CheckLogin/>
		  <div className={classes.root} style={{paddingTop:'45px'}}>
      		<div align="center">
      			<Typography variant="h4" className={classes.header}><b>Edit Profile</b></Typography><br/><br/>
      		</div>
      			 <Backdrop className={classes.backdrop} open={!mounted}>
			        <CircularProgress color="inherit" />
			      </Backdrop>
      			<Divider/>
        		<Box className={classes.box}>
		            <Formik 
		              enableReinitialize={true}
		              dirty={true}
			          validateOnChange={true}
			          initialValues={{
			          	pic:null,
			            email:user.email,
			            password:'',
			            password_confirm:'',
			            university: getTagById(user.university,universityArr),
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
			            if (values.department.trim()===''){
			            	errors.department = "Cannot be empty"
			            }
			            if (values.gradDate.trim()===''){
			            	errors.gradDate = "Cannot be empty"
			            }
			            if (values.university.trim()===''){
			            	errors.university = "Cannot be empty"
			            }
			            return errors;
			          }}
			          onSubmit={async (values, { setSubmitting }) => {
			          	var domains = [];
			          	user.pic=pic;
			            user.email=values.email;
			            user.university=values.university;
			            user.department=values.department;
			            user.gradDate=values.gradDate;
			            user.bio=values.bio;
			            user.tests=values.tests;
			            user.facebook=values.facebook;
			            user.twitter=values.twitter;
			            user.linkedIn=values.linkedIn;
			            user.github=values.github;
			            user.uniApplied=values.uniApplied;
			            user.accepts=[];
			            user.rejects=[];
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
			              domains[index]=await getObjectId(tagNames,tagArr,item,false)
			            )
			            if(!!user.pic){
			           	 	const formData = new FormData();
			            	formData.append('avatar',user.pic[0]);
				            axios.post('/api/users/upload',formData,{
		        			headers: {
		          			  	Authorization: token1,
		          			  	'content-type': 'multipart/form-data'
		          			}})
		          			.then(function(response){
		          				console.log("Picture Uploaded!")
		          			})
				        }
            			axios.put('/api/users/me', {
					      email: user.email,
					      graduationDate: user.gradDate,
					      currentSchool: user.university,
					      department: user.department,
					      bio: user.bio,
					      domains: domains,
					      testTimeline: user.tests,
					      linkedinUrl: user.linkedIn,
					      githubUrl: user.github,
					      facebookUrl: user.facebook,
					      twitterUrl: user.twitter,
					      accepts: user.accepts,
					      rejects: user.rejects
					    },
            			  {headers: {
              			  	Authorization: token1
              			  }})
					    .then(function (response) {
			           	  handleOpenMsg();
					    })
					    .catch(function (error) {
					      console.log("Failed! An error occured. Please try again later");
					    });
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
	            <Grid container className={classes.container}>
	              <Grid item md={6}>
	                <Typography variant="h5" style={{paddingTop:30}}> Account </Typography>
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
		      <Divider/>
		      <Grid container className={classes.container}>
	              <Grid item md={6}>
	                <Typography variant="h5" style={{paddingTop:40}}> Profile Image </Typography>
	              </Grid>
	              <Grid item md={6}>
		          <ImageUploader
	                withIcon={true}
	                buttonText='Choose image'
	                label="Max Size: 2mb"
	                buttonStyles={{backgroundColor:'#46BC99'}}
	                onChange={handleImage}
	                labelStyles={{font:'Roboto',fontSize:'l'}}
	                fileContainerStyle={{border:'#ccc'}}
	                imgExtension={['.jpg', '.png', '.jpeg']}
	                maxFileSize={2097152}
	                withPreview={true}
	                singleImage={true}
	            />
		        </Grid>
		      </Grid>
		      <br/>
		      <Divider/>
			  <Grid container className={classes.container}>
	            <Grid item md={6}>
	              <Typography variant="h5" style={{paddingTop:30}}> Current University</Typography>
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
					if (params.inputValue !== ''&& !filtered.includes("Other")) {
					filtered.push("Other");
				   }
				    return filtered;
			  }}
              onBlur={handleBlur}
              className={classes.textf}
              renderInput={params => (
                <TextField {...params} name='university' value={values.university} onChange={handleChange} onBlur={()=>(values.university=universityNames.includes(values.university)||values.university===''?values.university:"Other")} error={!!errors.university&&touched.university} helperText={touched.university?errors.university:''}  label="University" margin="normal" variant="filled" fullWidth />
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
	          <br/><br/>
	        </Grid>
	      </Grid>
	      <Divider/>
        <Grid container className={classes.container}>
            <Grid item md={6} style={{paddingTop:30}}>
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
              <Typography variant="h5" style={{paddingTop:10}}> Domains </Typography>
            </Grid>
            <Grid item md={6}>
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
              className={classes.textf}
              renderInput={params => (
                <TextField 
                  {...params} 
                  name='addDomain'
                  value={values.addDomain}
                  label="Domains"
                  placeholder="eg:Machine Learning, IOT"
                  fullWidth
                  variant="filled"
                  helperText="Press enter after adding each domain" 
                  onChange={handleChange}
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
              <Typography variant="h5" style={{marginTop: 15}}>Timeline of Tests </Typography>
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
                            value={!!value.name?value.name:''}
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
                              value={!!value.date?value.date:''}
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
                              value={!!value.score?value.score:''}
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
		  )
		  }
		  /> 
		</Grid> 
	</Grid> 
	<Divider/>
	<Grid container className={classes.container}>
            <Grid item md={6}>
              <Typography variant="h5" style={{paddingTop:15}}> Social Links </Typography>
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
              <Typography variant="h5" style={{marginTop: 15}}> University Applications </Typography>
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
							if (params.inputValue !== ''&& !filtered.includes("Other")){
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
              <Grid item md={8} style={{alignItems:'right'}}>
                <Button aria-label="add" variant="outlined" style={{color:'green'}} onClick={() => arrayHelpers.insert(index+1, {name:'',status:''})}>
                      <AddIcon /> Add Applicaiton
                </Button>
              </Grid>
              :
              <Grid item md={3}></Grid>
              }
              <Grid item md={4}>
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
        <Divider/> <br/> 
        <div align="center">
			<Button
				variant = "contained"
				disabled = { isSubmitting }
				color = "primary"
				type = "submit"
				style = { { width: 295, height: 42, borderRadius: 25 } } 
			>
		 	Update Info 
		 	</Button>
		</div>
 		</Form>
		)
		} 
		</Formik>
		<br/>
 	  </Box> 
 	  <br/>
   </div> 
 </React.Fragment>
);
}

export default EditProfile;