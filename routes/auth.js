var express = require('express');
var UserController = require('../controllers/auth.js');
var router = express.Router();

router.post('/login', UserController.loginUser);

module.exports = router;