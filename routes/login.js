var data = require('../data.json');

exports.view = function(req, res){
	sess=req.session;
	// Assign email to sess.email variable

	sess.email=req.body.email;
	res.end('done');
	// res.render('login',data);
};