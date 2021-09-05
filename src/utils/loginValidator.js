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

export default loginValidator;