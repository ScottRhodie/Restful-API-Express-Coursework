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

module.exports = validateInfo