
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var mongoose = require('mongoose');

var index = require('./routes/index');
var add_story = require('./routes/add_story');
var most_recent = require('./routes/most_recent');
var profile = require('./routes/profile');
var story_1 = require('./routes/story_1');
var story_2 = require('./routes/story_2');
var story_3 = require('./routes/story_3');
var story_4 = require('./routes/story_4');
var story_5 = require('./routes/story_5');
var top_story = require('./routes/top_story');
var past_stories = require('./routes/past_stories');
var individual_post = require('./routes/individual_post');
var login = require('./routes/login');
var username = require('./routes/username');
var logout = require('./routes/logout');
var register = require('./routes/register');
var post = require('./routes/post');
var edit_profile = require('./routes/edit_profile');


var add = require('./routes/add');

// Example route
// var user = require('./routes/user');

var local_database_name = 'today';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);


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
app.use(express.cookieParser());
app.use(express.session({secret: '170choduqueyoo120'}));
app.use(express.bodyParser({uploadDir: __dirname+'/temp'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.post('/login', login.view);

app.get('/add_story', add_story.view);
app.post('/add', add.addPost);

app.get('/most_recent', most_recent.view);


app.get('/profile', profile.view);
app.get('/story_1', story_1.view);
app.get('/story_2', story_2.view);
app.get('/story_3', story_3.view);
app.get('/story_4', story_4.view);
app.get('/story_5', story_5.view);
app.get('/edit_profile', edit_profile.view);

app.get('/post/:id', post.view)
app.post('/post/:id/delete', post.deletePost);

app.get('/top_story', top_story.view);
app.get('/past_stories', past_stories.view);
app.get('/individual_post', individual_post.view);
// app.get('/username', username.view);

app.get('/logout', logout.logout);

app.get('/register', register.view);
app.post('/register/new', register.addUser);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
