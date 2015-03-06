var data = require('../data.json');

exports.view = function(req, res){
	sess=req.session;

	if(sess.username){
		console.log(data);
		res.render('edit_profile',data);
	}
	else{
		res.render('login',models);
	}
};