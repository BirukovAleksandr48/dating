const { User, Token } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

const SECRET = 'SECRET';
const TOKEN_TYPE_ACCESS = 'access';
const TOKEN_TYPE_REFRESH = 'refresh';
const EXP_ACCESS = '1d';
const EXP_REFRESH = '60d';
const TOKEN_LIMIT = 3;
const catcher = require('../utils/catcher')

const createToken = (userId, userRole, tokenType, key, expiresIn) => {
    return jwt.sign ({userId: userId, role: userRole, tokenType: tokenType}, key, { expiresIn: expiresIn });
};

/**
 * Use it for login user.
 * Check email and password. If correct - deletes tokens if limit is reached.
 * Then creates a new pair of tokens (https://www.npmjs.com/package/jsonwebtoken),
 * saves to the database and returns to the client.
 * Can be used after creating new user.
 * @param req - contain email and password in req.body
 */
module.exports.login = async (req, res, next) => {
    let transaction;
    try {
        transaction = await Token.sequelize.transaction();
        const { email, password } = req.body;

        let authUser = await User.findOne({where: {email, isActive: true},
            attributes: { exclude: ['updatedAt', 'createdAt']}});

        if (!authUser)
            throw({ message: 'Email or password incorrect' });

        const isPasswordCorrect = await bcrypt.compare(password, authUser.password); //если есть, то проверяем пароль
        if (!isPasswordCorrect)
            throw({ message: 'Email or password incorrect' });

        const count = await Token.count({where: {userId: authUser.id}});
        if (count >= TOKEN_LIMIT)
            await Token.destroy({ where: {userId: authUser.id}}, { transaction });

        const accessToken = createToken(authUser.id, authUser.role, TOKEN_TYPE_ACCESS, SECRET, EXP_ACCESS);
        const refreshToken = createToken(authUser.id, authUser.role, TOKEN_TYPE_REFRESH, SECRET, EXP_REFRESH);
        const insertedToken = await Token.create({userId: authUser.id, token: refreshToken}, { transaction });

        if (!insertedToken)
            throw({});

        await transaction.commit();
        delete authUser.dataValues.password;
        res.send({ user: authUser.dataValues, accessToken, refreshToken});
    } catch (err) {
        await transaction.rollback();
        catcher(err, next, 'Login error');
    }
};

/**
 * Logout user. Get users refresh token and delete it from database.
 * @param req - contain refreshtoken in req.body
 */
module.exports.logout = async (req, res, next) => {
    try {
        const {refreshToken} = req.body;
        await Token.destroy({where: {token: refreshToken}});
        res.send("success");
    } catch(err) {
        catcher(err, next, 'Logout error');
    }
};

/**
 * Use it for refresh your tokens pair when access token has expired.
 * Check refresh token valid. Then deletes tokens if limit is reached.
 * Then creates a new pair of tokens (https://www.npmjs.com/package/jsonwebtoken),
 * saves to the database and returns to the client.
 * @param req - contain encoded refresh token in req.body.token
 */
module.exports.refreshTokens = async (req, res, next) => {

    try {
        const encodedToken = req.body.token;

        const decodedToken = await jwt.verify(encodedToken, SECRET, (err, result) => {
            if (err)
                throw ({});
            else if (result.tokenType !== 'refresh')
                throw ({ message: 'Incorrect token type' });
            else
                return result;
        });

        const count = await Token.count({where: {userId: decodedToken.userId}});
        if (count > TOKEN_LIMIT) {
            await Token.destroy({where: {userId: decodedToken.userId}});
            throw({});
        }

        const findToken = await Token.findOne({where: {token: encodedToken}});
        if (!findToken) {
            throw({});
        }

        const updUser = await User.findOne({where: {id: decodedToken.userId, isActive: true}});
        if (!updUser)
            throw({});

        const accessToken = createToken(updUser.id, updUser.role, TOKEN_TYPE_ACCESS, SECRET, EXP_ACCESS);
        const refreshToken = createToken(updUser.id, updUser.role, TOKEN_TYPE_REFRESH, SECRET, EXP_REFRESH);
        await Token.update({userId: updUser.id, token: refreshToken}, {where: {token: encodedToken}});

        res.send({accessToken: accessToken, refreshToken: refreshToken});
    } catch(err) {
        catcher(err, next, 'Refresh tokens error');
    }
};

