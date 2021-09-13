function accountEditorValidator(password) {
    const result = { 
      password: {
        error: false,
        messages: [],
      },
    };
  
    if (password === "") {
      result.password.error = true;
      result.password.messages.push("Password cannot be blank");
    } else {
      if (password.length < 6) {
        result.password.error = true;
        result.password.messages.push("Password must be atleast 6 characters");
      }
  
      if (password.length > 20) {
        result.password.error = true;
        result.password.messages.push("Password must not exceed 20 characters");
      }
    }
  
    return result;
  }
  
  export default accountEditorValidator;
  