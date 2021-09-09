import _request from '../utils/_request'

async function get_institutes(){
    let response = await _request('/test/institutes')

    if (response){
        return {simple: response, full: response}
    }else{
        console.error(response)
        return {simple: false, full: response}
    }
}

const Institute = {
    get : get_institutes,
}

export default Institute