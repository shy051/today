
var models = require('../models');

exports.view = function(req, res){
	sess=req.session;

	if(sess.username){
		var featureID = req.params.id;

		models.Post
			.find({"_id": featureID})
			.sort('-date')
			.exec(renderFeature);

		function renderFeature(err, posts){
			if(err) console.log(err);
			console.log("logging posts");
			console.log(posts);
			res.render('story_1',{ 'posts':posts });
		}
	}
	else{
		res.render('login',models);
	}
};