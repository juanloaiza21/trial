const validateDataControllers =  require('../controllers/validate');
const responseMiddleware = require('./response')
const {validationResult} = require('express-validator');

async function validationData(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.objects = {};
        req.objects.response = await validateDataControllers.validateDataError(errors);
        return responseMiddleware.responseData(req,res);
    }
    next();
}

function formatData(req, res, next) {
    req.objects = {};
    req.objects.data = {};
    switch (req.method) {
        case 'POST':
            req.objects.data = req.body
            if(req.files){
                req.objects.data.files = req.files
            }
            break;
        case 'GET':
            req.objects.data = req.query
            break;
        default:
            break;
    }
    next();
}

module.exports = {
    formatData,
    validator: validationData
}