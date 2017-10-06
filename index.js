const express 				= require('express');
const mustacheExpress = require('mustache-express');
const bodyParser 			= require('body-parser');
const session 				= require('express-session');
const logger 					= require('morgan');
const cookieParser 		= require('cookie-parser');

const app  = express();
const PORT = process.env.PORT || 8080;

const userController 	 = require('./controllers/users');
const recipeController = require('./controllers/recipes');


app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(session({
		secret: 'keyboard cat',
		resave: true,
		saveUninitialized: true
}));

const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended:true }));

app.use(cookieParser());

app.use('/recipes', recipeController);
app.use('/users', userController);


app.get('/', (req, res) => {
	res.render('index');
});

app.listen(PORT, () =>
	console.log(`Listening on port: ${PORT}`));
