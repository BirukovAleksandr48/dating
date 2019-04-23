import SecretMessage from "../models/SecretMessage";
const { Advert } = require('../models');
const sequelize = require('sequelize');
import catcher from "../utils/catcher";
import SecretConversation from "../models/SecretConversation";
import randomNameGenerator from '../randomNameGenerator'

module.exports.replyOnAdvert = (socket) => {
    return async ({ curUserId, advertId, messageText }) => {
        console.log('----------reply_on_advert--------')

        try {
            const advert = await Advert.findOne({where: {id: advertId}});
            const targetUserId = advert.userId;
            if (targetUserId === curUserId) {
                socket.emit('inform_error', 'You can`t reply on own adverts');
                return;
            }

            let secretConversation = await SecretConversation.findOne({participants: curUserId, advert: advertId});

            if (!secretConversation) {
                const name = randomNameGenerator();
                const secretConversationModel = new SecretConversation({
                    name,
                    participants: [curUserId, targetUserId],
                    advert: advertId
                });
                secretConversation = await secretConversationModel.save();
                const resultConversation = {
                    id: secretConversation._id,
                    name: secretConversation.name,
                    advert: {
                        id: advert.id,
                        color: advert.color,
                        title: advert.title,
                        isAuthor: true
                    },
                    lastMessage: {
                        text: messageText
                    }
                };

                socket.to(targetUserId).emit('add_secret_conversation', resultConversation);
                resultConversation.advert.isAuthor = false;
                resultConversation.lastMessage.isAuthor = true;
                socket.emit('add_secret_conversation', resultConversation);
            }

            const messageModel = new SecretMessage({
                cid: secretConversation._id,
                text: messageText,
                author: curUserId
            });

            const message = await messageModel.save();

            const resultMessage = {
                id: message._id,
                cid: message.cid,
                text: message.text,
                createdAt: message.createdAt,
            };

            socket.to(targetUserId).emit('add_secret_message', resultMessage);
            resultMessage.isAuthor = true;
            socket.emit('add_secret_message', resultMessage);
        } catch (err) {
            socket.emit('inform_error', 'Reply on advert failed');
        }
    }
};

module.exports.getSecretConversationsByUserId = (socket) => {
    return async ({ curUserId }) => {
        console.log('----------getSecretConversationsByUserId--------');

        try {
            const conversations = await SecretConversation.find({participants: curUserId}).sort({ createdAt: 1 });
            const allCid = conversations.map(c => c._id);
            const allAdvertIds = conversations.map(c => c.advert);

            const adverts = await Advert.findAll({ where: { id: { [sequelize.Op.in]: allAdvertIds } } });

            const messages = await SecretMessage.aggregate([
                {
                    $match: {
                        cid: {$in: allCid}
                    }
                },
                {
                    $sort: {date: 1}
                },
                {
                    $group: {
                        _id: "$cid",
                        createdAt: {$last: "$createdAt"},
                        text: {$last: "$text"},
                        author: {$last: "$author"}
                    }
                }
            ]);

            const result = [];
            for(let i in messages) {
                const message = messages[i];
                for(let j in conversations) {
                    const conversation = conversations[j];
                    if((conversation._id).toString() === (message._id).toString()) {
                        for(let k in adverts){
                            const advert = adverts[k];
                            if(advert.id === conversation.advert){
                                const isMessageAuthor = message.author === curUserId;
                                const isAdvertAuthor = advert.author === curUserId;
                                result.push({
                                    id: conversation._id,
                                    name: conversation.name,
                                    lastMessage: {
                                        text: message.text,
                                        createdAt: message.createdAt,
                                        isAuthor: isMessageAuthor
                                    },
                                    advert: {
                                        id: advert.id,
                                        color: advert.color,
                                        title: advert.title,
                                        isAuthor: isAdvertAuthor
                                    }
                                });
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            socket.emit('secret_conversations_response', result)
        } catch (err) {
            socket.emit('inform_error', 'Getting conversations failed');
        }
    }
};

module.exports.getConversationById = (socket) => {
    return async ({ curUserId, conversationId }) => {
        console.log('----------getConversationId--------');

        try {
            const conversation = await SecretConversation.findOne({ _id: conversationId });
            const advert = await Advert.findOne({ where: { id: conversation.advert  } })

            let messages = await SecretMessage
                .find({ cid: conversationId })
                .select('createdAt text author _id')
                .sort('createdAt');

            messages = messages.map(message => {
                const { _id, author, text, createdAt } = message;
                const isAuthor = author === curUserId;
                delete message.author;
                return { id: _id, text, createdAt, isAuthor }
            });

            const result = {
                id: conversationId,
                name: conversation.name,
                advert: {
                    id: advert.id,
                    title: advert.title,
                    color: advert.color
                },
                messages
            };

            socket.emit('secret_conversation_by_id_response', result)
        } catch (err) {
            socket.emit('inform_error', 'Getting messages failed');
        }
    }
};

module.exports.addSecretMessage = (socket) => {
    return async ({ curUserId, cid, messageText }) => {
        console.log('----------addSecretMessage--------');

        try {
            const messageModel = new SecretMessage({
                cid,
                text: messageText,
                author: curUserId
            });
            const message = await messageModel.save();

            const resultMessage = {
                id: message._id,
                cid: message.cid,
                text: message.text,
                createdAt: message.createdAt,
            };

            const { participants } = await SecretConversation.findOne({ _id: cid });
            let targetUserId;
            for(let i in participants) {
                if(participants[i] !== curUserId) {
                    targetUserId = participants[i]
                }
            }
            socket.to(targetUserId).emit('add_secret_message', resultMessage);
            resultMessage.isAuthor = true;
            socket.emit('add_secret_message', resultMessage);
        } catch (err) {
            socket.emit('inform_error', 'Sending message failed');
        }
    }
};
