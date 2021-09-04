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
    if (Account.isLoggedIn()){
        let response = await _request('/api/notification')

        if (response){
            return response
        }else{
            console.error(response)
            return false
        }
    }
    else{
        return false
    }
    
}

/**
 * Deletes notification based from the supplied ID 
 * @param {String} id The id of the comment you would like to delete
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> } 
 */
async function notif_delete(id){
    let response = await _request(`/api/notification/${id}`, undefined, 'DELETE')

    if (response && !('Error' in response)){
        console.log("Notification Deleted Successfully")
        return true
    }else{
        console.error(response)
        return false
    }
}

const Notifications = {
    get : notif_get,
    delete: notif_delete
}

export default Notifications