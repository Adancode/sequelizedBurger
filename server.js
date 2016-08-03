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

app.get('/', function(req,res) {
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
});

//var routes = require('./controllers/burgers_controller.js');
//app.use('/', routes);

app.listen(PORT);
