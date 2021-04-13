const libSender =  require('../libs/api');
const registerTemplate =  require('../models/template/register');
const recoveryTemplate = require('../models/template/recovery')
const { succesResponse, errorsResponse } = require('../libs/response');
const url = process.env.URL_NOTIFICATIONS


async function activeUserNotifications(data){
    let dataFormat = {
        to:data.user.email,
        subject: "Comiagro Notifications",
        html: registerTemplate.registerTemplate(data.link,data.user.displayName)
    }
    try {
        let sender = await libSender.post(`${url}/email/send`,dataFormat);
        return sender;
    } catch (error) {
        return errorsResponse(400,error.message);
    }
  
}

async function resetNotifications(data){
    let dataFormat = {
        to:data.email,
        subject: "Comiagro Notifications",
        html: recoveryTemplate.recovery(data.link)
    }
    let result = {}
    try {
        result.link =  await libSender.post(`${url}/email/send`,dataFormat);
        result.response = await succesResponse(200,"reset password send");
        return result
    } catch (error) {
        result.response = await  errorsResponse(400,"sdsdsds");
        return result;
    }
}

module.exports ={
    activate: activeUserNotifications,
    recovery: resetNotifications
}