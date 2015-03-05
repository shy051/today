var models = require('../models');

exports.view = function(req, res){
	sess=req.session;

	if(sess.username){
		models.User
			.find({username:req.session.username})
			.exec(renderPage);

		function renderPage(err, user){
			console.log(user);
			models.Post
				.find()
				.sort('-date')
				.exec(renderPosts);
			function renderPosts(err, posts){
				console.log(posts);
				res.render('top_story',{ 'posts':posts, 'user':user });
			}
		}
	}
	else{
		res.render('login',models);
	}

};