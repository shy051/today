
var Mongoose = require('mongoose');


var PostSchema = new Mongoose.Schema({
	"name": String,
	"profileURL": String,
	"pImgUrl": String,
	"date": Date,
	"location": String,
	"imgURL": String,
	"likes": Number,
	"description": String
});

exports.Post = Mongoose.model('Post', PostSchema);


