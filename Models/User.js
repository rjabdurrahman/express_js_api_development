const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'general'
    },
    active: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true
    }
})

const User = mongoose.model('user', UserSchema);

module.exports = User