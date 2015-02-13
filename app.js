
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var add_story = require('./routes/add_story');
var most_recent = require('./routes/most_recent');
var profile = require('./routes/profile');
var story_1 = require('./routes/story_1');
var top_story = require('./routes/top_story');
var past_stories = require('./routes/past_stories');


var add = require('./routes/add');

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/add_story', add_story.view);
app.get('/most_recent', most_recent.view);
app.get('/add', add.addPost);
app.get('/profile', profile.view);
app.get('/story_1', story_1.view);
app.get('/top_story', top_story.view);
app.get('/past_stories', past_stories.view);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
