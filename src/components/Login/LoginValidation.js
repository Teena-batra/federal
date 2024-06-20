function validations(values){
    let errors = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const mobileNumber_Pattern = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/
   // const name_pattern = 

    // For name
    if(values.name === ""){
        errors.name = "Name field can not be empty"
    }else{
        errors.name = "";
    }


    // For email
    if(values.email === "") {
        errors.email = "email field should not be empty"
    }else if(!email_pattern.test(values.email)){
        errors.email = "email pattern didn't match"
    }else{
        errors.email = ""
    }

    // For mobileNumber
    
    if(values.mobileNumber === "") {
        errors.mobileNumber = "mobile number field should not be empty"
    }else if(!mobileNumber_Pattern.test(values.mobileNumber)){
        errors.mobileNumber = "mobile pattern didn't match"


    }else{
        errors.mobileNumber = ""
    }


    return errors;

}
export default validations;