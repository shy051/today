var models = require('../models');

exports.view = function(req, res){
	sess=req.session;

	if(sess.username){
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
	else{
		res.render('login',models);
	}
}

exports.deletePost = function(req, res){
	sess=req.session;

	if(sess.username){
		var postID = req.params.id;

		models.Post
			.find({"_id": postID})
			.remove()
			.exec(afterRemoving);

		function afterRemoving(err){
			if(err) console.log(err);
        	models.User.update({username: req.session.username}, {$inc: {stories : -1}}, afterUser);
			function afterUser(err){
	        	if(err) throw err;
				res.send(200);
        	}
		}
	}
	else{
		res.render('login',models);
	}
}
