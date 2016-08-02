var express = require('express');
var app = express();
// The code below tells heroku to get the environment instead of 3000 when on heroku, app will not work without this on heroku.
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var models = require('./models');
console.log(models);
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// This says that if we do root or /, we mean to look in the public folder.
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

app.get('/', function(req,res) {
     res.redirect('/burgers');
});

app.get('/burgers', function(req,res) {
		res.render('index');
});

app.post('/burgers/create', function(req, res) {
    models.burgers.findAll()
    .then(function(users){
        console.log(users);
    });
});

//var routes = require('./controllers/burgers_controller.js');
//app.use('/', routes);

app.listen(PORT);
