const bcrypt = require('bcryptjs');

const db = require('../db/config');

const User = {};



User.create = (user) => {
	const passwordDigest = bcrypt.hashSync(user.password, 10);
	return db.oneOrNone(
		'INSERT INTO users (email, password_digest, thread_id) VALUES ($1, $2, $3) RETURNING *;', 
			[user.email, passwordDigest, '']
	);
};

User.findByEmail = (email) => {
	return db.oneOrNone(
		'SELECT * FROM users WHERE email =$1;', [email]);
};

User.findByEmailMiddleware = (req, res, next) => {
	console.log('in findByEmailMiddleware');
	const email = req.user.email;
	User
		.findByEmail(email)
		.then((userData) => {
			res.locals.userData = userData;
			console.log(res.locals.userData);
			next();
		}).catch(err => console.log('ERROR:', err));
};



module.exports = User;