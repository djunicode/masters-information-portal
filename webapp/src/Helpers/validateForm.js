//Validation Functions (Used in Edit Profile and Sign-up)

export const checkTestValidation=(values)=>{      //Check Validation for Test Timeline
  var fail = 0;
  values.tests.forEach((item,index)=>{
    if(item.name.trim()===''||item.score===''||item.date.trim()==='')
      fail++
    else
      for(var i=index+1;i<values.tests.length;i++)
        if(values.tests[i].name===item.name)  //Tests with same name cannot be repeated
          fail++
  })
  if(fail>0)
    return false;//Validation Failed
  else
    return true //Validation Success
}

export const checkUniversityValidation=(values)=>{    //Check Validation for University Applications
  var fail = 0;   
  values.uniApplied.forEach((item,index)=>{
    if(item.name.trim()==='')
      fail++
    else{
      for(var i=index+1;i<values.uniApplied.length;i++)
        if(values.uniApplied[i].name===item.name&&item.name!=="Other")  //Universities with name except "Other" cannot be repeated
          fail++
    }
  })
  if(fail>0)
    return false;//Validation Failed
  else
    return true //Validation Success
}