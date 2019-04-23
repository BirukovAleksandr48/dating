const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
    {
        cid: {
            type: mongoose.Schema.ObjectId,
            ref: 'SecretConversation',
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

const SecretMessage = mongoose.model('SecretMessage', Schema);
module.exports = SecretMessage;