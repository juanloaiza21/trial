const express = require("express");
const router = express.Router();
const controllers =  require('../controllers/controllers')

const { validateSchemaPreregister,validateSchemaRegister,validateSchemaRecovery } = require (`../models/users`)
const {checkSchema} = require('express-validator');

router.post('/preregister',checkSchema(validateSchemaPreregister),controllers.preregister);
router.post('/register',checkSchema(validateSchemaRegister),controllers.register);
router.post('/recovery',checkSchema(validateSchemaRecovery),controllers.recovery);
router.post('/verifications',controllers.verifications);

module.exports = router;