var data = require('../data.json');

exports.view = function(req, res){
	sess=req.session;

	if(sess.username){
		console.log(data);
		res.render('story_2',data);
	}
	else{
		res.render('login',models);
	}
};