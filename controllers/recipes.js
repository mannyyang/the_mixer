const router = require('express').Router();
const Recipe = require('../models/recipes');
const auth = require('../services/auth');

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

router.get('/new', auth.restrict,
	(req, res) => {
		res.render('tasks/new');
})

router.get('/:id', auth.restrict,
	Recipe.findById, (req, res) => {
		const {saved} = res.locals;
		res.render('tasks/show', saved);
	})

router.get('/:id', auth.restrict,
	Recipe.findById, (req, res) => {
	const {saved} = res.locals;
	res.render('tasks/edit', saved);
})


router.post('/', auth.restrict, 
	Recipe.create, (req, res) => {
		const {created} = res.locals;
		res.json(created);
	})

router.put('/:id', auth.restrict,
	Recipe.update, (req, res) => {
	const {edit} = res.locals;
	res.json(edit);
})




module.exports = router;

