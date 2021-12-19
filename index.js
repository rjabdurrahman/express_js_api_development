const { urlencoded } = require('express');
const express = require('express');
const app = express()
const connectDB = require('./utils/db')
const Home = require('./Controllers/Home')
const ProductCotroller = require('./Controllers/Product')
const UserController = require('./Controllers/User')
const OrderController = require('./Controllers/Order')
const { signupValidations, loginValidations } = require('./Validations/user');
const auth = require('./Helpers/auth');

connectDB()

app.use(urlencoded({ extended: true }))
app.use(express.json())

app.get('/', Home.get)
app.post('/signup', signupValidations, UserController.signup)
app.post('/login', loginValidations, UserController.login)
app.put('/active-user/:id', UserController.activeUser)
app.delete('/active-user/:id', UserController.deleteUser)

app.get('/products', ProductCotroller.get)
app.post('/product', ProductCotroller.post)
app.get(
    '/all-orders',
    auth,
    OrderController.getAll
)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('App is running in http://localhost:5000'))