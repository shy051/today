var models = require('../models');

exports.view = function(req, res){
	models.User
		.find({username:req.session.username})
		.exec(renderPage);

	function renderPage(err, user){
		res.render('profile',{ 'user':user });
	}
};