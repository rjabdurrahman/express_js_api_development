const { urlencoded } = require('express');
const express = require('express');
const app = express()
const connectDB = require('./utils/db')
const Home = require('./Controllers/Home')
const ProductCotroller = require('./Controllers/Product')
const UserController = require('./Controllers/User')
const { signupValidations } = require('./Validations/user')

connectDB()

app.use(urlencoded({ extended: true }))
app.use(express.json())

app.get('/', Home.get)
app.post('/signup', signupValidations, UserController.signup)
app.post('/login', UserController.login)
app.put('/active-user/:id', UserController.activeUser)
app.delete('/active-user/:id', UserController.deleteUser)

app.get('/products', ProductCotroller.get)
app.post('/product', ProductCotroller.post)

app.listen(5000, () => console.log('App is running in http://localhost:5000'))