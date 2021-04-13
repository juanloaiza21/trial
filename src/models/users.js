const validateSchemaPreregister = {
    id: {
        in: ['body'],
        isNumeric:true,
        notEmpty: true,
        isLength: {
            errorMessage: 'nit must be betwen 5 an 30 characters',
            options: { min: 5, max: 30 },
        },
    },
    name: {
        in: ['body'],
        notEmpty: true,
        isLength:{
            erroMessage: `Name must be at least 5 characters`,
            options: {min:5},
        }
    },
    birthDay:{
        in: [`body`],
        notEmpty: false,
    },
    email: {
        in: [`body`],
        notEmpty: true,
    },
    phoneNumber: {
        in: [`body`],
        notEmpty: true,
    }
}


const validateSchemaRegister = {
	id:{
        in: ['body'],
        isNumeric:true,
        notEmpty: true,
        isLength: {
            errorMessage: 'nit must be betwen 5 an 30 characters',
            options: { min: 5, max: 30 },
        },
    },
	name:{
        in: ['body'],
        notEmpty: true,
        isLength:{
            erroMessage: `Name must be at least 5 characters`,
            options: {min:5},
        }
    },
	notificationsWhatsapp:{
        in:[`body`],
        isBoolean: true,
    },
	email:{
        in: [`body`],
        isEmail: true,
        notEmpty: true,
    },
    phoneNumber:{

    },
    birthDay: {
        in: [`body`],
        notEmpty: true,
    },
    password: {
        in: ['body'],
        notEmpty: true,
        isLength:{
            erroMessage: `Password must be at least 5 characters`,
            options: {min:6},
        }
    }
} 

const validateSchemaRecovery = {
    email: {
        in: [`body`],
        isEmail: true,
        isEmpty:false,
    }
}

module.exports = {
    validateSchemaPreregister: validateSchemaPreregister,
    validateSchemaRegister: validateSchemaRegister,
    validateSchemaRecovery: validateSchemaRecovery
}