const { check } = require('express-validator')

const signupValidations = [
    check('name')
        .notEmpty().withMessage('Name is required!')
        .isLength({ min: 3 }).withMessage('Name should be at least 3 characters!')
    ,
    check('email')
        .notEmpty().withMessage('Email is required!')
        .isEmail().withMessage('Invalid email format!')
    ,
    check('password')
        .notEmpty().withMessage('Password is required!')
        .isLength({ min: 6 }).withMessage('Password should be at least 6 characters!')
        .matches('[a-z]').withMessage('Password should contain at leas one alphabet!')
    ,
    check('phone')
        .notEmpty().withMessage('Phone is required!')
        .isMobilePhone().withMessage('Invalid Phone Number')
    ,
]

const loginValidations = [
    check('email')
        .notEmpty().withMessage('Email is required!')
        .isEmail().withMessage('Invalid email format!')
    ,
    check('password')
        .notEmpty().withMessage('Password is required!')
        .isLength({ min: 6 }).withMessage('Password should be at least 6 characters!')
        .matches('[a-z]').withMessage('Password should contain at least one alphabet!')
]


module.exports = { signupValidations, loginValidations  }