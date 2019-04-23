import { User } from '../models';
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const moment = require('moment');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const catcher = require('../utils/catcher')

/**
 * Return all users with filters. Use filterMiddleware before it to create a filter object
 * @param req - contain filter object in req.filter
 */
module.exports.getAllUsers = async (req, res, next) => {

    try {
        const filter = req.filter;

        const users = await User.findAll({
            where: {[Sequelize.Op.and]: filter},
            attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
            order: [['id', 'DESC']]
        });

        res.json(users);
    } catch(err) {
        catcher(err, next, 'Users find error')
    }
};

/**
 * Return user by id.
 * @param req - contain user`s id in req.params.id
 */
module.exports.getUserById = async(req, res, next) => {
    try {
        const userId = parseInt(req.params.id);

        if(!userId)
            throw({ code: 404, message: 'User not found' });

        const user = await User.findOne({
            where: {id: userId, isActive: true},
            attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
        });
        if (!user)
            throw ({ code: 404, message: 'User not found'});
        res.json(user);
    } catch(err) {
        catcher(err, next, 'User find error')
    }
};

/**
 * Return user by token.
 * @param req - contain user`s id in req.params.id
 */
module.exports.getUserByToken = async(req, res, next) => {
    try {
        const user = req.user;
        res.json({ user });
    } catch(err) {
        catcher(err, next, 'User find error')
    }
};

/**
 * Create new user and adds it to database.
 * You can validate it before with userValidation method.
 * @param req - contain user object in req.body
 */
module.exports.createUser = async (req, res, next) => {

    try {
        const newUser = new User(req.body);
        newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8));
        const savedUser = await newUser.save();

        res.json(savedUser)
    } catch(err) {
        catcher(err, next, 'User create error')
    }
};

/**
 * Update user`s field by user`s id. Checks client`s permission before update.
 * Permissions: user can`t update another user. User can`t update isActive status and role.
 * Admin can`t update another admin. Admin can`t update own role and isActive astatus.
 * @param req - contain updeteFields in req.body, userId in req.userId and role in req.role
 */
module.exports.updateUser = async (req, res, next) => {

    try {
        const updatedFields = req.body;
        const targetUser = req.targetUser;

        let updatedUser = await User.update(
            updatedFields,
            {
                where: {
                    id: targetUser.id,
                    isActive: true
                },
                returning: true, plain: true
            }
        );

        updatedUser = updatedUser[1].dataValues;
        delete updatedUser.password;

        res.send(updatedUser);
    } catch(err) {
        catcher(err, next, 'User update error')
    }
};

/**
 * Upload user`s avatar by user`s id. Checks client`s permission before update.
 * Permissions: user can`t upload avatar to another user.
 * Admin can`t upload avatar to another admin.
 * Uses multer for upload image (https://www.npmjs.com/package/multer).
 * @param req - contain targetUserId in req.params.id, userId in req.userId and role in req.role
 */
module.exports.uploadAvatar = async (req, res, next) => {

    try {
        const targetUser = req.targetUser;
        let filename = "";

        if(targetUser.profilePicture)
            fs.unlink(`./src/public/img/${targetUser.profilePicture}`, err => {
                if (err) {
                    throw({ message: 'Previous avatar not founded' });
                }
            });

        const storage = multer.diskStorage({
            destination: './src/public/img/',
            filename: (req, file, cb) => {
                filename = Date.now() + '-' + file.originalname;
                cb(null, filename);
            }
        });

        const upload = multer({
            storage: storage,
            fileFilter: function (req, file, cb) {

                const filetypes = /jpeg|jpg|png/;
                const mimetype = filetypes.test(file.mimetype);
                const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                if (mimetype && extname) {
                    return cb(null, true);
                }
                return cb(new Error("This type isn`t supported"));
            }
        }).single('avatar');

        await upload(req, res, async function (err) {
            if (err) {
                throw({});
            } else {

                let updatedUser = await User.update({profilePicture: filename},
                    {where: {id: targetUser.id, isActive: true}, returning: true, plain: true})
                updatedUser = updatedUser[1].dataValues;
                delete updatedUser.password;

                res.send(updatedUser);
            }
        });
    } catch(err) {
        catcher(err, next, 'Avatar upload error')
    }
};
