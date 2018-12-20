const Joi = require('joi');

function validateInfo(inVal) {
	const schema = {
		name: Joi.string()
			.min(2)
			.required(),
		photo: Joi.string()
			.min(6)
			.required(),
		likes: Joi.number()
			.min(1)
			.required(),
	};

	return Joi.validate(inVal, schema);
}

const findUserByName = (db, name) => db.find(currentUser => currentUser.name === name);
const findUserById = (db, id) => db.find(currentUser => currentUser.id === parseInt(id));

module.exports = {
    validateInfo,
    findUserById,
    findUserByName
};