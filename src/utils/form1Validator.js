//form1 valditation (page1)//
const form1validator = (Title, Value, Obligation, Proponent,StartYear, EndYear, PAP, Readiness  ) => {
    var result = {
          Title: {
            error:false,
          messages:[]
        },
        value: {
            error:false,
          messages:[]
        },
         Obligation: {
            error:false,
          messages:[]
        },
         Proponent: {
            error:false,
          messages:[]
        },
         StartYear: {
            error:false,
          messages:[]
        },
         EndYear: {
            error:false,
          messages:[]
        },
         PAP: {
            error:false,
          messages:[]
        },
         Readiness: {
            error:false,
          messages:[]
        },
      }
    
     if(!Title.length > 20){
     result.Title.error = true;
     result.Title.message.push("too long")
     } 
      if(!Title.length < 5){
     result.Title.error = true;
     result.Title.message.push("too short")
     } 
     if(!Title === ''){
     result.Title.error = true;
     result.Title.message.push("please put your Title")
     }
     if(!Value.includes('numbers')){
     result.Value.error = true;
     result.Value.message.push("it must be a number")
     }
     if(!Value.includes('-')){
     result.Value.error = false
     result.Value.message.push("- is invalid")
     }
     if(!Value.length >= 9 ){
     result.Value.error = true;
     result.Value.message.push("too much value")
     }
     if(!Value === ''){
     result.Value.error = true;
     result.Value.message.push("please put your amount")
     }
      if(!Obligation ===''){
     result.Obligation.error = true
     result.Obligation.message.push("please put your Obligation type")
     }
     if(!Proponent ===''){
     result.Proponent.error = true
     result.Proponent.message.push("Proponent section is required")
     }
     if(!StartYear ===''){
     result.StartYear.error = true
     result.StartYear.message.push("implementation of year is required")
     }
     if(!EndYear ===''){
     result.EndYear.error = true
     result.EndYear.message.push("implementation of year is required")
     }
     if(!PAP ===''){
     result.PAP.error = true
     result.PAP.message.push("please indicate your PAP level")
     }
     if(!Readiness ===''){
     result.Readiness.error = true
     result.Readiness.message.push("Please indicate your Readiness level")
     }
     } 