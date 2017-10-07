DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS savedRecipes CASCADE;

-- CREATE TABLE archive (
-- 	id SERIAL PRIMARY KEY,
-- 	recipe VARCHAR
-- )

CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR NOT NULL UNIQUE,
	password_digest VARCHAR NOT NULL,
	thread_id VARCHAR NOT NULL
);

CREATE TABLE savedRecipes (
	id SERIAL PRIMARY KEY,
	name VARCHAR,
	measurements VARCHAR,
	ingredients VARCHAR,
	instructions TEXT,
	image TEXT,
	beverageType VARCHAR,
	user_id SERIAL REFERENCES users(id)
);