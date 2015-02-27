var models = require('../models.js');

exports.view = function(req, res){
	var form_data = req.body;
	sess=req.session;

	models.User.findOne({ username: form_data.username }, function(err, user){
			if(err){
				console.log(err);
				res.send(500);
			}

			// test a matching password
			if(form_data.password != null){
				if(user.password == form_data.password){
					console.log("password is a match");
					sess.username = user.username;
					res.end('done');
				}
				else{
					console.log("wrong password");
					res.send(200);
				}
			}
			else{
				console.log("Null password");
				res.send(200);
			}
	});
	// res.render('login',data);
};