const express = require('express');
const router = express.Router();
const {home} = require('../controllers/controller');
const {register, login, logout, check_auth} = require('../controllers/authController')
const {register_schema} = require('../middlewares/validatorMiddleware');
const {body, checkSchema, validationResult} = require('express-validator');
const {messages, send_message, messages_with, delete_message} = require('../controllers/messageController');
const {block_user, is_blocked, unblock_user, blocked_list} = require('../controllers/blockController');
const checkOutMiddleware = require('../middlewares/checkAuthMiddleware');
const checkUnOutMiddleware = require('../middlewares/checkUnAuthMiddleware');


router.get('/', home);

// auth routes
router.post('/register',[checkUnOutMiddleware, checkSchema(register_schema)], register);
router.post('/login',checkUnOutMiddleware, login);
router.post('/logout', checkOutMiddleware, logout);
router.post('/check-auth', check_auth);

// message routes
router.post('/messages', checkOutMiddleware, messages); // see all messages (chats) from other users
router.post('/messages/:username', checkOutMiddleware, messages_with); // see all messages between a user
router.post('/messages/delete/:message_id', checkOutMiddleware, delete_message); // send message to user
router.post('/message/:username', checkOutMiddleware, send_message); // send message to user

// block routes
router.post('/block/:username', checkOutMiddleware, block_user); // block a user
router.post('/unblock/:username', checkOutMiddleware, unblock_user); // unblock a user
router.post('/is-blocked/:username', checkOutMiddleware, is_blocked); // check user is blocked
router.post('/block-list', checkOutMiddleware, blocked_list); // get all blocked user (only blocked from you)


module.exports = router;