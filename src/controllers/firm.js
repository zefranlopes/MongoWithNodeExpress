const express = require('express');
const token = require('../token');

const router = express.Router();
//router.use(token);
router.get('/firm', async (req, res) => {
	try{
		return res.send({hockei: true, user: req.token});
	}catch (e) {
		return res.status(500).send({error: e.message, stack: e.stack});
	}
});
module.exports = app => app.use('/', router);