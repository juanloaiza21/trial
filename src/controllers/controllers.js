const validateMiddleware =  require('../middlewares/validate');
const userMiddleware = require('../middlewares/user');
const responseMiddleware = require('../middlewares/response');
const notificationsMiddleware =  require('../middlewares/notifications');

exports.preregister = [
    validateMiddleware.validator,
    validateMiddleware.formatData,
    userMiddleware.preregister,
    responseMiddleware.responseData,
]

exports.register = [
    validateMiddleware.validator,
    validateMiddleware.formatData,
    userMiddleware.register,
    userMiddleware.registerOtherData,
    userMiddleware.linkVerificationEmail,
    notificationsMiddleware.activate,
    responseMiddleware.responseData
]
exports.recovery = [
    validateMiddleware.validator,
    validateMiddleware.formatData,
    userMiddleware.recoveryPassword,
    notificationsMiddleware.recovery,
    responseMiddleware.responseData
]

exports.verifications = [
    validateMiddleware.validator,
    validateMiddleware.formatData,
    userMiddleware.verify,
    responseMiddleware.responseData
];
