import React,{useEffect} from 'react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';

export default function CheckLogin(){
	const [loggedIn,setLoggedIn]=React.useState(true);
	useEffect(()=>{
		if(Cookies.get('jwt')||Cookies.get('refreshToken')){
			setLoggedIn(true)
		}
		else{
			setLoggedIn(false)
		}
	})
	return(
		<React.Fragment>
			{!loggedIn?<Redirect to='/' />:null}
		</React.Fragment>
	)
}