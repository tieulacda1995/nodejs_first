const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    status: {
        type: String,
        enum: ['TO LEARN', 'LEARNING', 'LEARNED'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },


}, { timestamps: true });

module.exports = mongoose.model('posts', PostSchema);