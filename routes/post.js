var models = require('../models');

exports.view = function(req, res){
	var postID = req.params.id;
	//console.log("post id is " + postID);

	models.User
		.find({username:req.session.username})
		.exec(renderPage);

	function renderPage(err, user){
		models.Post
			.find({_id: postID})
			.sort('-date')
			.exec(renderPosts);
		function renderPosts(err, posts){
			console.log(posts);
			res.render('individual_post',{ 'posts':posts, 'user':user });
		}
	}
}

exports.deletePost = function(req, res){
	var postID = req.params.id;

	models.Post
		.find({"_id": postID})
		.remove()
		.exec(afterRemoving);

		function afterRemoving(err){
			if(err) console.log(err);
			res.send(200);
		}
}
