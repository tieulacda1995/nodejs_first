const express = require('express');
const verifyToken = require('../middleware/auths');

const router = express.Router();

const authController = require('../controllers/AuthsController');


router.get('/', verifyToken, authController.get)

router.post('/register', authController.post);

router.post('/login', authController.login);

module.exports = router;