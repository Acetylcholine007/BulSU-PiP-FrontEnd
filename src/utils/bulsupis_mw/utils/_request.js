import { 
    SOURCE, 
    localStorage_tokenloc,
    bulsupips_debug
} from "./_vars"

import axios from "axios"

/**
 * A wrapped fetch requester with built in Authorization Token Header creator
 * and other utility stuffs that should only be used within the confine of the
 * module itself unless you know what you are doing
 * @param  {String} link The REST Link you want to access
 * @param  {String} body The data you want to send to the link. This will not be used if you are doing a GET request
 * @param  {String} method Specifies if you'll use GET, POST, DELETE, PUT or etc.
 * @param  {String} type The Content Type of the Body. Most use cases are application/json or multipart/form-data
 * @return {Object}      Response from the server in format { data: [...], query: <String>, total:<Number> } 
 */
async function _request_fetch(link, body, method, type, args){
    try{

        method = (method && method.toUpperCase()) || 'GET'
        let token = localStorage.getItem(localStorage_tokenloc) || false

        bulsupips_debug && console.log(`${SOURCE}${link}`)

        let headers = new Headers({
            'Authorization' : token ? `Bearer ${token}` : undefined,
        })

        type && headers.append('Content-Type', type)

        let response =  await fetch(
            `${SOURCE}${link}`,
            {
                method: method,
                headers,
                body: method === 'GET' ? undefined : body
            }
        )

        try {
            if (response.status >= 400){
                return await response.text()
            }
            return await response.json()
        }
        catch (err){
            console.error(err)
            return false
        }
    }
    catch(err){
        console.error(err)
        return false
    }
}

async function _request_axios(link, body, method, type, args){
    try{

        method = (method && method.toUpperCase()) || 'GET'
        let token = localStorage.getItem(localStorage_tokenloc) || false

        bulsupips_debug && console.log(`${SOURCE}${link}`)

        let headers = {
            'Authorization' : token ? `Bearer ${token}` : undefined,
        }

        if(type) {headers['Content-Type'] = type}

        if (args){
            args.uploadProgress = args.uploadProgress ? args.uploadProgress : progressEvent => console.log(progressEvent.loaded/progressEvent.total*100)
        }
        else{
            args = {}
            args.uploadProgress = progressEvent => console.log(progressEvent.loaded/progressEvent.total*100)
        }

        let response = false

        try{
            response = await axios({
                url: `${SOURCE}${link}`,
                method: method,
                data :  method === 'GET' ? undefined : body,
                headers,
                onUploadProgress: args.uploadProgress
            })
        }
        catch(err){
            return err.toJSON()
        }
        

        try {
            if (response.status >= 400){
                return await response.data
            }
            return response.data
        }
        catch (err){
            console.error(err)
            return response.data
        }
    }
    catch(err){
        console.error(err)
        return false
    }
}


let _request = _request_axios

export default _request