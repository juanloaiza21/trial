const userController = require('../controllers/users')
const responseMiddleware =  require('./response');

async function preregister(req, res, next) {
    req.objects.response = await userController.preregister(req.objects.data);
    next();
}

async function register(req, res, next) {
    result = await userController.registerUser(req.objects.data);
    if(result.info.status === 400){
        req.objects.response =  result;
        return responseMiddleware.responseData(req,res);
    } 
    req.objects.data =  result;
    next();
}

async function registerOtherData(req, res, next) {
    let result = await userController.updateDataUser(req.objects.data);
    if(result.info.status === 400){
        req.objects.response =  result;
        return responseMiddleware.responseData(req,res);
    }
    req.objects.response= result;
    req.objects.data.save = result;
    next();
}

async function linkVerificationEmail(req, res, next){
    let result = await userController.verify(req.objects.data);
    if(result.info.status === 400){
        req.objects.response =  result;
        return responseMiddleware.responseData(req,res);
    }
    req.objects.response = result;
    req.objects.data.link = result.link;
    req.objects.response.data = req.objects.data
    next();
}

async function recoveryPassword(req, res, next) {
    let result = await userController.recoveryPassword(req.objects.data);
    if(result.response.info.status === 400){
        req.objects.response =  result.response;
        return responseMiddleware.responseData(req,res);
    }
    req.objects.response =  result.response;
    req.objects.data.link = result.link;
    next();
}

async function verificationUser(req, res, next) {
    let result = await userController.verifyUser(req.objects.data);
    if(result.response.info.status === 400){
        req.objects.response =  result.response;
        return responseMiddleware.responseData(req,res);
    }
    req.objects.response =  result.response;
    req.objects.data.link = result.link;
    next();
}

async function verificateUserDB(req,res, next){
    let  result = await userController.verifyUser(req.objects.data);
    next();
}

module.exports = {
    preregister: preregister,
    register: register,
    registerOtherData,
    linkVerificationEmail:linkVerificationEmail,
    recoveryPassword: recoveryPassword,
    verify:  verificationUser
}