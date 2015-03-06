var models = require("../models");

exports.likePost = function(req, res){
	var postId = req.body.id;
	var posterName = req.body.name;

	// push user's name onto database
	models.Post.update({_id: postId}, {$inc: {likes : 1}, $push: {likedBy: req.session.username}}, afterUpdating);
	function afterUpdating(err){
		if(err) throw err;

		models.User.update({username: posterName}, {$inc: {points : 1}}, afterUser);
		function afterUser(err){
			if(err) throw err;
			res.send(200);
		}
	}
}

exports.unlikePost = function(req,res){
	var postId = req.body.id;
	var posterName = req.body.name;

	models.Post.update({_id: postId}, {$inc: {likes : -1}, $pull: {likedBy: req.session.username}}, afterUpdating);
	function afterUpdating(err){
		if(err) throw err;

		models.User.update({username: posterName}, {$inc: {points : -1}}, afterUser);
		function afterUser(err){
			if(err) throw err;
			res.send(200);
		}
	}
}