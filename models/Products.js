const mongoose = require('mongoose');


const ProductSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    status: {
        type: String,
        enum: [true, false],
    },



},
);

module.exports = mongoose.model('products', ProductSchema);