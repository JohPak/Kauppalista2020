const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoppinglist_schema = new Schema({
    text: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product-model',
        req: true

    }]
});
const shoppinglist_model = new mongoose.model('shoppinglist', shoppinglist_schema);

module.exports = shoppinglist_model;