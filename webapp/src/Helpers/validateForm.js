//Validation Functions (Used in Edit Profile and Sign-up)

export const checkTestValidation=(values)=>{      //Check Validation for Test Timeline
  var fail = 0;
  values.tests.forEach((item,index)=>{
    if(item.name.trim()===''||item.score===''||item.date.trim()==='')
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
  })
  if(fail>0)
    return false;//Validation Failed
  else
    return true //Validation Success
}