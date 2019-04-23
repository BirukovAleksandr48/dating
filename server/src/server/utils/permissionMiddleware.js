import { User, Photo, Comment, Advert } from '../models';
import catcher from './catcher'

const hasTabooField = (allowedFields, fields) => {
    for(let i in fields) {
        if (allowedFields.indexOf(fields[i]) === -1)
            return true;
    }
    return false;
};

module.exports.hasPermissionOnUserEdit = async (req, res, next) => {

    try {
        const currentUser = req.user;
        const targetUser = await User.findOne({where: {id: req.params.id, isActive: true}});

        if(!targetUser)
            throw({message: 'Target user not founded'});

        const fields = Object.keys(req.body);
        const himselfFields = ['firstName', 'lastName', 'gender',
            'intention', 'education', 'birthDate', 'civilStatus',
            'religion', 'children', 'piercings', 'smoker', 'tattoos',
            'work', 'city'];
        const modFields = ['isBaned'];
        const adminFields = [...himselfFields, 'isBaned', 'isActive', 'role'];

        let allowedFields;
        if(currentUser.id === targetUser.id) {
            allowedFields = himselfFields;
        } else {
            if(currentUser.role === 'moderator' && targetUser.role === 'user') {
                allowedFields = modFields;
            }
            else if (currentUser.role === 'admin' && targetUser.role !== 'admin')
                allowedFields = adminFields;
            else
                throw({ message: 'Permissions denied' });
        }

        if(hasTabooField(allowedFields, fields))
            throw({ message: 'Permissions denied' });

        req.targetUser = targetUser;
        next();
    } catch(err) {
        catcher(err, next, 'Permissions denied');
    }
};

module.exports.hasPermissionOnAvatarEdit = async (req, res, next) => {

    try {
        const currentUser = req.user;
        const targetUser = await User.findOne({ where: { id: req.params.id, isActive: true } });

        if(!targetUser)
            throw({message: 'Target user not founded'});

        if(currentUser.id === targetUser.id ||
            (currentUser.role === 'admin' && targetUser.role !== 'admin')) {
            req.targetUser = targetUser;
            next();
        } else
            throw({ message: 'Permissions denied' });
    } catch(err) {
        catcher(err, next, 'Permissions denied');
    }
};

module.exports.hasPermissionOnUserCreate = async (req, res, next) => {
    try {
        const currentUser = req.user;
        if(currentUser.role === 'admin') {
            next();
        } else
            throw({ message: 'Permissions denied' });
    } catch(err) {
        catcher(err, next, 'Permissions denied');
    }
};

module.exports.hasPermissionOnPhotoUpload = async (req, res, next) => {

    try {
        const currentUser = req.user;
        const targetUser = await User.findOne({ where: { id: req.params.id, isActive: true } });

        if(!targetUser)
            throw({message: 'Target user not founded'});

        if(currentUser.id !== targetUser.id)
            throw({ message: 'Permissions denied' });

        req.targetUser = targetUser;
        next();
    } catch(err) {
        catcher(err, next, 'Permissions denied');
    }
};

module.exports.hasPermissionOnPhotoDelete = async (req, res, next) => {

    try {
        const currentUser = req.user;
        const targetPhoto = await Photo.findOne({ where: { id: req.params.id } });

        if(!targetPhoto)
            throw({message: 'Target photo not founded'});

        const targetUser = await User.findOne({ where: { id: targetPhoto.userId, isActive: true } });

        if(!targetUser)
            throw({message: 'Target user not founded'});

        if(currentUser.id === targetUser.id ||
            (currentUser.role === 'admin' && targetUser.role !== 'admin')) {
            req.targetPhoto = targetPhoto;
            next();
        } else
            throw({ message: 'Permissions denied' });

    } catch(err) {
        catcher(err, next, 'Permissions denied');
    }
};

module.exports.hasPermissionOnCommentChange = async (req, res, next) => {

    try {
        const currentUser = req.user;
        const targetComment = await Comment.findOne({ where: { id: req.params.id } });

        if(!targetComment)
            throw({message: 'Target comment not founded'});

        const targetUser = await User.findOne({ where: { id: targetComment.userId, isActive: true } });

        if(!targetUser)
            throw({message: 'Target user not founded'});

        if(currentUser.id === targetUser.id || currentUser.role === 'admin') {
            req.targetComment = targetComment;
            next();
        } else
            throw({ message: 'Permissions denied' });

    } catch(err) {
        catcher(err, next, 'Permissions denied');
    }
};

module.exports.hasPermissionOnAdvertEditDelete = async (req, res, next) => {

    try {
        const currentUser = req.user;
        const targetAdvertId = parseInt(req.params.id);

        if(!targetAdvertId)
            throw({message: 'Target advert not founded'});

        const targetAdvert = await Advert.findOne({ where: { id: targetAdvertId } });

        if(!targetAdvert)
            throw({message: 'Target user not founded'});

        if(currentUser.id === targetAdvert.userId || currentUser.role === 'admin') {
            req.targetAdvert = targetAdvert;
            next();
        } else
            throw({ message: 'Permissions denied' });

    } catch(err) {
        catcher(err, next, 'Permissions denied');
    }
};
