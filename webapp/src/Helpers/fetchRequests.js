const axios = require('axios');

//Use this function to get Name of a tag from it's id
export const getTagNameById = async (id,isSchool) => {
	var ObjectArr = [''];
	var tagList = await getTags();
	var name = '';
	if(isSchool)
		ObjectArr=tagList.universityArr
	else
		ObjectArr=tagList.tagArr
	ObjectArr.forEach((obj)=>{
		if(obj._id===id){
			name=obj.name;
		}
	})
	if (name===''){		//If the tag doesnt exist, we will fetch tags again and search.
		tagList = await refreshTags();
		if(isSchool)
			ObjectArr=tagList.universityArr
		else
			ObjectArr=tagList.tagArr
		ObjectArr.forEach((obj)=>{
			if(obj._id===id){
				name=obj.name;
			}
		})
	}	
	return name;
}

//Use this to get id of a tag from its Name
export const getTagIdByName = (ObjectName,isSchool) => {
	var ObjectArr = [];
	var NamesArr = [];
	var id=null;
	var tagList = JSON.parse(localStorage.getItem('tags'));
	if(isSchool){
		ObjectArr=tagList.universityArr
		NamesArr=tagList.universityNames
	}
	else{
		ObjectArr=tagList.tagArr
		NamesArr=tagList.tagNames
	}
	if(NamesArr.includes(ObjectName)){
		ObjectArr.forEach((value)=>{
		  if(value.name===ObjectName){
		    id=value._id;
		  }
		})
	}
	return id;
}


// const addTag = (ObjectName,isSchool) => {
// 	try{
// 	  var response= await axios.post('/api/tags' , {
// 	    name: ObjectName,
// 	    isSchool: isSchool
// 	  })
// 	  return response.data
// 	}
// 	catch(error){
// 	  console.error(error);
// 	}
// }



// Returns object with 4 child arrays : universityArr:[],universityNames:[],tagArr:[],tagNames:[]
/*
	universityArr contains the tag object with boolean isSchool=true
	universityNames contains names on the isSchool=true tags
	tagArr contains the tag object with boolean isSchool=false
	tagNames contains names on the isSchool=false tags
*/
export const refreshTags = async () => {
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
		localStorage.setItem('tags',JSON.stringify(tags))
		return tags;
	}
	catch(error){
		console.log("Failed to fetch user Tags");
	};
}

export const getTags = async () => {
	var tags = JSON.parse(localStorage.getItem('tags'))
	if(!tags)
		tags= await refreshTags();
	return tags;
}
/*
	tagArr is the object array of all non school tags
	universityArr is the array of all school tags
*/

const UpdateUserInfo = async () =>{
	var response = await axios.get('/api/users/me')
	localStorage.setItem('userDetails',JSON.stringify(response.data))
	return response.data;
}

//Returns object with user;s deatils
export const getUserInfo = async (tagArr,universityArr) => {
	var storedUserData = JSON.parse(localStorage.getItem('userDetails'));
	if(!storedUserData)
			storedUserData = await UpdateUserInfo();
	try{
		var user = {
			id: storedUserData._id,
	    	pic: '',
	        name: storedUserData.name,
	        username: '',
	        email: storedUserData.email,
	        password: '',
	        university: '',
	        department: storedUserData.department,
	        gradDate: storedUserData.graduationDate.slice(0,10),
	        bio: storedUserData.bio,
	        domain: [],
	        tests: storedUserData.testTimeline,
	        facebook: storedUserData.facebookUrl,
	        twitter: storedUserData.twitterUrl,
	        linkedIn: storedUserData.linkedinUrl,
	        github: storedUserData.githubUrl,
	        uniApplied: []
	    };
	    user.tests.forEach((item,index)=>{
	    	user.tests[index].date=item.date.slice(0,10);
	    })
	    user.university=await getTagNameById(storedUserData.currentSchool,true);
	    if(storedUserData.accepts.length>0){
	   		storedUserData.accepts.forEach(async (item,index)=>{
  				var obj={};
       		 	obj.name=await getTagNameById(item,true);
     	   		obj.status="Accepted";
        		user.uniApplied.push(obj);
        	})
		}
		if(storedUserData.rejects.length>0){
	        storedUserData.rejects.forEach(async (item,index)=>{
	          	var obj={};
    	        obj.name=await getTagNameById(item,true);
       		    obj.status="Rejected";
    	        user.uniApplied.push(obj);
    	  	})
    	}
	    storedUserData.domains.forEach(async (item,index)=>{
            user.domain.push(await getTagNameById(item,false));
      	});
	    // user.accepts=storedUserData.accepts;
	    // user.rejects=storedUserData.rejects;
		return user;
	}
	catch(error) {
		console.log("Failed to fetch user details");
	};  
}