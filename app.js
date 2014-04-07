/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var MongoStore = require('connect-mongo')(express);
var settings = require('./settings');
var flash = require('connect-flash');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
/*app.set('view engine', 'ejs');*/
app.set('view engine', 'html');
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser({
	keepExtensions: true,
	uploadDir: __dirname + '/src/img/uploads/uploadedFileName'
}));
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.session({
	secret: settings.cookieSecret,
	key: settings.db, //cookie name
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 30
	}, //30 days
	store: new MongoStore({
		db: settings.db
	})
}));



app.use(express.static(path.join(__dirname, 'src')));

var mongoose = require('mongoose');

// Bootstrap db connection
// Connect to mongodb

//parse model
var models_path = __dirname + '/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})


// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

require('./config/routes')(app)

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

exports = module.exports = app