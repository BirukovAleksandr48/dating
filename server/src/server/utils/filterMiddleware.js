const { User } =  require( '../models');
const sequelize = require('sequelize');
const moment = require('moment');

/**
 * Convert request with filter-params to filter object for Sequelize.findAll({where: filterObject}).
 * User it for finding users with filters. After object creating put filter object to req.filter.
 * @param req - contain request with filter-params in req.query
 */
module.exports = (req, res, next) => {
    const query = req.query;
    const filter = [];

    if (query.name) {
        let name = '%';
        let temp = query.name.trim().split(' ');
        for (let key in temp) {
            name += temp[key] + '%';
        }
        filter.push({ [sequelize.Op.or]: [
                        sequelize.where(
                            sequelize.fn(
                                'concat',
                                sequelize.col('firstName'),
                                ' ',
                                sequelize.col('lastName')
                            ), {[sequelize.Op.iLike]: name}),

                        sequelize.where(
                            sequelize.fn(
                                'concat',
                                sequelize.col('lastName'),
                                ' ',
                                sequelize.col('firstName')
                            ), {[sequelize.Op.iLike]: name}) ]
            }
        );
    }
    if (query.gender) {
        filter.push({gender: query.gender});
    }
    if (query.withPhotoOnly === 'true') {
        filter.push({profilePicture: {[sequelize.Op.not]: null}});
    }
    if (query.intention) {
        filter.push({intention: query.intention});
    }
    if (query.maxAge && !isNaN(query.maxAge)) {
        filter.push({birthDate: {[sequelize.Op.gte]: moment().subtract(query.maxAge, 'year').format('YYYY-MM-DD')}});
    }
    if (query.minAge && !isNaN(query.minAge)) {
        filter.push({birthDate: {[sequelize.Op.lte]: moment().subtract(query.minAge, 'year').format('YYYY-MM-DD')}});
    }
    filter.push({isActive: true});
    req.filter = filter;
    next();
};
