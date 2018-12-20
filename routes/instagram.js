const express = require('express');
const router = express.Router();
const Joi = require('joi');  // problem?

const instagram = [
	{ id: 1, name: 'Alan', photo: 'http://instagram.com/images/abc22343.png', likes: 45 },
	{ id: 2, name: 'Becca', photo: 'http://instagram.com/images/abc28433.png', likes: 5 },
	{ id: 3, name: 'Chris', photo: 'http://instagram.com/images/abc25673.png', likes: 8 },
	{ id: 4, name: 'Darren', photo: 'http://instagram.com/images/abc324523.png', likes: 58 },
	{ id: 5, name: 'Frank', photo: 'http://instagram.com/images/abc27253.png', likes: 123 },
	{ id: 6, name: 'Gary', photo: 'http://instagram.com/images/abc2395.png', likes: 47 },
	{ id: 7, name: 'Harry', photo: 'http://instagram.com/images/abc253473.png', likes: 41 },
	{ id: 8, name: 'Ingrid', photo: 'http://instagram.com/images/abc226753.png', likes: 1 },
	{ id: 9, name: 'Joelle', photo: 'http://instagram.com/images/abc284733.png', likes: 8 },
	{ id: 10, name: 'Kylie', photo: 'http://instagram.com/images/abc214563.png', likes: 9 },
	{ id: 11, name: 'Laura', photo: 'http://instagram.com/images/abc22363.png', likes: 24 },
	{ id: 12, name: 'Mike', photo: 'http://instagram.com/images/abc265.png', likes: 6 },
	{ id: 13, name: 'Nicolas', photo: 'http://instagram.com/images/abc6234.png', likes: 1349238 },
	{ id: 14, name: 'Peter', photo: 'http://instagram.com/images/abc22854.png', likes: 5258 },
	{ id: 15, name: 'Roberto', photo: 'http://instagram.com/images/abc5123.png', likes: 8 },
	{ id: 16, name: 'Steven', photo: 'http://instagram.com/images/abc29837.png', likes: 418 },
	{ id: 17, name: 'Trish', photo: 'http://instagram.com/images/abc29267804.png', likes: 4758 },
	{ id: 18, name: 'William', photo: 'http://instagram.com/images/abcpy98234.png', likes: 8 },
];

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
	const { name } = req.query;
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
	const { error } = validateInfo(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	putUser.name = req.body.name;
	putUser.photo = req.body.photo;
	putUser.likes = req.body.likes;
	res.send(putUser);
});

router.post('/', (req, res) => {
    const { error } = validateInfo(req.body);  // result.error
    if (error) return res.status(400).send(error.details[0].message);

    const newUser = {
        id: instagram.length + 1, 
		name: req.body.name,
		photo: req.body.photo,
		likes: req.body.likes
    };
    instagram.push(newUser);
    res.send(newUser);
})

router.delete('/:id', (req, res) => {
	const deleteUser = findUserById(req.params.id);
	if (!deleteUser) return res.status(404).send('The user ID was not found.');

	const index = instagram.indexOf(deleteUser);
	instagram.splice(index, 1);

	res.send(deleteUser);
});

module.exports = router;