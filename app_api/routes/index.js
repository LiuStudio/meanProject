var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var config = require('../config/serverconfig');

var auth = jwt({
	secret: config.secret,
	userProperty: 'payload'
})
var profileCtrl = require('../controllers/profile');
var authCtrl 	= require('../controllers/authentication');

//* GET home page. */
router.get('/profile', auth, profileCtrl.profileGET);
router.post('/register', authCtrl.register);
//router.get('/login', authCtrl.login);

module.exports = router;
