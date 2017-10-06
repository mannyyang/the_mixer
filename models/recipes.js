const axios = require('axios');
const db 		= require('../db/config');
// const APP_ID = process.env.APP_ID;
// const YUMMKEY = process.env.YUMMKEY;
// const cat_url = `http://api.yummly.com/v1/api/recipes?_app_id=${APP_ID}&_app_key=${YUMMKEY}&cuisine^cuisine-american&allowedCourse[]=course^course-Appetizers`
//&allowedIngredient[]=garlic&allowedIngredient[]=cognac

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

// Recipe.getBreakfast = (req, res, next) => {
// 	axios({
// 		url: `http://api.yummly.com/v1/api/recipes?_app_id=${APP_ID}&_app_key=${YUMMKEY}&cuisine^cuisine-american&allowedCourse[]=course^course-Breakfast`, 
// 		method: 'GET'
// 	}).then(breakfastData => {
// 		res.locals.breakfastData = breakfastData
// 		next();
// 	}).catch(err => {
// 		console.log(`ERROR grabbing breakfast: ${err}`)
// 	})
// }

// fetch all the trains data from the mta API:  http://www.mtastat.us/api/trains
// Trains.allTrains = (req, res, next) => {

// 	axios({
//     	url: 'http://www.mtastat.us/api/trains',
//     	method: 'GET'
//     }).then(trainsData => {
//     	// console.log(trainsData.data)
//     	res.locals.allTrains = trainsData.data
//   		next();
//     }).catch(err => {
//     	console.log(`Error fetching all train data: ${err}`);
//     })
// }
// // fetch a single train's data from the mta API: http://www.mtastat.us/api/trains/${name}
// Trains.showTrain = (req, res, next) => {
// 	const name = req.params.name;

// 	axios({
// 		url: `http://www.mtastat.us/api/trains/${name}`,
// 		method: 'GET'
// 	}).then(trainData => {
// 		res.locals.showTrain = trainData.data;
// 		next();
// 	}).catch (err => {
//     	console.log(`Error fetching all train data: ${err}`);
//     })
// }

// module.exports = Trains;
module.exports = Recipe;