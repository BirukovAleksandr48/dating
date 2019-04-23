import { User } from '../models';
const bcrypt = require('bcrypt');
const catcher = require('./catcher')

/**
 * Create new user and adds it to database. Use login method after it to return tokens pair to client.
 * You can validate it before with userValidation method.
 * @param req - contain user object in req.body
 */
module.exports.signUp = async (req, res, next) => {

    try {
        const newUser = new User(req.body);
        newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8));
        const savedUser = await newUser.save();
        if (!savedUser)
            throw ({});
        next();
    } catch(err) {
        console.log(err.message)
        catcher(err, next, 'SignUp error');
    }
};
