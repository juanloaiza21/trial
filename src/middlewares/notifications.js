const notificationsController =  require('../controllers/notifications')

async function activateEmail(req, res, next) {
    let result = await notificationsController.activate(req.objects.data)
    result.data.info.message = "user created " +  result.data.info.message
    req.objects.response = result.data;
    next();
}

async function recoveryPassword(req, res, next) {
    let  result =  await notificationsController.recovery(req.objects.data);
    req.objects.response = result.response;
    next();
}

module.exports = {
    activate: activateEmail,
    recovery: recoveryPassword
}