const router = require('express').Router();
const { home } = require('../controllers/controller');

router.get('/', home);

module.exports = router;