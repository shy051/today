var data = require('../data.json');

exports.view = function(req, res){
	var location = req.body.location;
	var title = req.body.title; 
	var description = req.body.description;

	//console.log(data);
	res.render('story_1',{"location" : location, "title": title, "description": description});
};