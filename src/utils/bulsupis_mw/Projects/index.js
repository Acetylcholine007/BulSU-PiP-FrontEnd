import Account from "../Accounts"

import _request from '../utils/_request'

import Maps from "../utils/_map"

/**
 * Gets the project list of the current user.
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> } 
 */
async function project_getAll(){
    let checkUser = await Account.isLoggedIn()
    if (checkUser.simple){
        let response = await _request('/api/project')

        for(let p in response.data){
            response.data[p] = Maps.project_camelCase(response.data[p])
        }

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

async function getInstitute(id){
    let checkUser = await Account.isLoggedIn()
    if (checkUser.simple){

        let response = await _request(`/dev/institutes/${id}`)

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
 * Gets the detail of a specific project provided the Project ID
 * @param  {String} id The first number
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> } 
 */
async function project_get(id){
    let checkUser = await Account.isLoggedIn()
    if (checkUser.simple){
        let response = await _request(`/api/project/${id || -1}`)

        response.data = Maps.project_camelCase(response.data)
        
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
 * Creates a new project with a title "Dummy Project : <Date>"
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> } 
 */
async function project_dummyCreate(){
    let checkUser = await Account.isLoggedIn()
    if (checkUser.simple){

        let formData = new FormData()

        formData.append('data', JSON.stringify({title:`Dummy Project : ${new Date()}`}))

        let response = await _request('/api/project', formData, 'POST')

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
 * Creates a New Project with provided data Object, list of FileData files and FileData signature
 * @param  {Object} data {title : "Title", pip_level: 0, ...}
 * @param  {List[FileData]} files FileData[] list of files to be uploaded
 * @param  {FileData} signature FileData of Signature Image
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> } 
 */
async function project_create(data, files, signature){
    let checkUser = await Account.isLoggedIn()
    if (checkUser.simple){

        let formData = new FormData()

        data = Maps.project_lowerSnaking(data)

        formData.append('data', JSON.stringify(data))

        if (files){
            for (let f in files){
                formData.append('file_list', files[f])
            }
            
        }

        if (signature){
            for (let f in signature){
                formData.append('signature', signature[f])
            }
        }
        

        let response = await _request('/api/project', formData, 'POST')

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
 * Updates the project provided the _id inside the data along with old files
 * @param  {Object} data { _id: <ObjectID>, title : "Title", pip_level: 0, ...}
 * @param  {List[FileData]} files FileData[] list of files to be uploaded
 * @param  {FileData} signature FileData of Signature Image
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> } 
 */
async function project_edit(data, files, signature, args){
    let checkUser = await Account.isLoggedIn()
    if (checkUser.simple){

        let formData = new FormData()

        data = Maps.project_lowerSnaking(data)
        data.file_list = data.file_list ? data.file_list : []
        
        data.file_list = [
            ...data.file_list,
            ...Array.from(files)
        ]

        formData.append('data', JSON.stringify(data))

        files = Array.from(files)
        if (files){
            for (let f in files){
                formData.append('file_list', files[f])
            }
            
        }

        if (signature){
            for (let f in signature){
                formData.append('signature', signature[f])
            }
        }

        let response = await _request('/api/project', formData, 'PUT', false, args)

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
 * Add two numbers together
 * @param  {List} new_arrangement List of Object_ID New Arrangement
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> } 
 */
async function project_rearrange(new_arrangement){
    let checkUser = await Account.isLoggedIn()
    if (checkUser.simple){

        let response = await _request('/api/project/rearrange', JSON.stringify(new_arrangement), 'POST', 'application/json')

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
 * Deletes a Project provided it's Project ID
 * @param  {Number} id The Project-to-be-Deleted ID
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> } 
 */
async function project_delete(id){
    let response = await _request(`/api/project/${id}`, undefined, 'DELETE')

    if (response && !('Error' in response)){
        console.log("Project Deleted Successfully")
        return {simple: true, full: response}
    }else{
        console.error(response)
        return {simple: false, full: response}
    }
}

/**
 * Adds a comment to the Project
 * @param  {String} project_id The Project-to-be-commented ID
 * @param  {String} message The comment message you want to send
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> } 
 */
async function project_comment(project_id, message){
    let checkUser = await Account.isLoggedIn()
    if (checkUser.simple){

        let response = await _request('/api/comment', JSON.stringify({
            message: message || "",
            project_id : project_id || ""
        }), 'POST', 'application/json')

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

const Projects = {
    get : project_get,
    getInstitute: getInstitute,
    getAll : project_getAll,
    create: project_create,
    edit: project_edit,
    delete: project_delete,
    rearrange: project_rearrange,
    comment: project_comment,
    _testCreate: project_dummyCreate
}

export default Projects