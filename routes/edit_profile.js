var models = require('../models.js');

exports.view = function(req, res){
	sess=req.session;

	if(sess.username){
		models.User
			.find({username:req.session.username})
			.exec(renderPage);
		function renderPage(err, user){
			res.render('edit_profile',{ 'user':user });
		}
	}
	else{
		res.render('login',models);
	}
};