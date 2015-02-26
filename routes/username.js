var username = require('../users.json');

exports.view = function(req,res){
	res.json(username);
}