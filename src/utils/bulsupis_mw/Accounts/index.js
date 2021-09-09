import { 
    localStorage_tokenloc,
} from "../utils/_vars"

import _request from '../utils/_request'
import Maps from "../utils/_map"

/**
 * Sends a Login Request to the Backend Server. On success, this will store the token
 * received from the server into localStorage. You can check if login is success through
 * isLoggedIn method in the Account Collection.
 * @param {String} email Email to use for login
 * @param {String} password Password to account
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> } 
 */
async function account_login(email, password){
    let response = await _request('/api/account/login', JSON.stringify({
        username: email || '',
        password: password || '',
    }), 'POST', 'application/json')

    if (response && ('token' in response)){
        await localStorage.setItem(localStorage_tokenloc, response.token)
        return {simple: true, full: response}
    }else{
        console.error(response)
        return {simple: false, full: response}
    }
}

/**
 * Sends a register request to the Server. This will auto login when the account
 * creation is a success.
 * @param {String} email Email to use for register
 * @param {String} password Password to account
 * @param {String} institute Institute to where this account will belong {College of Engineering, Editor, etc...}
 * @param {File} profile_image FileData containing the meta-data of the image to be uploaded
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> } 
 */
async function account_register(email, password, institute, profile_image){

    const formData  = new FormData();

    formData.append('data', JSON.stringify({
        email,
        password,
        institute
    }))
    
    profile_image && formData.append('profile_img', profile_image)

    let response = await _request('/api/account/register', formData, 'POST')

    if (response && ('token' in response)){
        await localStorage.setItem(localStorage_tokenloc, response.token)
        return {simple: true, full: response}
    }else{
        console.error(response)
        return {simple: false, full: response}
    }
}

/**
 * Gets the account info of the current logged in account form the backend server
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> } 
 */
async function account_info(){
    let response = await _request('/api/account')

    response.data = Maps.account_camelCase(response.data)

    for(let p in response.data.projectList){
        response.data.projectList[p] = Maps.project_camelCase(response.data.projectList[p])
    }

    if (response){
        return {simple: response, full: response}
    }else{
        console.error(response)
        return {simple: false, full: response}
    }
}

/**
 * Deletes the Token from localStorage. Thus logging out your request.
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> } 
 */
function account_logout(){
    localStorage.removeItem(localStorage_tokenloc)
    return {simple: true, full: true}
}

/**
 * Checks if a token exist in the localStorage. If it exist, then the user is logged In
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> } 
 */
async function account_check(){

    let tokenCheck = localStorage.getItem(localStorage_tokenloc)

    if (tokenCheck){

        let response = false 

        try{
            response = await _request('/api/account')
            //console.log("Logged In")
            return {simple: true, full: response}
        }catch(err){
            console.error(err)
            return {simple: false, full: response}
        }

    }
    
    return false
}

/**
 * Gets the account info of the current logged in account form the backend server
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> } 
 */
 async function account_changepass(new_password, profile_image){

    const formData  = new FormData();

    formData.append('data', JSON.stringify({
        password: new_password,
    }))
    
    profile_image && formData.append('profile_img', profile_image)

    let response = await _request('/api/account', formData, 'PUT')

    if (response && !('Error' in response)){
        console.log("Password Change Success")
        return {simple: true, full: response}
    }else{
        console.error(response)
        return {simple: false, full: response}
    }
}

const Account = {
    register : account_register,
    login : account_login,
    logout : account_logout,
    isLoggedIn : account_check,
    getInfo : account_info, 
    changePassword : account_changepass,
}

export default Account