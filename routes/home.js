const express = require('express');
const router = express.Router();

// The homepage
router.get('/', (req, res) => {
	res.send(
		'Welcome to Instagram! <br><br> Check /api/v1/instagram/:id to view users by ID <br> Check /api/v1/instagram/user/:name to view users by name(not working) ',
	);
});

module.exports = router;