const express = require('express');
const router = express.Router();
const Joi = require('joi'); // problem?

const instagram = require('../mock-database')

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

const findUserByName = name => instagram.find(currentUser => currentUser.name === name);
const findUserById = id => instagram.find(currentUser => currentUser.id === parseInt(id));

router.get('/', (req, res) => {
	const {
		name
	} = req.query;
	if (!name) return res.send(instagram);
	const user = findUserByName(name);
	if (!user) return res.status(404).send('The user name was not found.');
	res.send(user);
});

router.get('/:id', (req, res) => {
	const getId = findUserById(req.params.id);
	if (!getId) return res.status(404).send('The user ID was not found.');
	res.send(getId);
});

router.put('/:id', (req, res) => {
	const putUser = findUserById(req.params.id);
	if (!putUser) return res.status(404).send('Unable to edit user.  The ID was not found.');
	const {
		error
	} = validateInfo(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	putUser.name = req.body.name;
	putUser.photo = req.body.photo;
	putUser.likes = req.body.likes;
	res.send(putUser);
});

router.post('/', (req, res) => {
	const {
		error
	} = validateInfo(req.body); // result.error
	if (error) return res.status(400).send(error.details[0].message);

	const newUser = {
		id: instagram.length + 1,
		name: req.body.name,
		photo: req.body.photo,
		likes: req.body.likes
	};
	instagram.push(newUser);
	res.send(newUser);
});

router.delete('/:id', (req, res) => {
	const deleteUser = findUserById(req.params.id);
	if (!deleteUser) return res.status(404).send('The user ID was not found.');

	const index = instagram.indexOf(deleteUser);
	instagram.splice(index, 1);

	res.send(deleteUser);
});

module.exports = router;