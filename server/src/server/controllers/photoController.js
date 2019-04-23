const { Photo, User, Comment } = require('../models');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const catcher = require('../utils/catcher')

/**
 * Returns all photos by user`s id.
 * @param req - contain userId in req.params.id
 */
module.exports.getPhotosByUserId = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        if(!userId)
            throw({ code: 404, message: 'User not found' });

        const findPhotos = await Photo.findAll({
            where: {userId: userId},
            attributes: {exclude: ['createdAt', 'updatedAt']}
        });
        if (!findPhotos)
            throw ({});
        res.json(findPhotos);
    } catch (err) {
        catcher(err, next, 'Photo find error');
    }
};

/**
 * Returns photo by id.
 * @param req - contain userId in req.params.id
 */
module.exports.getPhotoById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if(!id)
            throw({ code: 404, message: 'Photo not found' });

        const findPhoto = await Photo.findOne({
            where: {id},
            attributes: {exclude: ['createdAt', 'updatedAt']}
        });
        if (!findPhoto)
            throw ({ code: 404, message: 'Photo not found' });

        res.json(findPhoto);
    } catch (err) {
        catcher(err, next, 'Photo find error');
    }
};

/**
 * Upload user`s photos by user`s id. Checks client`s permission before upload.
 * Permissions: user can`t upload photos to another user.
 * Admin can`t upload photos to another admin.
 * Uses multer for upload image (https://www.npmjs.com/package/multer).
 * You can upload a maximum of 10 photos in one call.
 * Saves uploaded photos to  ./src/public/img/ and save photo names to database
 * @param req - contain targetUserId in req.params.id, userId in req.userId and role in req.role
 */
/*module.exports.uploadPhotos = async(req, res, next) => {
    const user = req.user;
    const targetUserId = req.params.id;
    let targetUser;
    let filename = "";

    try {
        targetUser = await User.findOne({where: {id: targetUserId, isActive: true}, attributes: {include: ['role']}});
        if (!targetUser) {
            throw ({});
        }
        if (!hasPermission(user.id, targetUserId, user.role, targetUser.role)) {
            throw ({ code: 403, message: 'Permission denied'})
        }
    } catch (err) {
        catcher(err, next, 'Photos upload error')
    }

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
        }})
        .array('photos', 10); // 10 is the max count of photos


    upload(req, res, async function (err) {
        try {
            if (err) {
                throw ({});
            } else {
                const photos = [];
                req.files.map((photo) => {
                    const newPhoto = {photoName: photo.filename, userId: targetUserId};
                    photos.push(newPhoto);
                });

                const insertedPhotos = await Photo.bulkCreate(photos, {individualHooks: true});
                if (!insertedPhotos) {
                    throw ({});
                }
                res.send('success');
            }
        } catch(err) {
            catcher(err, next, 'Photos upload error' );
        }
    });
};*/

/**
 * Delete user`s photos by photo`s id. Checks client`s permission before upload.
 * Permissions: user can`t delete photos of another user.
 * Admin can`t delete photos of another admin.
 * Deletes photos from ./src/public/img/ and then delete from database
 * @param req - contain targetPhotoId in req.params.id, userId in req.userId and role in req.role
 */
module.exports.deletePhotoById = async (req, res, next) => {
    try {
        const targetPhoto = req.targetPhoto;

        fs.unlink(`./src/public/img/${targetPhoto.photoName}`, err => {
            if (err) {
                throw({});
            }
        });

        await Photo.destroy({ where: { id: targetPhoto.id } });
        res.json({ deletedPhotoId: targetPhoto.id });
    } catch (err) {
        catcher(err, next, 'Photo delete error');
    }
};

/**
 * Upload user`s photosby user`s id. Checks client`s permission before upload.
 * Permissions: user can`t upload photos to another user.
 * Admin can`t upload photos to another admin.
 * Uses multer for upload image (https://www.npmjs.com/package/multer).
 * Saves uploaded photos to  ./src/public/img/ and save photo names to database
 * @param req - contain targetUserId in req.params.id, userId in req.userId and role in req.role
 */
module.exports.uploadPhoto = async (req, res, next) => {
    try {
        const targetUser = req.targetUser;
        let filename = "";

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
        }).single('photo');

        await upload(req, res, async function (err) {
            if (err) {
                console.log(err.message)
            } else {
                const photo = await Photo.create({userId: targetUser.id, photoName: filename});
                res.send(photo);
            }
        });
    } catch(err) {
        catcher(err, next, 'Photo upload error');
    }
};
