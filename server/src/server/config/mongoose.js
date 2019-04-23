const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo-dev/chat', { useNewUrlParser: true });

mongoose.set('debug', true);

module.exports = mongoose;
