const { Firebase } = require('../libs/firebase');
const { succesResponse, errorsResponse } = require('../libs/response')
const firebase = new Firebase('users');

async function preregister(data) {
    try {
        let  result = await firebase.saveDatabase(data);
        return succesResponse(201, "Preregister created", result);
    } catch (error) {
        return errorsResponse(400,"Error Save Data");
    }
}

async function recoveryPassword(data){
    let  result = {};
    try {
        result.link = await firebase.recoveryPasswordLink(data.email);
        result.response = await succesResponse(200,result.link);
        return result;
    } catch (error) {
        result.response = await errorsResponse(400,"Error Generating The Link And Verifying the Email");
        return result;
    }
}

function fomatDataUser(data){ 
    let user =  {
        uid: data.id,
        email: data.email,
        emailVerified: false,
        phoneNumber: data.phoneNumber,
        password: data.password,
        displayName: data.name,
        //photoURL: '',
        disabled: false,
    }
    let otherInfo = {
        id: data.id,
        notificationsWhatsapp: data.notificationsWhatsapp,
        phoneNumber: data.phoneNumber,
        birthDay: data.birthDay
    }
    
    return {
        user: user,
        otherInfo: otherInfo
    };
}

async function registerUser(data){
    let dataformat = fomatDataUser(data);
    dataformat.info = {};
    try {
        await firebase.createUser(dataformat.user);
        dataformat.info.status =200;
        return dataformat;
    } catch (error) {
        return errorsResponse(400,error.message)
    }
}

async function updateDataUser(data){
    try {
        let result = await firebase.updateDatabase(data.otherInfo);
        result.info = {};
        result.info.status = 200; 
        return result;
    } catch (error) {
        return errorsResponse(400,error.message);
    }
}

async function verifyEmailLink(data){
    let result = {};
    try {
        result.link = await firebase.activateUserLink(data.user.email);
        result.info = {};
        result.info.status = 200;
        return result;
    } catch (error) {   
        return errorsResponse(400,error.message);
    }
}

async function verifyUser(data){
    let result = {};
    try {
        result.data =  await firebase.verifyUser(data.email);
        result.response = await succesResponse(200, result.data.emailVerified)
    } catch (error) {
        result.response = await errorsResponse(400,"user not exists");
    }
    return result;
}

async function verifyUserDB(data){
    let result = await await firebase.getData(data);
}

module.exports = {
    preregister: preregister,
    recoveryPassword,
    registerUser: registerUser,
    updateDataUser: updateDataUser,
    verify:verifyEmailLink,
    verifyUser:verifyUserDB,
}