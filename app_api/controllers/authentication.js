var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');


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