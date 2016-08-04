var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileCtrl = function(req,res){
	res.status(200).json("message: this is a placehoder, you are good to go!")
}