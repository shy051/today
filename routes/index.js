var models = require('../models.js');

exports.view = function(req, res){
	sess=req.session;
	var random_num = Math.random();

	if(sess.username){
		models.User
			.find({username:req.session.username})
			.exec(renderPage);

		function renderPage(err, user){
			  if(random_num > 0.5){
			  	res.render("index", { 'user':user });
			  }
			  else{
			  	res.render("index_alternate", { 'user':user });
			  }
			//res.render('index',{ 'user':user });
		}
	}
	else{
		res.render('login',models);
	}

};