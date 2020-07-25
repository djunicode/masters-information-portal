import React,{useEffect} from 'react';

import '../Profile Pages/mystyles.css';
import PropTypes from 'prop-types';
import { makeStyles} from '@material-ui/core/styles';


import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';



import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import LanguageIcon from '@material-ui/icons/Language';
import Cookies from 'js-cookie';
import {useParams} from 'react-router-dom';
const axios = require('axios');
const token = Cookies.get('jwt');


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
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function Ques(props) {
  
return(
  <div>
  <Grid container spacing = {2}>
          <Grid item xs = {1}></Grid>
          <Grid item xs = {10}>
         <Grid container spacing = {2}>
         <Grid item xs = {8}>
         <p className = "un ">{props.univname}</p>

         </Grid>
         <Grid item xs = {4}>
         <br />
         <br />
         <br />
          
         </Grid>
         </Grid>
         <p className = "ud">{props.univdesc}</p>
           <br />
           <Grid container spacing = {2}>
           <Grid item xs = {4}>
           <LocationOnIcon /><p>{props.univadd}</p>
           </Grid>
          <Grid item xs = {4}>
           <PhoneIcon /><p>{props.univphone}</p>
           
           </Grid>
           
           </Grid>
           <LanguageIcon /><p>{props.univweb}</p>
     <p className = "search">Other Details</p>
           
     <Grid container spacing = {1}>
          
    <Grid item xs = {4}><h4 className="unidet">{props.univfees}</h4>
        <p className="persondesc3">Average fees/year</p></Grid>
    <Grid item xs = {4}><h4 className="unidet">{props.univgre}</h4>
        <p className="persondesc3">Average GRE Score</p></Grid>
    <Grid item xs = {4}><h4 className="unidet">{props.univlang}</h4>
        <p className="persondesc3">Average TOEFL Score</p></Grid>
        
        </Grid>   
         

    <p className = "search">Users</p>
    <br />    
            </Grid>
    <Grid item xs = {2}></Grid>
    
      </Grid>
      
      </div>
)
  
}

/*
function Sid() {

  const something = [
      {
          author: "Leonardo DiCaprio",
          
          display: 0,
          

          
      },
      {
          author: "Richard Rogers",
          
          display: 0,
          
          
      },
      {
          author: "Steve Rogers",
          
          display: 0,
          
          
      },
      {
          author: "Natasha Romanoff",
          
          display: 0,
          
          
      },
      {
          author: "Name1",
          
          display: 0,
          
          
      },
      {
          author: "Name2",
          
          display: 0,
          
          
      },
      {
          author: "Name3",
          
          display: 0,
          
          
      }
  ]


var value1 = 0;
var dis = [{
          author: "",
          
          display: 1,
          
          
      }];
      
function d(){
  var i = value1;
  while(i<(value1+3))
  {
    if(i<something.length){
     if(something[i].display == 0){
       dis.push(something[i]);
       something[i].display = 1;
       i++;
     }
    }

  }
  value1 = i;
  console.log(dis);
  
}
const Pls = dis.map((item)=>{
  return(
    <p>{item.author}</p>
  )
})
    
    return (
      <div>
      {Pls}
      <button onClick={d}>Click Here</button>
      
      
      </div>
     
    );
  };

*/


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor:'#E5E5E5',
    
    flexGrow:1,
    marginTop:0,
    
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function UniversityPage() {

 const classes = useStyles();


const [loaded, setLoaded] = React.useState(false);

const [name, setName] = React.useState('');
const [address, setAddress] = React.useState('');
const [phone, setPhone] = React.useState('');
const [desc, setDesc] = React.useState('');
const [web, setWeb] = React.useState('');
const [gre, setGre] = React.useState('');
const [lang, setLang] = React.useState('');
const [fees, setFees] = React.useState('');
const [uniArray, setUniArray] = React.useState([]);
const [people, setPeople] = React.useState([]);

const params = useParams();

const getTagById = (id,ObjectArr) => {
	var name;
	ObjectArr.forEach((obj)=>{
		if(obj._id===id){
			name=obj.name;
		}
	})
	return name;
}

useEffect(() => {
if(!loaded){



 axios.get('http://localhost:3000/api/university', {
                headers: {
                  Authorization: token
                  
                }

              })
              .then(function (response) {
                
              
              setUniArray(response.data);
              for(var i=0;i<uniArray.length;i++)
{
  if(uniArray[i].name === params.uniName)
  {
    setName(uniArray[i].name);
    setAddress(uniArray[i].address);
    setGre(uniArray[i].avg_gre);
    setLang(uniArray[i].avg_lang);
    setFees(uniArray[i].fees);
    setDesc(uniArray[i].description);
    setPhone(uniArray[i].contacts[0].value);
    setWeb(uniArray[i].contacts[1].value);
    break;
  }
} 

            
                        
              
      
              })
              .catch(function (error) {
                console.log("Invalid Request");
              });

axios.get('http://localhost:3000/api/users/', {
                headers: {
                  Authorization: token
                  
                }

              })
              .then(function (response1) {
                
              
              setPeople(response1.data);
              setLoaded(true);            
             
                  
              })
              .catch(function (error) {
                console.log("Invalid Request");
              });
}


},[uniArray,name,address,gre,fees,web,phone,desc,loaded,params.uniName]);



  
  var storedUserData = JSON.parse(localStorage.getItem('tags'));
  console.log(storedUserData);
    var people1 = [];

for(var i = 0;i<people.length;i++)
{
  var name1;
  name1 = getTagById(people[i].currentSchool,storedUserData.universityArr);
  
  if(name1 === params.uniName)
  people1.push(people[i]);
}
console.log(people1);


                 
              
  
  





    return (


    <div className={classes.root}>
    
    {loaded?
    <Ques

     univname = {name}
     univadd = {address}
     univphone = {phone}
     univdesc = {desc}
     univweb = {web}
     univgre = {gre}
     univlang = {lang}
     univfees = {fees}
      />:<div><Grid container spacing = {3}><Grid item xs = {5}></Grid><Grid item xs = {3}><CircularProgress /></Grid><Grid item xs = {4}></Grid></Grid></div>
}   


{loaded?people1.map(item => (
          <Grid container spacing = {1}>
          <Grid item xs = {1}></Grid>
          <Grid item xs = {10}>
  
        <Paper elevation = {3}>
        <Grid container spacing={1}
    direction="row"
    justify="flex-start"
    alignItems="center">
        
            
            <Grid item xs = {1}></Grid>
            <Grid  item xs={9}>
             
            <div>
             <Avatar className="imagenew1" />
        <p className="personname3"><a href = {`/${item._id}`} target="_blank" rel = "noopener noreferrer">{item.name}</a></p>
   </div>
        <p className="persontitle4">{item.department}</p>
  
         <p className="persondesc4">{item.bio}</p>
                    <br/>
            
            </Grid>
            <Grid item xs = {2}>
            </Grid>
        </Grid>

    <br />
    <br />
    </Paper>
    <br />
    
    </Grid>
    <Grid item xs = {2}></Grid>
      </Grid>
        )):<div><Grid container spacing = {3}><Grid item xs = {5}></Grid><Grid item xs = {3}><CircularProgress /></Grid><Grid item xs = {4}></Grid></Grid></div>}
    </div>

  );
}
export default UniversityPage;