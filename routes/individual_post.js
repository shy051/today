var models = require('../models');

exports.view = function(req, res){
	sess=req.session;

	if(sess.username){
		models.User
			.find({username:req.session.username})
			.exec(renderPage);

		function renderPage(err, user){
			res.render('individual_post',{ 'user':user });
		}
	}
	else{
		res.render('login',models);
	}
};