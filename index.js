/**
 * All the dependencies that this module uses.
 * Group together for fast access.
 */
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const auth = require('./services/auth.js');
const userController = require('./controllers/users');
const recipeController = require('./controllers/recipes');

/**
 * Internal variables
 */
const app = express();
const PORT = process.env.PORT || 8080;

/**
 * Parse mustache templates in .html files
 */
app.engine('html', mustacheExpress());
/**
 * Use .html files for views
 */
app.set('view engine', 'html');
/**
 * Set view directory
 */
app.set('views', __dirname + '/views');

/**
 * set up web session, cookies, and a logger
 */
app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true
}));
app.use(cookieParser());
app.use(logger('dev'));

/**
 * set up authorizations
 */
app.use(auth.passportInstance);
app.use(auth.passportSession);

/**
 * Getting form data.
 */
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Routes
 */
const csRouter = express.Router();
csRouter.get('/', (req, res) => { 
	res.render('index');
});
app.use('/', csRouter);
app.use('/recipes', recipeController);
app.use('/users', userController);
app.use('/tasks', recipeController);

/**
 * Serve up all static assets in public folder
 */
app.use(express.static(__dirname + '/public'));
/**
 * Start server
 */
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
