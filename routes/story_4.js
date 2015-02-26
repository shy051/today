var data = require('../data.json');

exports.view = function(req, res){
	console.log(data);
	res.render('story_4',data);
};