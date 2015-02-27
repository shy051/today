var models = require("../models");

exports.view = function(req, res){
	res.render('register');
}

exports.addUser = function(req, res){
	var form_data = req.body;

	var newUser = new models.User({
		username: form_data.username,
		password: form_data.password,
		firstName:form_data.first_name,
		lastName: form_data.last_name
	});

	console.log(newUser);

	newUser.save(afterSaving);

	function afterSaving(err){
		if(err){
	    	console.log(err);
	     	res.send(500);
		}
		else{
			res.send(200);
		}
	}
}