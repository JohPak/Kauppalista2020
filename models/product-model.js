const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: false
    }
});
const product_model = mongoose.model('product-model', product_schema);

module.exports = product_model;