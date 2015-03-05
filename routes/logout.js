exports.logout = function(req, res){
	sess=req.session;

	if(sess.username){
		req.session.destroy(function(err){
			if(err){
				console.log(err);
			}
			else{
				res.redirect('/');
			}
		});
	}
	else{
		res.render('login',models);
	}
};