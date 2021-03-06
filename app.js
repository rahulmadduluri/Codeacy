//require dependencies
var express = require('express');
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	models = require('./models'),
	dbUrl = process.env.MONGOHQ_URL || 'mongodb://localhost:27017/blog';

var favicon = require('serve-favicon');


//mongoose
var mongoose = require('mongoose');
mongoose.connect(dbUrl, {safe: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {

});

//passport
var passport = require('passport');


//middleware
var session = require('express-session'),
	logger = require('morgan'),
	errorHandler = require('errorhandler'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

var app = express();
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.locals.appTitle = 'Codeacy';


//middleware that exposes Mongoose models in each Express.js route via a req object
app.use(function(req, res, next) {
	if (!models.User) return next(new Error('No models.'));
	req.models = models;
	return next();
});


//configure settings
app.set('port', process.env.PORT || 3003);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//use middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(require('stylus').middleware(__dirname + 'public'));
app.use(express.static(path.join(__dirname, 'public')));

//authentication
app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'));
app.use(session({secret: '2C44774A-D649-4D44-9535-46E296EF984F'}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login for session

var initPassport = require('./passport/init');
initPassport(passport);

//passport adds .isAuthenticated to req
var isAuthenticated = function(req, res, next) {
	if (req.isAuthenticated())
		return next();

	//if user is not authenticated go back to login page
	res.redirect('/');
}


//error handling if environment is development
if ('development' == app.get('env')) {
	app.use(errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
}
else if ('production' == app.get('env')) {
	app.use(errorHandler());
}


//pages & routes
app.get('/', routes.index);

//for admin purposes -- currently unused
app.get('/admin', isAuthenticated, routes.user.admin);

//to logout
app.get('/logout', routes.user.logout);

//route for facebook authentication and login
app.get('/login/facebook', 
	passport.authenticate('facebook', { 
		scope : 'email'
	})
);

//handle callback after facebook has authenticated user
app.get('/login/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: '/',
		failureRedirect: '/'
	})
);


//REST API routes
app.all('/api', isAuthenticated);


//catch-all error 404 response
app.all('*', function(req, res) {
	res.send(404);
});

//start server
var server = http.createServer(app);
var boot = function() {
	server.listen(app.get('port'), function() {
		console.info('Express server listening on port ' + app.get('port'));
	});
	server.on('error', function(err) {
		console.error(err);
	});
}
var shutdown = function() {
	server.close();
}

if (require.main === module) {
	boot();
}
else {
	console.info('Running app as a module');
	exports.boot = boot;
	exports.shutdown = shutdown;
	exports.port = app.get('port');
}

//uncaught error handling
process.on('uncaughtException', function(err) {
	console.error('uncaughtException: ', err.message);
	console.error(err.stack);
	process.exit(1);
});


//socket.io

var io = require('socket.io').listen(server, {
	//config options
});
var ideone = require('./public/js/ideone_compiler.js');


io.on('connection', function(socket) {
	/*
	//production configuration options
	if (process.env.NODE_ENV == 'production') {
		io.enable('browser client etag');
		io.set('transports', [
			'websocket',
			'flashsocket',
			'htmlfile',
			'xhr-polling',
			'jsonp-polling'
		]);
	}
	*/
	var myOutput;
	socket.emit('start', { hello: 'world'});
	socket.on('source-sent', function(data) {
		var lang = 10;


		var preBoiler;
		var afterBoiler;
		if (data.stage == 0) {
			preBoiler = 'import java.util.*;import java.lang.*;import java.io.*;class Ideone {static Boolean characterChosen = false;static String typeChosen;public static void main (String args[]) {';
			afterBoiler = '}}class Character {void setType(String n) {Boolean characterChosen = false;String typeChosen = "";if (n.equals("char1name")) {typeChosen = n;characterChosen = true;}else if (n.equals("char2name")) {typeChosen = n;characterChosen = true;}else if (n.equals("char3name")) {typeChosen = n;characterChosen = true;}if (characterChosen == true) {System.out.print("1 " + typeChosen);}else {System.out.print("10");}}}';
		}
		else if (data.stage == 1) {
			console.log("WRONGWRONG");
			preBoiler = 'import java.util.*;import java.lang.*;import java.io.*;class Ideone {public static void main (String args[]) {Character charn = new Character();charn.changeColor("blue");if(charn.color != null && !charn.color.isEmpty()){System.out.println("2 " + charn.color);}else{System.out.println("10");}}}class Character {public String color;';
			afterBoiler = '}';
		}
		var inputCode = '';
		for (var i = 0; i < data.source.length; ++i) {
			inputCode += data.source[i];
		}

		var source = preBoiler + inputCode + afterBoiler;
		ideone.run(source, lang, '', function(returnedVal) {
			socket.emit('returnOutput', { output: returnedVal });
		});
	});
	
});