const { Comment, User } = require('../models');
const catcher = require('../utils/catcher');
const sequelize = require('sequelize');


/** Get all comments by photo id
 * @param req - contain photo id in req.params.id
 */
module.exports.getCommentsByPhotoId = async (req, res, next) => {

    try {
        const photoId = parseInt(req.params.id);
        if(!photoId)
            throw({ code: 404, message: 'Photo not found' });

        const comments = await Comment.findAll({
            include: {
                model: User,
                attributes: {
                    exclude: ['updatedAt', 'createdAt', 'password',
                        'birthDate', 'email', 'role', 'isActive',
                        'isBaned', 'birthDate', 'intention', 'education']
                }
            },
            where: {
                photoId: photoId
            },
            order: [['createdAt', 'ASC']]
        });
        res.json(comments);
    } catch (err) {
        catcher(err, next, 'Comments find error');
    }
};

/** Create new comment
 * @param req - contain user id in req.userId, photo id in
 * req.body.photoId and comment text in req.body.text
 */
module.exports.addComment = async (req, res, next) => {

    try {
        const user = req.user;
        const photoId = parseInt(req.params.id);
        const commentText = req.body.commentText;

        if(!photoId)
            throw({ code: 404, message: 'Photo not found' });

        if(!commentText)
            throw ({ message: 'Comment text required' });

        const result = await Comment.create({ userId: user.id, photoId, text: commentText });
        if (!result)
            throw ({ message: 'Comment create error' });

        const createdComment = await Comment.findOne({
            include: {
                model: User,
                attributes: {
                    exclude: ['updatedAt', 'createdAt', 'password',
                        'birthDate', 'email', 'gender', 'role', 'isActive',
                        'isBaned', 'birthDate', 'intention', 'education']
                }
            },
            where: {
                id: result.id
            },
            attributes: {
                exclude: ['updatedAt']
            }
        });

        res.send(createdComment);
    } catch (err) {
        catcher(err, next, 'Comment create error');
    }
};

module.exports.editComment = async (req, res, next) => {
    try {
        const commentId = parseInt(req.params.id);
        const commentText = req.body.commentText;

        if(!commentId)
            throw({ code: 404, message: 'Comment not found' })

        if(!commentText)
            throw ({ message: 'Comment text required' });

        await Comment.update({ text: commentText, isEdited: true }, { where: { id: commentId } });

        const editedComment = await Comment.findOne({
            include: {
                model: User,
                attributes: {
                    exclude: ['updatedAt', 'createdAt', 'password',
                        'birthDate', 'email', 'gender', 'role', 'isActive',
                        'isBaned', 'birthDate', 'intention', 'education']
                }
            },
            where: {
                id: commentId
            },
            attributes: {
                exclude: ['updatedAt']
            }
        });

        res.send(editedComment);
    } catch (err) {
        catcher(err, next, 'Comment create error');
    }
};

/** Delete comment by id
 * @param req - contain comment id in req.params.id
 */
module.exports.deleteComment = async (req, res, next) => {

    try {
        const targetComment = req.targetComment;

        await Comment.destroy({ where: { id: targetComment.id } });
        res.json({ deletedCommentId: targetComment.id });
    } catch (err) {
        catcher(err, next, 'Comment create error');
    }
};
