//const axios = require('axios');

export const getTagById = (id,ObjectArr) => {
    	var name;
    	ObjectArr.forEach((obj)=>{
    		if(obj._id===id){
    			name=obj.name;
    		}
    	})
    	return name;
    }

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