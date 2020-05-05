const axios = require('axios');

//Use this function to get Name of a tag from it's id
export const getTagById = (id,ObjectArr) => {
	var name;
	ObjectArr.forEach((obj)=>{
		if(obj._id===id){
			name=obj.name;
		}
	})
	return name;
}

//Use this to get id of a tag from its Name
export const getObjectId = async (NamesArr,ObjectArr,ObjectName,isSchoolBool) => {
	var id=null;
	if(NamesArr.includes(ObjectName)){
		ObjectArr.forEach((value)=>{
		  if(value.name===ObjectName){
		    id=value._id;
		  }
		})
	}
	// else{
	// 	try{
	// 	  var response= await axios.post('/api/tags' , {
	// 	    name: ObjectName,
	// 	    isSchool: isSchoolBool
	// 	  })
	// 	  id=response.data._id;
	// 	}
	// 	catch(error){
	// 	  console.error(error);
	// 	}
	// }
	return id;
}

// Returns object with 4 child arrays : universityArr:[],universityNames:[],tagArr:[],tagNames:[]
/*
	universityArr contains the tag object with boolean isSchool=true
	universityNames contains names on the isSchool=true tags
	tagArr contains the tag object with boolean isSchool=false
	tagNames contains names on the isSchool=false tags
*/
export const getTag = async () => {
	var tags = {universityArr:[],universityNames:[],tagArr:[],tagNames:[]}
	var res=await axios.get('/api/tags')
	try{
		res.data.forEach((item)=>{
	  		if(item.isSchool){
	    		if(!tags.universityArr.includes(item)){
			      tags.universityArr.push(item)
	    		}
	    		if(!tags.universityNames.includes(item.name)){
			      tags.universityNames.push(item.name)
	    		}
	  		}
	  		else{
			    if(!tags.tagArr.includes(item)){
			      tags.tagArr.push(item)
			    }
			    if(!tags.tagNames.includes(item.name)){
			      tags.tagNames.push(item.name)
			    }
	  		}
		});
		return tags;
	}
	catch(error){
		console.log("Failed to fetch user Tags");
	};
}

/*
	tagArr is the object array of all non school tags
	universityArr is the array of all school tags
*/
export const getUserInfo = async(token,tagArr,universityArr) => {
	if(!!token){
 		var response = await axios.get('api/users/me/', {
		    headers: {
		      Authorization: token
		    }
	  	})
		try{
			var user = {
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
		    };
		  	user.id=response.data._id
		    user.email=response.data.email;
		    user.name=response.data.name;
		    user.bio=response.data.bio;
		    user.tests=response.data.testTimeline;
		    user.tests.forEach((item,index)=>{
		    	user.tests[index].date=item.date.slice(0,10);
		    })
		    user.department=response.data.department;
		    user.gradDate=response.data.graduationDate.slice(0,10);
		    user.university=response.data.currentSchool;
		    if(response.data.accepts.length>0){
		   		response.data.accepts.forEach(async (item,index)=>{
	  				var obj={};
	       		 	obj.name=getTagById(item,universityArr);
	     	   		obj.status="Accepted";
	        		user.uniApplied.push(obj);
	        	})
			}
			if(response.data.rejects.length>0){
		        response.data.rejects.forEach(async (item,index)=>{
		          	var obj={};
	    	        obj.name=getTagById(item,universityArr);
	       		    obj.status="Rejected";
	    	        user.uniApplied.push(obj);
	    	  	})
	    	}
		    user.github=response.data.githubUrl;
		    user.facebook=response.data.facebookUrl;
		    user.linkedIn=response.data.linkedinUrl;
		    user.twitter=response.data.twitterUrl;
		    response.data.domains.forEach(async (item,index)=>{
	            user.domain.push(getTagById(item,tagArr));
	      	});
		    user.accepts=response.accepts;
		    user.rejects=response.rejects;
			return user;
		}
		catch(error) {
			console.log("Failed to fetch user details");
		};  
	}
}