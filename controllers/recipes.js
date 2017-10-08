const router = require('express').Router();
const Recipe = require('../models/recipes');
const auth = require('../services/auth');
const User = require('../models/users');

/**
 * on /recipes/, display a random beverage in home page (home.html).
 */
router.get('/', auth.restrict,
	Recipe.randomBeverage,
	(req, res) => {
		// const obj = {};
		// 	const ingredients = [];
		// 	const drink = res.locals.beverage.data.drinks;

		// 	for(let i = 1; i< 16; i++)
		// 		var value = drink['strIngredient' + i]
		// 	console.log(drink[strIngredient + i])
		// 			if (value !== "null" && value !== "" & value !== "\n") {
		// 		ingredients.push(res.locals.beverage.data.drinks[value]);
		// 	}
		res.render('home', {
			alcohol: res.locals.beverage.data.drinks
		});
	});

/**
 * on /recipes/new, display new.html
 */
router.get('/new', auth.restrict,
	(req, res) => {
		res.render('tasks/new');
	})

/**
 * On /recipes/:id (id of a recipe), display single recipe - show.html
 */
router.get('/:id', auth.restrict,
	Recipe.findById, (req, res) => {
		const { saved } = res.locals;
		res.render('tasks/show', saved);
	});

/**
 * on /recipes/:id/edit, display edit.html
 */
router.get('/:id/edit', auth.restrict,
	Recipe.findById, (req, res) => {
		const { saved } = res.locals;
		res.render('tasks/edit', saved);
	});

/**
 * API call to add a new recipe. You need to get
 * the user's id in order to properly link the user
 * to the recipe.
 */
router.post('/',
	auth.restrict,
	User.findByEmailMiddleware, // passing current logged in user data.
	Recipe.create, (req, res) => {
		const { created } = res.locals;
		res.json(created);
	});

/**
 * API call to edit an existing recipe. 
 */
router.put('/:id/edit', auth.restrict,
	Recipe.update, (req, res) => {
		const { edit } = res.locals;
		res.json(edit);
	});




module.exports = router;

