import { 
    SOURCE, 
} from "./_vars"

import _request from './_request'

/**
 * Pings the Backend Server if they can communicate or not. Better check this first to see
 * if everything works fine
 * @return  Returns a server response { data : [] } 
 */
async function _bulsupips_test(){
    let test = await _request('/test/utils/ping')
    if (test){
        console.log(` ✔ Middleware for BULSU PiPS now working! Communicating with [${SOURCE}]`)
    }else{
        console.log(` ❌ Can't connect to BulSU Pips Server through address [${SOURCE}]`)
    }
    return test
}

export default _bulsupips_test