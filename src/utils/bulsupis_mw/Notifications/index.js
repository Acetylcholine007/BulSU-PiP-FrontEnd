import { 
    localStorage_tokenloc,
} from "../utils/_vars"

import Account from "../Accounts"

import _request from '../utils/_request'

/**
 * Gets the notification list for the current logged in user
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> } 
 */
async function notif_get(){
    let checkUser = await Account.isLoggedIn()
    if (checkUser.simple){
        let response = await _request('/api/notification')

        if (response){
            return {simple: response, full: response}
        }else{
            console.error(response)
            return {simple: false, full: response}
        }
    }
    else{
        return {simple: false, full: 'Not logged in'}
    }
    
}

/**
 * Deletes notification based from the supplied ID 
 * @param {String} id The id of the comment you would like to delete
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> } 
 */
async function notif_delete(id){
    let checkUser = await Account.isLoggedIn()
    if (checkUser.simple){
        let response = await _request(`/api/notification/${id}`, undefined, 'DELETE')

        if (response && !('Error' in response)){
            console.log("Notification Deleted Successfully")
            return {simple: true, full: response}
        }else{
            console.error(response)
            return {simple: false, full: response}
        }
    }
    else{
        return {simple: false, full: "Not Logged In"}
    }
}

const Notifications = {
    get : notif_get,
    delete: notif_delete
}

export default Notifications