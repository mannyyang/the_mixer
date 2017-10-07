const axios = require('axios');
const db 		= require('../db/config');

const Recipe = {};


Recipe.randomBeverage = (req, res, next) => {
	axios({
		url: 'http://www.thecocktaildb.com/api/json/v1/1/random.php',
		method: 'GET'
	}).then(beverage => {
		res.locals.beverage = beverage
		console.log(res.locals.beverage.data.drinks)
		next();
	}).catch(err => {
		console.log(`Error obtaining random beverage: ${err}`)
	})
}

Recipe.findAll = (req, res, next) => {
	db.manyOrNone(`SELECT * FROM savedRecipes`)
	.then(savedAll => {
		res.locals.savedAll = savedAll;
		console.log(res.locals.savedAll);
	})
	.catch(err => {
		console.log(`Error obtaining all saved: ${err}`);
	})
}

Recipe.findById = (req, res, next) => {
	const {id} = req.params;
	db.oneOrNone(`SELECT * FROM savedRecipes WHERE id=$1`, [id])
	.then(saved => {
		res.locals.saved = saved;
	})
	.catch(err => {
		console.log('ERROR getting single drink')
	})
}

Recipe.create = (req, res, next) => {
  const {name, measurements, ingredients, instructions, image, beverageType} = req.body;
  console.log(req.body);
  db.one(`INSERT INTO savedRecipes name, measurements, ingredients, instructions, image, beverageType) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [name, measurements, ingredients, instructions, image, alcoholPref])
    .then(created => {
      res.locals.created = created;
      console.log(res.locals.created);
      next();
    })
    .catch(err => {
    	console.log(`ERROR creating NEW: ${err}`)
	})
}


module.exports = Recipe;