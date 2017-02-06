var config = require('../config/config.json');
var path = require('path');
var cors = require('cors');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
//var handlebars = require('handlebars');

console.log("Config >> ", config);


var Server = function(){
	this.app = undefined;
	this.port = undefined;	
}

Server.instance = undefined;
Server.getInstance = function(){
	console.log("[Server] getInstance()");
	if(null == Server.instance){
		Server.instance = new Server();
	}
	return Server.instance;
}


Server.prototype = {
	init : function(){
		console.log("[Server] init()");
		this.app = express();
		this.port = config.port;

		console.log("Path: " + path.join(__dirname));
		// view engine setup
		this.app.set('views', path.join(__dirname, './views'));
		this.app.engine('.hbs', exphbs({extname : '.hbs'}));
		this.app.set('view engine','.hbs');
//		this.app.engine('handlebars', exphbs({defaultLayout: 'main'}));
//		this.app.set('view engine', 'hbs');
		// Statics
		this.app.use('/scripts', express.static('./build/scripts'));
		this.app.use('/contents', express.static('./build/contents'));
		this.app.use('/partials', express.static('./build/partials'));
		this.app.use('/public', express.static('./src/client/public'));
		
		// configure app to use bodyParser()
		// this will let us get the data from a POST
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json());
		
		// use it before all route definitions
		this.app.use(cors({origin: 'http://local.one.react.com:9696'}));

	},
	map : function(a, route){
		console.log("[Server] map()");
		route = route || '';
		for (var key  in a){
			switch(typeof a[key]){
				case 'object':
					this.map(a[key], route + key);
					break;
				case 'function':
					this.app[key](route, a[key]);
					break;
				
			}
		}
		console.log("[Server][Map] Route :" + route);
	},
	run : function(){
		console.log("[Server] run()");
		this.app.listen(this.port, function(){
			console.log("[Server] Running On :" + config.hostName + "("+config.port+")");
		});

	}
	
}


exports.Server = Server;
