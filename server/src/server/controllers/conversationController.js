import Conversation from "../models/Conversation";
import Message from "../models/Message";
import Sequelize from "sequelize";
import {User} from '../models'
import 'babel-polyfill';
import catcher from '../utils/catcher'

const Op = Sequelize.Op;

module.exports.getAllConversations = async (req, res, next) => {

    try {
        const user = req.user;
        const conversations = await Conversation.find({participants: user.id});
        const allCid = conversations.map(c => c._id);
        const chats = await Message.aggregate([
            {
                $match: {
                    cid: {$in: allCid}
                }
            },
            {
                $sort: {date: -1}
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

        const chatsWithParticipants = await participantsInclude(chats, conversations);
        const result = await userInclude(user, chatsWithParticipants);

        res.send(result);
    } catch (err) {
        catcher(err, next, 'Get conversations error');
    }
};

module.exports.getConversationById = async (req, res, next) => {

    try {
        const messages = await Message
            .find({ cid: req.params.id })
            .select('createdAt text author _id cid')
            .sort('createdAt');
        const result = await includeAuthorToMessages(req.user, messages);
        res.send(result);
    } catch (err) {
        catcher(err, next, 'Get messages error');
    }
};

module.exports.createConversation = async (req, res, next) => {

    try {
        const currentUser = req.user;
        const messageText = req.body.message;

        if(!messageText.length) {
            throw ({ message: 'Message text required' })
        }

        const participants = [currentUser.id, parseInt(req.params.recipient)];
        let conversation = await Conversation.findOne({participants: {$all: participants}});

        if (conversation) {
            throw({ message: 'Conversation already exist' })
        }

        const conversationModel = new Conversation({participants: participants});
        conversation = await conversationModel.save();
        const messageModel = new Message({
            cid: conversation._id,
            text: messageText,
            author: currentUser.id
        });
        const message = await messageModel.save();
        const messageWithUserInclude = includeAuthorToMessage(message, currentUser);

        const { author, createdAt } = messageWithUserInclude;
        const { id, firstName, lastName, profilePicture } = currentUser;
        const secondUser = { id, firstName, lastName, profilePicture };
        let conversation_ = JSON.parse(JSON.stringify(conversation));

        conversation_ = { _id: conversation_._id, participants: conversation_.participants,
            author, createdAt, text: messageText, secondUser};

        res.send({ message: messageWithUserInclude, conversation: conversation_ });
    } catch (err) {
        catcher(err, next, 'Create conversation error');
    }
};

module.exports.createMessage = async (req, res, next) => {

    try {
        const currentUser = req.user;
        const { cid, text } = req.body;
        const messageModel = new Message({
            cid,
            text,
            author: currentUser.id
        });

        const conversation = await Conversation.findOne({ _id: cid });
        const participants = conversation.participants;
        const index = participants.findIndex(i => i === currentUser.id);
        participants.splice(index, 1);

        const message = await messageModel.save();
        const messageWithUserInclude = includeAuthorToMessage(message, currentUser);

        res.send({ message: messageWithUserInclude, participants });
    } catch (err) {
        catcher(err, next, 'Create message error');
    }
};

const userInclude = async (currentUser, chats) => {
    const uniqueAuthorsId = [...new Set(chats.map(c => {
        return c.participants.find(id => id !== currentUser.id);
    }))];

    const users = await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'profilePicture'],
        where: {
            id: {
                [Op.in]: uniqueAuthorsId
            }
        }
    });

    const conversationsWithAuthor = [];

    for (let i = 0; i < chats.length; i++) {
        let ch = chats[i];
        if (ch.author === currentUser.id) {
            const {id, firstName, lastName, profilePicture} = currentUser;
            const chat = JSON.parse(JSON.stringify(ch));
            chat.author = {id, firstName, lastName, profilePicture};
            conversationsWithAuthor.push(chat);
            continue;
        }
        for (let j = 0; j < users.length; j++) {
            let user = users[j];
            if (ch.author === user.id) {
                const chat = JSON.parse(JSON.stringify(ch));
                chat.author = user;
                conversationsWithAuthor.push(chat);
                break;
            }
        }
    }

    let result = [];
    for(let i = 0; i < conversationsWithAuthor.length; i++) {
        const item = conversationsWithAuthor[i];
        const secondUserId = uniqueAuthorsId.find(id => id === item.participants.find(u => u !== currentUser.id));
        for(let j = 0; j < users.length; j++) {
            const user = users[j];
            if(user.id === secondUserId) {
                item.secondUser = user;
                result.push(item);
            }
        }
    }

    return result;
};

const includeAuthorToMessage = (message, currentUser) => {
    const { id, firstName, lastName, profilePicture } = currentUser;
    const messageWithUserInclude = JSON.parse(JSON.stringify(message));
    messageWithUserInclude.author = {id, firstName, lastName, profilePicture};
    return messageWithUserInclude;
};

const participantsInclude = (chats, conversations) => {
    let result = [];
    for(let i = 0; i < chats.length; i++) {
        let chat = chats[i];
        for(let j = 0; j< conversations.length; j++) {
            const conversation = conversations[j];
            if(conversation._id.toString() === chat._id.toString()) {
                chat.participants = conversation.participants;
                result.push(chat);
                break;
            }
        }
    }
    return result;
};

const includeAuthorToMessages = async (currentUser, messages) => {
    const uniqueAuthorsId = [...new Set(messages.map(c => c.author))];

    const users = await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'profilePicture'],
        where: {
            id: {
                [Op.in]: uniqueAuthorsId
            }
        }
    });

    const result = [];

    for(let i = 0; i < messages.length; i++) {
        let message = messages[i];
        if (message.author === currentUser.id) {
            const {id, firstName, lastName, profilePicture} = currentUser;
            const message_ = JSON.parse(JSON.stringify(message));
            message_.author = {id, firstName, lastName, profilePicture};
            result.push(message_);
            continue;
        }
        for(let j = 0; j<users.length; j++) {
            let user = users[j];
            if(message.author === user.id) {
                const message_ = JSON.parse(JSON.stringify(message));
                message_.author = user;
                result.push(message_);
                break;
            }
        }
    }
    return result;
};

