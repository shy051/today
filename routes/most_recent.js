var models = require('../models');

exports.view = function(req, res){
	
	models.Post
		.find()
		.sort('-date')
		.exec(renderPosts);

	function renderPosts(err, posts){
		res.render('most_recent',{ 'posts':posts });
	}
};