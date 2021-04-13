const libResponse =  require('../libs/response');

function validateDataError(error) {
    return libResponse.errorsResponse(400, error.errors);
}

module.exports = {
    validateDataError
}