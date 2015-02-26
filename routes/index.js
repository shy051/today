var data = require('../data.json');

exports.view = function(req, res){
	sess=req.session;

	if(sess.email){
		res.render('index',data);
	}
	else{
		res.render('login',data);
	}
};