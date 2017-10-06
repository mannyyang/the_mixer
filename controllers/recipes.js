const router = require('express').Router();
const Recipe = require('../models/recipes');
const auth = require('../services/auth');

router.get('/', auth.restrict, 
	Recipe.randomBeverage,
	(req, res) => {
		res.render('home', {
			alcohol: res.locals.beverage.data.drinks
		});
});

router.get('/new', auth.restrict,
	(req, res) => {
		res.render('tasks/new');
})

router.post('/', auth.restrict, 
	Recipe.create, (req, res) => {
		const {created} = res.locals;
		res.json(created);
	})





module.exports = router;

