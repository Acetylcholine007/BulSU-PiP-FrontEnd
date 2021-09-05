function loginValidator(email, password) {
    const result = {
      email: {
        error: false,
        messages: [],
      },
      password: {
        error: false,
        messages: [],
      },
      
    };
  
    if (email == "") {
      result.email.error = true;
      result.email.messages.push("Email cannot be blank");
    } 
    
    if (password == "") {
      result.password.error = true;
      result.password.messages.push("Password cannot be blank");
      
    }

  return result;
}

//var email = "root@example.com";
// var password = "1234";       
// var confirmPassword = "2567";
// console.log(LoginValidator(email, password));
export default loginValidator;