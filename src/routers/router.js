const express = require('express');
const router = express.Router();
const {home} = require('../controllers/controller');
const {register, login, logout, check_auth} = require('../controllers/authController')
const {register_schema} = require('../middlewares/validatorMiddleware');
const {body, checkSchema, validationResult} = require('express-validator');
const {messages, send_message, messages_with} = require('../controllers/messageController');
const {block_user, is_blocked, unblock_user, blocked_list} = require('../controllers/blockController');

router.get('/', home);

// auth routes
router.post('/register', checkSchema(register_schema), register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/check-auth', check_auth);

// message routes
router.post('/messages', messages); // see all messages (chats) from other users
router.post('/messages/:username', messages_with); // see all messages between a user
router.post('/message/:username', send_message); // send message to user


module.exports = router;