const router 	 = require('express').Router();
const passport = require('passport');
const User		 = require('../models/users');
const auth		 = require('../services/auth');

router.get('/new', (req,res) => {
	res.render('users/new');
});

// Creating a new user
router.post('/',
	passport.authenticate(
		'local-signup', {
			failureRedirect: '/users/new',
			successRedirect: '/recipes'
		}
	)
);

// Logging in
router.post('/login', passport.authenticate(
	'local-login', {
		failureRedirect: '/',
		successRedirect: '/recipes'
		}
	)
);

// Logging out
router.get('/logout', (req,res) => {
	req.logout();
	res.redirect('/');
})

/**
 * Get the user's created/saved recipes. This should belong under
 * the recipes controller.
 */
// router.get(
// 	'/recipes',
// 	auth.restrict,
// 	User.findByEmailMiddleware,
// 	(req, res) => {
// 		console.log('in handler for /recipes');
// 		console.log('req.user:');
// 		console.log(req.user);
// 		res.render('/recipes', { user: res.locals.userData });
// 	}
// );

module.exports = router;