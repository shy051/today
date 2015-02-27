var models = require('../models.js');

exports.view = function(req, res){
	sess=req.session;

	if(sess.username){
		res.render('index',models);
	}
	else{
		res.render('login',models);
	}
};