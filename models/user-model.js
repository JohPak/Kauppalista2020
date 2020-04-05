const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    shoppinglist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shoppinglist',
        //req: true,
        // notes: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'note',
        //     //req: true
        // }]
    }],
});
const user_model = mongoose.model('user', user_schema);

module.exports = user_model;





// alkuperäinen (toimii 182.2020)
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const user_schema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     shoppinglist: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'shoppinglist',
//         req: true
//     }],
//     notes: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'note',
//         req: true
//     }]
// });
// const user_model = mongoose.model('user', user_schema);

// module.exports = user_model;