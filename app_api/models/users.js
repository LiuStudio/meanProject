var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = process.env.JWT_SECRET || "YOU_SHOULD_NOT_USE_THIS_AS_YOUR_SECRET";

var userSchema = new mongoose.Schema({
	firstname:{
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	hash: String,
	salt: String
});

userSchema.methods.generateJwt = function(){
	var expiry = new Date();
	expiry.setDate(expiry.getDate()+2);

	var token = jwt.sign({
		auth: 'MEAN Project',
		_id: this._id,
		email: this.email,
		firstname: this.firstname,
		lastname: this.lastname,
		exp: parseInt(expiry.getTime() /1000)
	}, secret);

	return token;
};


userSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password){
	var curhash = cypto.pbkdf2Sync(passowrd, this.salt, 1000, 64).toString('hex');
	return curhash == this.hash;
}

var Users = mongoose.model('User', userSchema);
module.exports = Users;