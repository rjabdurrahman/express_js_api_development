const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: {
        type: [mongoose.Types.ObjectId],
        ref: 'Product',
        required: true
    },
    address: {
        type: String,
        required: false
    }
})

const Order = mongoose.model('order', OrderSchema);

module.exports = Order