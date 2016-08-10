var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var jwt = require('express-jwt');
var serverconfig = require('../config/serverconfig');

module.exports.jwtAuth = function(){
	return jwt({
	secret: serverconfig.secret,
	userProperty: 'payload'
});
};



module.exports.register = function(req, res){
	// clone a user shell from userschema
	console.log("i am in auth.register function the req is " +JSON.stringify(req.body));

	var user = new User();
    console.log("i am done with first creating user, "+JSON.stringify(user));
	// initiate user properties
	user.firstname = req.body.firstName;
	user.lastname = req.body.lastName;
	user.email	=req.body.email;
	console.log("i am done with assigning user, "+JSON.stringify(user));

	user.setPassword(req.body.password);
	
	console.log("i am done with creating user, "+JSON.stringify(user));
	//save user to database
	user.save(function(err){
		if (err){
			console.log(err);
			res.status(404).json(err);
		}
		var token;
		token = user.generateJwt();
		res.status(200);
		res.json({
			"token" : token
		});
	});

};

module.exports.login = function(req,res){
	passport.authenticate('local', function(err, user, info){
		var token;
		
		if (err){
			res.status(404).json(err);
			return;
		}

		if(user){
			token = user.generateJwt();
			res.status(200)
				.json({"token":token});				
		}else{

			res.status(401).json(info);
		}
	})(req,res);

	
};

module.exports.facebook = function(){
	console.log("inside authCtrl.facebook, calling passport authenticate facebook")
    passport.authenticate('facebook');
};

module.exports.facebookCallback = function(req, res, done){
	passport.authenticate('facebook', function(err, user, info){
		if (err){
			res.status(404).json(err);
			return;
		}
		if(!user){
			//this shouldn't happen, since the passportconfig 
			//should already taken care of this scenario
			res.status(401).json("message: Couldn not log user in");
		}else{
		//no err, user is good, generate token, and login user
		// Not using req.login that passport provide, because i am 
		//not using session for user, i am using token, so use my own 
		//login function
		token = user.generateJwt();

		// res.status(200)
		// 		.json({"token": token});
		// 	
		res.redirect('https://localhost:3543/facebooklogin/?token=' + token);
	   }
	})(req, res,done);
};
		