const axios =  require('axios');

async function methodPost (url,data) {
    return await axios.post(url,data)
}


module.exports ={ 
    post: methodPost
} 