
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;


var PostSchema = new Schema({
	"name": String,
	"title": String,
	"profileURL": String,
	"pImgUrl": String,
	"date": Date,
	"location": String,
	"imgURL": String,
	"likes": Number,
	"description": String,
	"likedBy": [String]
});


var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    firstName:{ type: String, required: true },
    lastName: { type: String, required: true },
    imgSrc: String,
    stories: Number,
    points: Number
});

exports.Post = Mongoose.model('Post', PostSchema);
exports.User = Mongoose.model('User', UserSchema);
