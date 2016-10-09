var express = require('express');
var app = express();
// The code below tells heroku to get the environment instead of 3000 when on heroku, app will not work without this on heroku.
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var models = require('./models');
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

var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

app.listen(PORT);

// The code commented out below is this app without modularization.  I am leaving this here for my notes.  I moved the app.get, post, put, and delete requests to burgers_controller, then required var router = express.Router(), then called router.get, post, put, and delete in that file.  At the end of that file, I exported the routes via module.exports = router, and imported them here with var routes = require('./controllers/burgers_controller.js'); and app.use('/', routes);

// See the note above to review the code below.

/*app.get('/', function(req,res) {
     res.redirect('/burgers');
});

app.get('/burgers', function(req,res) {
          models.burgers.findAll()
          .then(function(data){
               //console.log(data);
               res.render('index', {burgers : data});
         });
});

app.post('/burgers/create', function(req, res) {
    //models.Users.findAll({where: {email: req.body.newname}}) this line may not work
    //models.Users.findOne({where: {email: req.body.newname}})
    //console.log(req.body.name);
    models.burgers.create({
        burger_name: req.body.name,
        devoured: 0})
        .then(function() {
	   res.redirect('/burgers');
			});
});

app.put('/burgers/update/:id', function(req,res) {
     var theId = req.params.id;
	models.burgers.update(
          {devoured : true}, {where: { id: theId}}
     ).then(function() {
          res.redirect('/burgers');
     });
});

app.delete('/burgers/delete/:id', function(req,res) {
     var theId = req.params.id;
	models.burgers.destroy(
          {where: { id: theId}}
     ).then(function() {
          res.redirect('/burgers');
     });
});*/
