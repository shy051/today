var data = require("../data.json");

exports.addPost = function(req, res) {    
	res.render('add',data);
	var newPost= {
		"name": "Steve Yoo",
		"profileURL": "#",
		"pImgUrl": "img/me.jpg",
		"date": "February 13, 2015",
		"location": req.query.location,
		"imgURL": "img/c_4.jpg",
		"likes": "0",
		"description":req.query.description
	};

	data["posts"].unshift(newPost)
 }