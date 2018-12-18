const Joi = require('joi');
const express = require('express');
const app = express();

// Allow parsing of text for modifying and adding info
app.use(express.json());

// The "Database" - Stored as an array.
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

// Input validation
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

// The homepage
app.get('/', (req, res) => {
	res.send(
		'Welcome to Instagram! <br><br> Check /api/v1/instagram/:id to view users by ID <br> Check /api/v1/instagram/user/:name to view users by name(not working) ',
	);
});

// To view all users and their details
app.get('/api/v1/users', (req, res) => {
	const { name } = req.query;
	if (!name) return res.send(instagram);
	const user = findUserByName(name);
	if (!user) return res.status(404).send('The user name was not found.');
	res.send(user);
});

// To find user by ID
app.get('/api/v1/users/:id', (req, res) => {
	const getId = findUserById(req.params.id);
	if (!getId) return res.status(404).send('The genre ID was not found.');
	res.send(getId);
});

// To edit a user by ID
// This function works, however to use it you need to include the
// updated name, photo link and amount of likes it has.
app.put('/api/v1/users/:id', (req, res) => {
	const putUser = findUserById(req.params.id);
	if (!putUser) return res.status(404).send('The user ID was not found.');

	const { error } = validateInfo(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	putUser.name = req.body.name;
	putUser.photo = req.body.photo;
	putUser.likes = req.body.likes;
	res.send(putUser);
});

// app.put('/api/v1/users/:id/name', (req, res) => {
// app.put('/api/v1/users/:id/photo', (req, res) => {
// app.put('/api/v1/users/:id/likes', (req, res) => {

// To delete a user
app.delete('/api/v1/users/:id', (req, res) => {
	const deleteUser = findUserById(req.params.id);
	if (!deleteUser) return res.status(404).send('The user ID was not found.');

	const index = instagram.indexOf(deleteUser);
	instagram.splice(index, 1);

	res.send(deleteUser);
});

// To keep server online and listening
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Instagram is live and listening on port ${port} :)`));
