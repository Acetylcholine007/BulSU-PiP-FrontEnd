function LoginValidator(email, password, institute, confirmPassword) {
	const result = {
  email: {
  error: false,
  messages: []
  },
  password: {
  error: false,
  messages: []
  },
  institute: {
  error: false,
  messages: []
  },
  
  confirmPassword : {
  error: false,
  messages: []
  }
  }
  
  if(email == ''){
  result.email.error = true
  result.email.messages.push("Email cannot be blank")
  }
  else {
  
  var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(!email.match(mailformat)) {
  result.email.error = true
  result.email.messages.push("Invalid email format")
  
  }
  }
  
  if(institute == '') {
  result.institute.error = true
  result.institute.messages.push("Invalid Institute")
  
  }
  
  if(password == '') {
  result.password.error = true
  result.password.messages.push("Password cannot be blank")
  
  }
  
  else {
  if(password.length < 6) {
  result.password.error = true
  result.password.messages.push("Password must be atleast 6 characters")
  }
  
  if(password.length > 20) {
  result.password.error = true
  result.password.messages.push("Password must not exceed 20 characters")
  }
  }
  
  if(password != confirmPassword) {
  result.confirmPassword.error = true
  result.confirmPassword.messages.push("Password did not match!")
  }
  
  return result
  
}

var email = 'root@example.com'
var password = '1234'
var institute = ''
var confirmPassword = '2567'


console.log(LoginValidator(email, password, institute, confirmPassword))