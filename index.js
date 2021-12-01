const { urlencoded } = require('express');
const express = require('express');
const { check } = require('express-validator')
const app = express()
const connectDB = require('./utils/db')
const Home = require('./Controllers/Home')
const ProductCotroller = require('./Controllers/Product')
const UserController = require('./Controllers/User')

connectDB()

app.use(urlencoded({ extended: true }))
app.use(express.json())

app.get('/', Home.get)
app.post(
    '/signup',
    [
        check('name')
        .notEmpty().withMessage('Name is required!')
        .isLength({ min: 3}).withMessage('Name should be at least 3 characters!')
        ,
        check('email')
        .notEmpty().withMessage('Email is required!')
        .isEmail().withMessage('Invalid email format!')
        ,
        check('password')
        .notEmpty().withMessage('Password is required!')
        .isLength({ min: 6}).withMessage('Password should be at least 6 characters!')
        .matches('[a-z]').withMessage('Password should contain at leas one alphabet!')
        ,
        check('phone')
        .notEmpty().withMessage('Phone is required!')
        .isMobilePhone().withMessage('Invalid Phone Number')
        ,
    ],
    UserController.signup
)
app.post('/login', UserController.login)

app.get('/products', ProductCotroller.get)
app.post('/product', ProductCotroller.post)

app.listen(5000, () => console.log('App is running in http://localhost:5000'))