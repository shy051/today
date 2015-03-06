var models = require("../models");

exports.likePost = function(req, res){
	var postId = req.body.id;

	models.Post.update({_id: postId}, {$inc: {likes : 1}}, afterUpdating);
	function afterUpdating(err){
		if(err) throw err;
		res.send(200);
	}
}

exports.unlikePost = function(req,res){
	var postId = req.body.id;

	models.Post.update({_id: postId}, {$inc: {likes : -1}}, afterUpdating);
	function afterUpdating(err){
		if(err) throw err;
		res.send(200);
	}
}