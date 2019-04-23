const { Advert } = require('../models');
const catcher = require('../utils/catcher');
const sequelize = require('sequelize');


/** Get all comments by photo id
 * @param req - contain photo id in req.params.id
 */
module.exports.getAdvert = async (req, res, next) => {

    try {
        let { filter }  = req.query;
        console.log('filter:', filter)
        let where = {};
        if(filter) {
            filter = `%${filter}%`;
            where = {
                [sequelize.Op.or]: [
                    {
                        title: {
                            [sequelize.Op.iLike]: filter
                        }
                    },
                    {
                        text: {
                            [sequelize.Op.iLike]: filter
                        }
                    }
                ]
            };
        }
        const advert = await Advert.findAll({ where, order: [['createdAt', 'ASC']]});

        res.json(advert);
    } catch (err) {
        console.log(err.message)
        catcher(err, next, 'Advert find error');
    }
};

/** Create new comment
 * @param req - contain user id in req.userId, photo id in
 * req.body.photoId and comment text in req.body.text
 */
module.exports.getAdvertByUserId = async (req, res, next) => {

    try {
        const user = req.user;

        const advert = await Advert.findAll({ where: { userId: user.id }, order: [['createdAt', 'ASC']] });
        if (!advert)
            throw ({});
        res.json(advert);
    } catch (err) {
        console.log(err.message)
        catcher(err, next, 'Advert find error');
    }
};

module.exports.getAdvertById = async (req, res, next) => {

    try {
        const advertId = parseInt(req.params.id);

        if(!advertId) {
            throw({ code: 404, message: 'Advert not found' })
        }

        const advert = await Advert.findAll({ where: { id: advertId }, order: [['createdAt', 'ASC']] });
        if (!advert)
            throw ({});
        res.json(advert);
    } catch (err) {
        console.log(err.message)
        catcher(err, next, 'Advert find error');
    }
};

/** Delete comment by id
 * @param req - contain comment id in req.params.id
 */
module.exports.addAdvert = async (req, res, next) => {

    try {
        const advert = req.body.advert;
        console.log('.>>>>', advert)
        const curUser = req.user;
        advert.userId = curUser.id;
        const result = await Advert.create(advert);

        res.json(result);
    } catch (err) {
        console.log(err.message)
        catcher(err, next, 'Advert create error');
    }
};

module.exports.editAdvert = async (req, res, next) => {

    try {
        const targetAdvert = req.targetAdvert;
        const updatedAdvert = req.body.updatedAdvert;

        let result = await Advert.update( updatedAdvert,
            { where: { id: targetAdvert.id }, returning: true, plain: true });

        result = result[1].dataValues;

        res.json(result);
    } catch (err) {
        catcher(err, next, 'Advert update error');
    }
};

module.exports.deleteAdvert = async (req, res, next) => {

    try {
        const targetAdvert = req.targetAdvert;
        const result = await Advert.destroy( { where: { id: targetAdvert.id } });

        res.json(result);
    } catch (err) {
        catcher(err, next, 'Advert delete error');
    }
};
