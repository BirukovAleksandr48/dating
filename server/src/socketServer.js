
import SecretConversationController from './server/controllers/secretConversationController'
const socketio = require('socket.io');

let io;

exports.listen = function(server) {
    io = socketio.listen(server);

    io.sockets.on('connection', function (socket) {
        console.log('----------connection--------')

        socket.on('subscribe', (userId) => {
            console.log('----------subscribe--------', userId)
            socket.join(userId);
        });

        socket.on('unsubscribe', (cid) => {
            console.log('----------unsubscribe--------')
            socket.leave(cid);
        });

        socket.on('inform_new_message', (data) => {
            console.log('----------inform_new_message--------')
            const { message, participants } = data;
            for(let i in participants) {
                socket.to(participants[i]).emit('message_added', message);
            }
        });

        socket.on('inform_new_conversation', ({ recipient, conversation }) => {
            console.log('----------inform_new_conversation--------', recipient)
            socket.to(recipient).emit('conversation_created', conversation);
        });

        socket.on('reply_on_advert',
            SecretConversationController.replyOnAdvert(socket));

        socket.on('get_secret_conversations_by_user_id',
            SecretConversationController.getSecretConversationsByUserId(socket));

        socket.on('get_secret_conversations_by_id',
            SecretConversationController.getConversationById(socket));

        socket.on('send_secret_message',
            SecretConversationController.addSecretMessage(socket));

        socket.on('disconnect', () => {
            console.log('----------disconnect--------')
        });

    })

};
