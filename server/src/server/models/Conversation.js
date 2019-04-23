const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    participants: {type: Object}
});

const Conversation = mongoose.model('Conversation', Schema);
module.exports = Conversation;