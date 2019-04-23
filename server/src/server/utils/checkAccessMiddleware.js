const jwt = require ('jsonwebtoken');
const SECRET = 'SECRET';
const catcher = require('./catcher')
const { User } = require('../models')
/**
 * Checks access token valid, gets userId and role from it and then put them to req object.
 * Use it as middleware for any requst.
 * @param req - contain access token in req.headers.authorization
 */
module.exports.checkAccess = async (req, res, next) => {
    try {
        if (!req.headers.authorization)
            throw({ code: 401, message: 'Authentication error'});

        let encodedToken = req.headers.authorization.split(' ')[1];
        let decodedToken = await jwt.verify(encodedToken, SECRET, (err, result) => {
            if (err)
                throw({ code: 401, message: 'Authentication error'});
            else if (result.tokenType !== 'access')
                throw({ code: 401, message: 'Authentication error'});
            else
                return result;
        });

        const user = await User.findOne({
            where: {id: decodedToken.userId, isActive: true},
            attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
        });

        req.user = user;
        console.log('access end');
        next();
    } catch(err) {
        console.log(err.message)
        catcher(err, next, 'Access token incorrect');
    }
};
