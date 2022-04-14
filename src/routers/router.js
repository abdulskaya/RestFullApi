const express = require('express');
const router = express.Router();
const { home } = require('../controllers/controller');
const {register, login, logout} = require('../controllers/authController')
const {register_schema} = require('../middlewares/validatorMiddleware');
const {body, checkSchema, validationResult} = require('express-validator');

router.get('/', home);

// auth routes
router.post('/register', checkSchema(register_schema), register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;