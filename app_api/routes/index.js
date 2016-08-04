var express = require('express');
var router = express.Router();

//var profileCtrl = require('../controllers/profile');
var authCtrl 	= require('../controllers/authentication');

//* GET home page. */
//router.get('/profile', profileCtrl);
router.post('/register', authCtrl.register);
//router.get('/login', authCtrl.login);

module.exports = router;
