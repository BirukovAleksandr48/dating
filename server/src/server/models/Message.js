const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
    {
        cid: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        author: {
            type: Number,
            required: true
        }
    }, {
        timestamps: true
    }
);

const Message = mongoose.model('Message', Schema);
module.exports = Message;