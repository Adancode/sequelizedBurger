var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

// This says that if we do root or /, we mean to look in the public folder.
app.use(express.static('public'));

// The code below tells heroky to get the environment instead of 3000 when on heroku, app will not work without this on heroku.
var PORT = process.env.PORT || 3000;
var exphbs = require('express-handlebars');

app.use(bodyParser.urlencoded({
	extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

app.listen(PORT);
