var models = require('../models');

exports.view = function(req, res){
	models.User
		.find({username:req.session.username})
		.exec(renderPage);

	function renderPage(err, user){
		console.log(user);
		models.Post
			.find({name:req.session.username})
			.sort('-date')
			.exec(renderPosts);
		function renderPosts(err, posts){
			console.log(posts);
			res.render('profile',{ 'posts':posts, 'user':user });
		}
	}
};