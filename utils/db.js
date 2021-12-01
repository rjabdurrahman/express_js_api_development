const MONGO_URL = 'mongodb+srv://rjrahman:rahman09@startup.vn2jf.mongodb.net/test?retryWrites=true&w=majority'
const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('DB Connected!')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB