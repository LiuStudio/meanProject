var express = require('express');
var router = express.Router();
var profileCtrl = require('../controllers/profile');
var authCtrl 	= require('../controllers/authentication');
var passport = require('passport');

//* GET home page. */
router.get('/profile', authCtrl.jwtAuth, profileCtrl.profileGET);
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', authCtrl.facebookCallback);

module.exports = router;
