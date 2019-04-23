const express = require('express');

const { getConversationById,
    createConversation,
    createMessage,
    getAllConversations} = require('../controllers/conversationController');

const { getAllUsers, getUserById,
    updateUser, createUser,
    uploadAvatar, getUserByToken } = require('../controllers/userController');
const { addAdvert, deleteAdvert, editAdvert, getAdvert,
    getAdvertById, getAdvertByUserId} = require('../controllers/advertController');
const { deletePhotoById, getPhotosByUserId,
    getPhotoById, uploadPhoto } = require('../controllers/photoController');
const { addComment, getCommentsByPhotoId, deleteComment, editComment } = require('../controllers/commentController');
const userValidator = require('../validator/userValidator');
const filterMiddleware = require('../utils/filterMiddleware');
const { login, logout, refreshTokens } = require('../controllers/authenticationController');
const { checkAccess } = require('../utils/checkAccessMiddleware');
const { signUp } = require('../utils/signUpMiddleware');
const { hasPermissionOnAvatarEdit, hasPermissionOnCommentChange,
    hasPermissionOnPhotoDelete, hasPermissionOnPhotoUpload,
    hasPermissionOnUserEdit, hasPermissionOnUserCreate, hasPermissionOnAdvertEditDelete } = require('../utils/permissionMiddleware');

require('babel-polyfill');

const router = express.Router();

router.get('/user/', checkAccess, filterMiddleware, getAllUsers);
router.get('/user/current', checkAccess, getUserByToken);
router.get('/user/:id', checkAccess, getUserById);
router.put('/user/:id', checkAccess, hasPermissionOnUserEdit, updateUser);
router.put('/user/uploadAvatar/:id', checkAccess, hasPermissionOnAvatarEdit, uploadAvatar);
//router.delete('/user/photos/:id', checkAccess, deletePhotosByUserId);
router.post('/user', checkAccess, userValidator, hasPermissionOnUserCreate, createUser);

router.get('/photos/:id', checkAccess, getPhotosByUserId);
router.get('/photo/:id', checkAccess, getPhotoById);
//router.post('/photo/uploadPhotos/:id', checkAccess, uploadPhotos);
router.post('/photo/uploadPhoto/:id', checkAccess, hasPermissionOnPhotoUpload, uploadPhoto);
router.delete('/photo/:id', checkAccess, hasPermissionOnPhotoDelete, deletePhotoById);

router.get('/comment/:id', checkAccess, getCommentsByPhotoId);
router.post('/comment/:id', checkAccess, addComment);
router.put('/comment/:id', checkAccess, hasPermissionOnCommentChange, editComment);
router.delete('/comment/:id', checkAccess, hasPermissionOnCommentChange, deleteComment);

router.get('/advert', checkAccess, getAdvert);
router.get('/advert/:id', checkAccess, getAdvertById);
router.get('/advert/user/:id', checkAccess, getAdvertByUserId);
router.post('/advert', checkAccess, addAdvert);
router.put('/advert/:id', checkAccess, hasPermissionOnAdvertEditDelete, editAdvert);
router.delete('/advert/:id', checkAccess, hasPermissionOnAdvertEditDelete, deleteAdvert);

router.post('/login', login);
router.post('/logout', logout);
router.post('/signUp', userValidator, signUp, login);
router.post('/refreshTokens', refreshTokens);

router.get('/conversation', checkAccess, getAllConversations);
router.get('/conversation/:id', checkAccess, getConversationById);
router.post('/conversation/:recipient', checkAccess, createConversation);
router.post('/message', checkAccess, createMessage);

module.exports = router;
