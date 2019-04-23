const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    advert: {
        type: Number,
        required: true
    },
    participants: {
        type: Object,
        required: true
    }
});

const SecretConversation = mongoose.model('SecretConversation', Schema);
module.exports = SecretConversation;
